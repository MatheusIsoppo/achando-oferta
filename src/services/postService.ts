import { supabase } from '@/lib/supabase';

export interface Post {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content_initial?: string;
  image_url: string;
  author: string;
  categories: string[];
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  has_table?: boolean;
  table_data?: { col1: string; col2: string; col3?: string }[];
  use_third_column?: boolean;
  column_names?: {
    col1: string;
    col2: string;
    col3?: string;
  };
  affiliate_link?: string;
  store_name?: 'mercado_livre' | 'amazon' | 'magalu' | 'kabum' | 'outros';
  keywords?: string[];
}

export const postService = {
  // Buscar todos os posts
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Buscar post por slug
  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  // Verificar se um slug já existe
  async checkSlugExists(slug: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', slug)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 é o código para "nenhum resultado encontrado"
        console.error('Erro ao verificar slug:', error);
        return false; // Em caso de erro, permitimos tentar criar
      }

      return !!data;
    } catch (error) {
      console.error('Erro ao verificar slug:', error);
      return false;
    }
  },

  // Criar novo post
  async createPost(post: Omit<Post, 'id' | 'published_at'>) {
    // Verificar se o usuário está autenticado
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Erro ao verificar sessão:', sessionError);
      throw new Error('Erro ao verificar autenticação');
    }

    if (!session) {
      console.error('Nenhuma sessão encontrada');
      throw new Error('Usuário não autenticado');
    }

    console.log('Usuário autenticado:', {
      id: session.user.id,
      email: session.user.email
    });

    // Verificar role do usuário
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.error('Erro ao verificar perfil:', profileError);
      throw new Error('Erro ao verificar permissões');
    }

    console.log('Perfil do usuário:', profile);

    if (profile?.role !== 'admin') {
      console.error('Usuário não tem permissão de admin');
      throw new Error('Acesso negado: apenas administradores podem criar posts');
    }

    // Criar o slug a partir do título
    let slug = post.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    // Verificar se o slug já existe e adicionar número se necessário
    let counter = 1;
    let originalSlug = slug;
    while (await this.checkSlugExists(slug)) {
      slug = `${originalSlug}-${counter}`;
      counter++;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ 
          ...post, 
          slug,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar post:', error);
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return { success: false, error };
    }
  },

  // Atualizar post
  async updatePost(id: string, post: Partial<Post>) {
    const { data, error } = await supabase
      .from('posts')
      .update({
        ...post,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Deletar post
  async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Upload de imagem
  async uploadImage(file: File) {
    if (!file) {
      throw new Error('Nenhum arquivo selecionado');
    }

    // Validar tipo do arquivo
    if (!file.type.startsWith('image/')) {
      throw new Error('O arquivo deve ser uma imagem');
    }

    // Validar tamanho (máximo 5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      throw new Error('A imagem deve ter no máximo 5MB');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      // Tentar fazer o upload diretamente
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('post-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erro detalhado do upload:', uploadError);
        
        // Mensagens de erro mais específicas
        if (uploadError.message.includes('duplicate')) {
          throw new Error('Uma imagem com este nome já existe. Tente novamente.');
        }
        if (uploadError.message.includes('security policy')) {
          throw new Error('Erro de permissão. O bucket post-images precisa ser configurado no Supabase.');
        }
        throw new Error(`Erro ao fazer upload: ${uploadError.message}`);
      }

      // Gerar URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);

      if (!publicUrl) {
        throw new Error('Erro ao gerar URL pública da imagem');
      }

      return publicUrl;
    } catch (error) {
      console.error('Erro completo:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro inesperado ao fazer upload da imagem');
    }
  }
}; 