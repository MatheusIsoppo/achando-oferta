import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar posts..."
          className="w-full px-4 py-2 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </form>
  );
};

export default SearchPosts; 