import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postService } from '@/services/postService';
import Navbar from '@/components/Navbar';
import type { Post } from '@/services/postService';
import StoreButton from '@/components/StoreButton';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from '@/components/OptimizedImage';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) return;
        const data = await postService.getPostBySlug(slug);
        if (!data) {
          navigate('/404');
          return;
        }
        setPost(data);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 pt-28">
          <div className="text-center">Carregando post...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 pt-28">
          <div className="text-center text-gray-500">Post não encontrado</div>
        </div>
      </div>
    );
  }

  // Schema.org markup para artigo
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.image_url,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Achando Oferta",
      "logo": {
        "@type": "ImageObject",
        "url": "https://achandooferta.com.br/logo.png" // Substitua pela URL do seu logo
      }
    },
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "description": post.excerpt
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{post.title} | Achando Oferta</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image_url} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:modified_time" content={post.updated_at || post.created_at} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image_url} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-16">
        <article className="max-w-5xl mx-auto">
          {/* Imagem do Post e Botão de Compra */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6 md:mb-8">
            {post.image_url && (
              <div className="flex-1">
                <OptimizedImage
                  src={post.image_url}
                  alt={post.title}
                  className="w-full max-w-[400px] h-auto object-contain rounded-lg shadow-md mx-auto"
                  priority
                />
              </div>
            )}
            
            {post.affiliate_link && post.store_name && (
              <div className="flex-1 flex items-center justify-center md:justify-start">
                <StoreButton 
                  store={post.store_name} 
                  link={post.affiliate_link} 
                />
              </div>
            )}
          </div>

          {/* Título e Metadados */}
          <div className="mb-6 md:mb-8">
            <div className="w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight break-words">
                {post.title}
              </h1>
              <div className="w-full h-px bg-gray-200 mb-4"></div>
              <div className="flex items-center text-gray-bold text-sm">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.published_at || '').toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>

          {/* Categorias */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-blue-50 text-primary rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Resumo */}
          <div className="mb-6 md:mb-8 prose prose-sm md:prose-xl max-w-none">
            {post.excerpt.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('##') && !paragraph.startsWith('###')) {
                return (
                  <h2 
                    key={index} 
                    className="text-2xl md:text-4xl font-bold text-gray-800 mt-8 md:mt-12 mb-4 md:mb-6"
                  >
                    {paragraph.substring(2).trim()}
                  </h2>
                );
              }
              
              if (paragraph.startsWith('###')) {
                return (
                  <h3 
                    key={index} 
                    className="text-xl md:text-3xl font-bold text-gray-800 mt-8 md:mt-12 mb-4 md:mb-6"
                  >
                    {paragraph.substring(3).trim()}
                  </h3>
                );
              }

              if (paragraph.startsWith('>')) {
                return (
                  <blockquote 
                    key={index} 
                    className="my-4 md:my-6 bg-blue-50/30 px-4 md:px-6 py-3 md:py-4 rounded-lg"
                  >
                    <p className="text-base md:text-lg text-gray-700 italic">
                      {paragraph.substring(1).trim()}
                    </p>
                  </blockquote>
                );
              }

              if (paragraph.startsWith('-')) {
                return (
                  <li 
                    key={index} 
                    className="ml-4 md:ml-6 mb-2 md:mb-3 text-base md:text-lg text-gray-700 list-disc"
                  >
                    {paragraph.substring(1).trim()}
                  </li>
                );
              }

              if (paragraph.trim() === '') {
                return <div key={index} className="h-3 md:h-4" />;
              }

              // Processa links no formato [texto](link)
              const processLinks = (text: string) => {
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                const parts = text.split(linkRegex);
                
                return parts.map((part, i) => {
                  if (i % 3 === 1) { // É o texto do link
                    const link = parts[i + 1];
                    return (
                      <Link
                        key={i}
                        to={link}
                        className="text-primary hover:text-primary/80 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {part}
                      </Link>
                    );
                  } else if (i % 3 === 2) { // É o link, já foi processado
                    return null;
                  } else { // É texto normal
                    return part;
                  }
                });
              };

              return (
                <p key={index} className="mb-4 md:mb-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                  {processLinks(paragraph)}
                </p>
              );
            })}
          </div>

          {/* Conteúdo Inicial */}
          {post.content_initial && (
            <div className="mb-6 md:mb-8 prose prose-sm md:prose-xl max-w-none">
              {post.content_initial.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('##') && !paragraph.startsWith('###')) {
                  return (
                    <h2 
                      key={index} 
                      className="text-2xl md:text-4xl font-bold text-gray-800 mt-8 md:mt-12 mb-4 md:mb-6"
                    >
                      {paragraph.substring(2).trim()}
                    </h2>
                  );
                }
                
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 
                      key={index} 
                      className="text-xl md:text-3xl font-bold text-gray-800 mt-8 md:mt-12 mb-4 md:mb-6"
                    >
                      {paragraph.substring(3).trim()}
                    </h3>
                  );
                }

                if (paragraph.startsWith('>')) {
                  return (
                    <blockquote 
                      key={index} 
                      className="my-4 md:my-6 bg-blue-50/30 px-4 md:px-6 py-3 md:py-4 rounded-lg"
                    >
                      <p className="text-base md:text-lg text-gray-700 italic">
                        {paragraph.substring(1).trim()}
                      </p>
                    </blockquote>
                  );
                }

                if (paragraph.startsWith('-')) {
                  return (
                    <li 
                      key={index} 
                      className="ml-4 md:ml-6 mb-2 md:mb-3 text-base md:text-lg text-gray-700 list-disc"
                    >
                      {paragraph.substring(1).trim()}
                    </li>
                  );
                }

                if (paragraph.trim() === '') {
                  return <div key={index} className="h-3 md:h-4" />;
                }

                // Processa links no formato [texto](link)
                const processLinks = (text: string) => {
                  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                  const parts = text.split(linkRegex);
                  
                  return parts.map((part, i) => {
                    if (i % 3 === 1) { // É o texto do link
                      const link = parts[i + 1];
                      return (
                        <Link
                          key={i}
                          to={link}
                          className="text-primary hover:text-primary/80 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {part}
                        </Link>
                      );
                    } else if (i % 3 === 2) { // É o link, já foi processado
                      return null;
                    } else { // É texto normal
                      return part;
                    }
                  });
                };

                return (
                  <p key={index} className="mb-4 md:mb-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                    {processLinks(paragraph)}
                  </p>
                );
              })}
            </div>
          )}

          {/* Tabela Comparativa */}
          {post.has_table && post.table_data && post.table_data.length > 0 && (
            <div className="mb-6 md:mb-8">
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="min-w-full px-4 md:px-0">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-3 md:px-4 py-3 text-left text-sm md:text-base font-semibold border">
                          {post.column_names?.col1 || 'Coluna 1'}
                        </th>
                        <th className="px-3 md:px-4 py-3 text-left text-sm md:text-base font-semibold border">
                          {post.column_names?.col2 || 'Coluna 2'}
                        </th>
                        {post.use_third_column && (
                          <th className="px-3 md:px-4 py-3 text-left text-sm md:text-base font-semibold border">
                            {post.column_names?.col3 || 'Coluna 3'}
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {post.table_data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-3 md:px-4 py-3 border text-sm md:text-base">{row.col1}</td>
                          <td className="px-3 md:px-4 py-3 border text-sm md:text-base">{row.col2}</td>
                          {post.use_third_column && (
                            <td className="px-3 md:px-4 py-3 border text-sm md:text-base">{row.col3}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo */}
          <div className="prose prose-sm md:prose-xl max-w-none">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('##') && !paragraph.startsWith('###')) {
                return (
                  <h2 
                    key={index} 
                    className="text-2xl md:text-4xl font-bold text-gray-800 mt-8 md:mt-12 mb-4 md:mb-6"
                  >
                    {paragraph.substring(2).trim()}
                  </h2>
                );
              }
              
              if (paragraph.startsWith('###')) {
                return (
                  <h3 
                    key={index} 
                    className="text-xl md:text-3xl font-bold text-gray-800 mt-8 md:mt-12 mb-4 md:mb-6"
                  >
                    {paragraph.substring(3).trim()}
                  </h3>
                );
              }

              if (paragraph.startsWith('>')) {
                return (
                  <blockquote 
                    key={index} 
                    className="my-4 md:my-6 bg-blue-50/30 px-4 md:px-6 py-3 md:py-4 rounded-lg"
                  >
                    <p className="text-base md:text-lg text-gray-700 italic">
                      {paragraph.substring(1).trim()}
                    </p>
                  </blockquote>
                );
              }

              if (paragraph.startsWith('-')) {
                return (
                  <li 
                    key={index} 
                    className="ml-4 md:ml-6 mb-2 md:mb-3 text-base md:text-lg text-gray-700 list-disc"
                  >
                    {paragraph.substring(1).trim()}
                  </li>
                );
              }

              if (paragraph.trim() === '') {
                return <div key={index} className="h-3 md:h-4" />;
              }

              // Processa links no formato [texto](link)
              const processLinks = (text: string) => {
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                const parts = text.split(linkRegex);
                
                return parts.map((part, i) => {
                  if (i % 3 === 1) { // É o texto do link
                    const link = parts[i + 1];
                    return (
                      <Link
                        key={i}
                        to={link}
                        className="text-primary hover:text-primary/80 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {part}
                      </Link>
                    );
                  } else if (i % 3 === 2) { // É o link, já foi processado
                    return null;
                  } else { // É texto normal
                    return part;
                  }
                });
              };

              return (
                <p key={index} className="mb-4 md:mb-6 text-base md:text-lg text-gray-700 leading-relaxed">
                  {processLinks(paragraph)}
                </p>
              );
            })}
          </div>

          {/* Botão de Compra (Final do Post) */}
          {post.affiliate_link && post.store_name && (
            <div className="mt-8 md:mt-12">
              <div className="rounded-xl p-4 md:p-8 transition-all duration-300">
                <div className="flex flex-col items-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Gostou do Produto?</h3>
                  
                  <div className="w-full max-w-lg">
                    <StoreButton 
                      store={post.store_name} 
                      link={post.affiliate_link} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
