import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

  // Criar novo post
  async createPost(post: Omit<Post, 'id' | 'published_at'>) {
    // Criar o slug a partir do título
    const slug = post.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const { data, error } = await supabase
      .from('posts')
      .insert([{ 
        ...post, 
        slug,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
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