import React from 'react';

type StoreType = 'mercado_livre' | 'amazon' | 'magalu' | 'kabum' | 'outros';

interface StoreLogoProps {
  store: StoreType;
  className?: string;
}

export const StoreLogo: React.FC<StoreLogoProps> = ({ store, className = "w-6 h-6" }) => {
  switch (store) {
    case 'mercado_livre':
      return (
        <img
          src="/mercado-livre-87.png"
          alt="Logo Mercado Livre"
          className={`${className} object-contain`}
        />
      );
    case 'amazon':
      return (
        <img
          src="/amazon.png"
          alt="Logo Amazon"
          className={`${className} object-contain`}
        />
      );
    case 'magalu':
      return (
        <img
          src="/magazine-luiza.png"
          alt="Logo Magazine Luiza"
          className={`${className} object-contain`}
        />
      );
    case 'kabum':
      return (
        <img
          src="/kabum.png"
          alt="Logo KaBuM!"
          className={`${className} object-contain`}
        />
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
  }
};

export default StoreLogo; 