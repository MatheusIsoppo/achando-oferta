import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { postService } from '@/services/postService';
import type { Post } from '@/services/postService';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchPosts = async () => {
      setIsLoading(true);
      try {
        const allPosts = await postService.getAllPosts();
        const filtered = allPosts.filter(post => 
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      searchPosts();
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Resultados para: <span className="text-primary">{query}</span>
      </h1>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Buscando posts...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum resultado encontrado para "{query}"</p>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {results.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors bg-white"
            >
              {post.image_url && (
                <div className="sm:w-[180px] md:w-[200px] flex-shrink-0">
                  <div className="relative pt-[56.25%] sm:pt-[75%] rounded-lg overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm md:text-base text-gray-600 line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                )}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.categories.map((category, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 