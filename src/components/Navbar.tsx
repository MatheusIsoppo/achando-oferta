import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import SearchPosts from "./SearchPosts";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
      if (window.innerWidth >= 800) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="font-semibold text-primary text-lg tracking-wide hover:text-primary/80 transition-colors whitespace-nowrap">
              ACHANDO OFERTA
            </Link>
            
            {/* Campo de busca - escondido em mobile */}
            {!isMobile && (
              <div className="flex-1 flex justify-center max-w-xl mx-4">
                <SearchPosts />
              </div>
            )}
            
            {isMobile ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="text-sm h-8 w-8 p-0"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="text-sm h-8 px-3 font-medium hover:bg-gray-100">Home</Button>
                </Link>
                <Link to="/posts">
                  <Button variant="ghost" size="sm" className="text-sm h-8 px-3 font-medium hover:bg-gray-100">Posts</Button>
                </Link>
                <Link to="/about">
                  <Button variant="ghost" size="sm" className="text-sm h-8 px-3 font-medium hover:bg-gray-100">Sobre</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Campo de busca em mobile - aparece abaixo do header */}
          {isMobile && (
            <div className="mt-2 flex justify-center">
              <div className="w-full max-w-md">
                <SearchPosts />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar para mobile */}
      {isMobile && (
        <>
          {/* Overlay escuro quando o sidebar está aberto */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-50 transition-opacity"
              onClick={closeSidebar}
            />
          )}

          {/* Sidebar */}
          <div className={`
            fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-xl
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-lg">Menu</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeSidebar}
                  className="text-sm h-8 w-8 p-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <Link to="/" onClick={closeSidebar}>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm h-10">
                    Home
                  </Button>
                </Link>
                <Link to="/posts" onClick={closeSidebar}>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm h-10">
                    Posts
                  </Button>
                </Link>
                <Link to="/about" onClick={closeSidebar}>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm h-10">
                    Sobre
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
