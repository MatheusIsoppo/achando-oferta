import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postService } from "@/services/postService";
import { Post } from "@/types/Post";
import Navbar from "@/components/Navbar";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await postService.getAllPosts();
        console.log('Posts com datas:', allPosts.map(post => ({
          id: post.id,
          created_at: post.created_at,
          formatted_date: new Date(post.created_at).toLocaleDateString('pt-BR')
        })));
        setPosts(allPosts);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os posts. Por favor, tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12 pt-28">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Todos os Posts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-t-xl overflow-hidden h-[300px]">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex space-x-2">
                    {post.categories?.map((category, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <span className="text-sm text-gray-500">
                    {post.created_at && !isNaN(new Date(post.created_at).getTime()) 
                      ? new Date(post.created_at).toLocaleDateString('pt-BR') 
                      : 'Data não disponível'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-gray-500">Nenhum post encontrado.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Posts;
