import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({ 
  title, 
  description, 
  image = 'https://seu-site.com/og-image.jpg',
  url = 'https://seu-site.com',
  type = 'website'
}: SEOProps) {
  const siteTitle = 'Achando Oferta';
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Meta tags básicas */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? "Article" : "WebSite",
          "url": url,
          "name": fullTitle,
          "description": description,
          "image": image,
          ...(type === 'article' && {
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
          })
        })}
      </script>
    </Helmet>
  );
} 