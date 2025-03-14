import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm md:text-base">
          Usamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com nossa{' '}
          <a href="/privacy" className="underline hover:text-blue-300">
            Política de Privacidade
          </a>
          {' '}e{' '}
          <a href="/terms" className="underline hover:text-blue-300">
            Termos de Uso
          </a>
          .
        </div>
        <div className="flex gap-4">
          <Button
            onClick={handleAccept}
            className="bg-primary hover:bg-primary/90"
          >
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 