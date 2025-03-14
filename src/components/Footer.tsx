import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Achando Oferta</h3>
            <p className="text-sm">
              Encontrando as melhores ofertas e avaliando produtos para você fazer a melhor escolha.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Páginas</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">Sobre</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Termos de Serviço</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Achando Oferta. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;