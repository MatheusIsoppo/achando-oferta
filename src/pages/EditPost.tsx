import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService } from '@/services/postService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Post } from '@/services/postService';

// Pegando a senha do arquivo .env
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('VITE_ADMIN_PASSWORD não está definida no arquivo .env');
}

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    content_initial: '',
    author: '',
    categories: [] as string[],
    image_url: '',
    has_table: false,
    table_data: [] as { col1: string; col2: string; col3?: string }[],
    use_third_column: false,
    column_names: {
      col1: 'Coluna 1',
      col2: 'Coluna 2',
      col3: 'Coluna 3'
    },
    affiliate_link: '',
    store_name: '' as 'mercado_livre' | 'amazon' | 'magalu' | 'kabum' | 'outros' | ''
  });

  // Carregar dados do post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug || !isAuthenticated) return;
        const data = await postService.getPostBySlug(slug);
        if (!data) {
          navigate('/404');
          return;
        }
        setPost(data);
        setFormData({
          title: data.title,
          excerpt: data.excerpt || '',
          content: data.content,
          content_initial: data.content_initial || '',
          author: data.author,
          categories: data.categories || [],
          image_url: data.image_url || '',
          has_table: data.has_table || false,
          table_data: data.table_data || [],
          use_third_column: data.use_third_column || false,
          column_names: data.column_names || {
            col1: 'Coluna 1',
            col2: 'Coluna 2',
            col3: 'Coluna 3'
          },
          affiliate_link: data.affiliate_link || '',
          store_name: data.store_name || '' as 'mercado_livre' | 'amazon' | 'magalu' | 'kabum' | 'outros' | ''
        });
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        navigate('/404');
      }
    };

    fetchPost();
  }, [slug, navigate, isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) {
      alert('Por favor, selecione uma imagem');
      return;
    }
    
    const file = e.target.files[0];
    try {
      setLoading(true);
      const imageUrl = await postService.uploadImage(file);
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
      alert('Imagem carregada com sucesso!');
    } catch (error) {
      console.error('Erro completo:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert(`Erro ao fazer upload da imagem:\n${errorMessage}`);
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!post?.id) {
      alert('ID do post não encontrado');
      return;
    }

    try {
      setLoading(true);
      
      // Preparar os dados para atualização
      const updateData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        content_initial: formData.content_initial,
        author: formData.author,
        categories: formData.categories,
        image_url: formData.image_url,
        has_table: formData.has_table,
        table_data: formData.has_table ? formData.table_data : [],
        use_third_column: formData.use_third_column,
        column_names: formData.column_names,
        affiliate_link: formData.affiliate_link || '',
        store_name: (formData.store_name || undefined) as 'mercado_livre' | 'amazon' | 'magalu' | 'kabum' | 'outros' | undefined,
        slug: slug // Mantém o slug original
      };

      await postService.updatePost(post.id, updateData);
      alert('Post atualizado com sucesso!');
      navigate(`/blog/${slug}`);
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert(`Erro ao atualizar post: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar nova linha na tabela
  const addTableRow = () => {
    setFormData(prev => ({
      ...prev,
      table_data: [...prev.table_data, { col1: '', col2: '', col3: '' }]
    }));
  };

  // Função para atualizar dados da tabela
  const updateTableCell = (rowIndex: number, column: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      table_data: prev.table_data.map((row, index) => 
        index === rowIndex ? { ...row, [column]: value } : row
      )
    }));
  };

  // Função para remover linha da tabela
  const removeTableRow = (rowIndex: number) => {
    setFormData(prev => ({
      ...prev,
      table_data: prev.table_data.filter((_, index) => index !== rowIndex)
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 pt-28">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-center">Área Restrita</h1>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Senha de Acesso</label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Acessar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 pt-28">
        <div className="text-center">Carregando post...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-28">
      <h1 className="text-2xl font-semibold mb-6">Editar Post</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <Input
            type="text"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Resumo</label>
          <Textarea
            value={formData.excerpt}
            onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            required
            rows={6}
            placeholder="Digite o resumo do post. Você pode usar markdown: ###, ##, >, etc."
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Conteúdo Inicial</label>
          <Textarea
            value={formData.content_initial}
            onChange={e => setFormData(prev => ({ ...prev, content_initial: e.target.value }))}
            required
            rows={6}
            placeholder="Digite o conteúdo inicial do post. Você pode usar markdown: ###, ##, >, etc."
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>

        {/* Tabela Comparativa */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="has_table"
              checked={formData.has_table}
              onChange={(e) => setFormData(prev => ({ ...prev, has_table: e.target.checked }))}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="has_table" className="text-sm font-medium">
              Usar Tabela Comparativa
            </label>
          </div>

          {formData.has_table && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="use_third_column"
                  checked={formData.use_third_column}
                  onChange={(e) => setFormData(prev => ({ ...prev, use_third_column: e.target.checked }))}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="use_third_column" className="text-sm font-medium">
                  Usar Terceira Coluna
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Coluna 1</label>
                  <Input
                    value={formData.column_names.col1}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      column_names: { ...prev.column_names, col1: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Coluna 2</label>
                  <Input
                    value={formData.column_names.col2}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      column_names: { ...prev.column_names, col2: e.target.value }
                    }))}
                  />
                </div>
                {formData.use_third_column && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome da Coluna 3</label>
                    <Input
                      value={formData.column_names.col3}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        column_names: { ...prev.column_names, col3: e.target.value }
                      }))}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {formData.table_data.map((row, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      value={row.col1}
                      onChange={(e) => {
                        const newData = [...formData.table_data];
                        newData[index] = { ...row, col1: e.target.value };
                        setFormData(prev => ({ ...prev, table_data: newData }));
                      }}
                      placeholder="Coluna 1"
                    />
                    <Input
                      value={row.col2}
                      onChange={(e) => {
                        const newData = [...formData.table_data];
                        newData[index] = { ...row, col2: e.target.value };
                        setFormData(prev => ({ ...prev, table_data: newData }));
                      }}
                      placeholder="Coluna 2"
                    />
                    {formData.use_third_column && (
                      <Input
                        value={row.col3}
                        onChange={(e) => {
                          const newData = [...formData.table_data];
                          newData[index] = { ...row, col3: e.target.value };
                          setFormData(prev => ({ ...prev, table_data: newData }));
                        }}
                        placeholder="Coluna 3"
                      />
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    table_data: [...prev.table_data, { col1: '', col2: '', col3: '' }]
                  }))}
                  className="w-full"
                >
                  Adicionar Linha
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Conteúdo Principal */}
        <div>
          <label className="block text-sm font-medium mb-2">Conteúdo Principal</label>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            required
            placeholder="Digite o conteúdo principal do post. Você pode usar markdown para formatação."
            className="min-h-[400px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Autor</label>
          <Input
            type="text"
            value={formData.author}
            onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Categorias (separadas por vírgula)</label>
          <Input
            type="text"
            value={formData.categories.join(', ')}
            onChange={e => setFormData(prev => ({ 
              ...prev, 
              categories: e.target.value.split(',').map(cat => cat.trim()).filter(Boolean)
            }))}
            placeholder="Tecnologia, Design, etc"
          />
        </div>

        {/* Link de Afiliado */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Loja do Produto</label>
            <select
              value={formData.store_name}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                store_name: e.target.value as typeof formData.store_name 
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecione a loja</option>
              <option value="mercado_livre">Mercado Livre</option>
              <option value="amazon">Amazon</option>
              <option value="magalu">Magazine Luiza</option>
              <option value="kabum">KaBuM!</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Link de Afiliado</label>
            <Input
              type="url"
              value={formData.affiliate_link}
              onChange={e => setFormData(prev => ({ ...prev, affiliate_link: e.target.value }))}
              placeholder="https://..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Imagem</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-2"
          />
          {formData.image_url && (
            <img 
              src={formData.image_url} 
              alt="Preview" 
              className="w-full max-w-md h-auto rounded-lg"
            />
          )}
        </div>

        <Button type="submit" className="w-full">
          Atualizar Post
        </Button>
      </form>
    </div>
  );
} 