import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import CreatePost from "@/pages/CreatePost";
import EditPost from '@/pages/EditPost';
import SearchResults from '@/pages/SearchResults';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import ScrollToTop from "@/components/ScrollToTop";
import Posts from "@/pages/Posts";
import CookieConsent from "@/components/CookieConsent";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-1 pt-[120px] md:pt-[80px]">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/pagina-para-criar-post" element={<CreatePost />} />
              <Route path="/blog/:slug/edit" element={<EditPost />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/posts" element={<Posts />} />
            </Routes>
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
