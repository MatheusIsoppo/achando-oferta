import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '@/services/postService';
import { Button } from '@/components/ui/button';
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Pega o último post da lista para ser o destaque
  const featuredPost = posts[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-gray-900">Post em Destaque</h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="w-full h-[400px] flex items-center justify-center">
                  <img
                    src={featuredPost.image_url}
                    alt={featuredPost.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                  />
                </div>
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.categories?.map((category) => (
                      <span
                        key={category}
                        className="text-xs font-medium px-3 py-1 bg-blue-50 text-primary rounded-full"
                      > 
                        {category}  
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-gray-900">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <span>{featuredPost.author}</span>
                  </div>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Button variant="outline" size="lg" className="text-sm font-medium w-full md:w-auto">
                      Ler Mais →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Latest Posts */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Últimos Posts</h2>
            <Link to="/posts">
              <Button variant="outline" size="lg" className="text-sm font-medium w-full md:w-auto">
                Ver Todos →
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-8">Carregando posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum post encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {posts.slice(1).map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="w-full h-[300px] flex items-center justify-center">
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <h2 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-blue-600 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <span>{post.author}</span>
                        </div>
                        {post.categories?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.categories.slice(0, 2).map((category, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
