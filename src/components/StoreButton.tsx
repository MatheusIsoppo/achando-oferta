import React from 'react';
import StoreLogo from './StoreLogo';

type StoreType = 'mercado_livre' | 'amazon' | 'magalu' | 'kabum' | 'outros';

interface LogoSizes {
  main?: string; // Tamanho do logo principal
}

interface StoreButtonProps {
  store: StoreType;
  link: string;
  logoSizes?: Partial<Record<StoreType, LogoSizes>>;
}

const storeNames = {
  mercado_livre: 'Mercado Livre',
  amazon: 'Amazon',
  magalu: 'Magazine Luiza',
  kabum: 'KaBuM!',
  outros: 'Site Oficial'
};

const storeColors = {
  mercado_livre: 'bg-[#FFF159] hover:bg-[#FFE600] text-[#2D3277] font-semibold',
  amazon: 'bg-[#232F3E] hover:bg-[#131921] text-white font-medium',
  magalu: 'bg-[#0086FF] hover:bg-[#0066CC] text-white font-medium',
  kabum: 'bg-[#FF6500] hover:bg-[#E65D00] text-white font-medium',
  outros: 'bg-gray-900 hover:bg-gray-800 text-white'
};

// Tamanhos padrão dos logos
const defaultLogoSizes: Record<StoreType, LogoSizes> = {
  amazon: { main: 'w-32 h-32' },
  mercado_livre: { main: 'w-24 h-24' },
  magalu: { main: 'w-34 h-34' },
  kabum: { main: 'w-28 h-28' },
  outros: { main: 'w-12 h-12' }
};

export const StoreButton: React.FC<StoreButtonProps> = ({ store, link, logoSizes = {} }) => {
  const hasOfficialLogo = ['mercado_livre', 'amazon', 'magalu', 'kabum'].includes(store);

  // Função para obter o tamanho do logo
  const getLogoSize = (type: 'main') => {
    return logoSizes[store]?.[type] || defaultLogoSizes[store][type];
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className=" rounded-xl p-6  transition-all duration-300">
        <div className="flex flex-col items-center">
          <StoreLogo 
            store={store} 
            className={`${getLogoSize('main')} mb-4`}
          />
          
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group relative w-full
              flex items-center justify-center gap-3
              px-6 py-3 rounded-lg
              font-medium text-base
              transition-all duration-300 transform hover:scale-[1.02]
              ${storeColors[store]}
              overflow-hidden
            `}
          >
            <span>Ir para {storeNames[store]}</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
            <div className={`
              absolute inset-0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700
              ${store === 'amazon' ? 'bg-[#FF9900]/10' : ''}
              ${store === 'magalu' ? 'bg-[#00A1FF]/10' : ''}
              ${store === 'kabum' ? 'bg-[#FF6500]/10' : ''}
              ${!['amazon', 'magalu', 'kabum'].includes(store) ? 'bg-white/10' : ''}
            `} />
          </a>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Clique para ver mais detalhes e comprar com segurança
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreButton; 