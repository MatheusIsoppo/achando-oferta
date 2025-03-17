import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '@/services/postService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';

// Pegando a senha do arquivo .env
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('VITE_ADMIN_PASSWORD não está definida no arquivo .env');
}

// Função para gerar slug a partir do título
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function CreatePost() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    content_initial: '',
    author: '',
    categories: [] as string[],
    image_url: '',
    slug: '',
    has_table: false,
    table_data: [] as { col1: string; col2: string; col3?: string }[],
    use_third_column: false,
    column_names: {
      col1: 'Coluna 1',
      col2: 'Coluna 2',
      col3: 'Coluna 3'
    },
    affiliate_link: '',
    store_name: '' as 'mercado_livre' | 'amazon' | 'magalu' | 'kabum' | 'outros',
    keywords: '' // Palavras-chave para SEO
  });

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
    console.log('Tentando fazer upload do arquivo:', {
      nome: file.name,
      tipo: file.type,
      tamanho: `${(file.size / 1024 / 1024).toFixed(2)}MB`
    });
    
    try {
      setLoading(true);
      const imageUrl = await postService.uploadImage(file);
      console.log('Upload bem sucedido. URL:', imageUrl);
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
      alert('Imagem carregada com sucesso!');
    } catch (error) {
      console.error('Erro completo:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert(`Erro ao fazer upload da imagem:\n${errorMessage}\n\nPor favor, verifique o console para mais detalhes.`);
    } finally {
      setLoading(false);
      // Limpar o input de arquivo
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Você precisa estar autenticado para criar um post');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await postService.createPost({
        ...formData,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
        slug: generateSlug(formData.title)
      });

      if (result.success && result.data) {
        alert('Post criado com sucesso!');
        navigate(`/blog/${result.data.slug}`);
      } else {
        setError(result.error?.message || 'Erro ao criar post');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar post';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
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

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-28">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 pt-28">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-center">Acesso Negado</h1>
          <p className="text-center mb-4">Você precisa estar logado para criar posts.</p>
          <Button onClick={() => navigate('/admin/login')} className="w-full">
            Ir para Login
          </Button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="container mx-auto px-4 py-8 pt-28">
      <h1 className="text-2xl font-semibold mb-6">Criar Novo Post</h1>
      
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
              required
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
              required
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
              className="w-full max-w-md rounded-lg shadow-sm"
            />
          )}
        </div>

        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
            Palavras-chave (separadas por vírgula)
          </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={formData.keywords}
            onChange={e => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
            placeholder="exemplo: oferta, smartphone, tecnologia"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          <p className="mt-1 text-sm text-gray-500">
            Adicione palavras-chave relevantes para SEO, separadas por vírgula
          </p>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Criando...' : 'Criar Post'}
        </Button>
      </form>
    </div>
  );
} 