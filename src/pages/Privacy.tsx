import { Helmet } from 'react-helmet-async';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade - Achando Oferta</title>
        <meta name="description" content="Política de privacidade do Achando Oferta. Saiba como tratamos seus dados pessoais." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Informações que coletamos</h2>
          <p className="mb-4">Coletamos as seguintes informações quando você utiliza nosso site:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Informações de navegação através do Google Analytics</li>
            <li>Cookies necessários para o funcionamento do site</li>
            <li>Dados fornecidos voluntariamente em formulários</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Como usamos suas informações</h2>
          <p className="mb-4">Utilizamos suas informações para:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Melhorar a experiência de navegação</li>
            <li>Análise de uso do site</li>
            <li>Personalização de conteúdo</li>
            <li>Comunicação sobre ofertas e novidades (quando autorizado)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cookies</h2>
          <p className="mb-4">Utilizamos cookies para:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Manter você conectado</li>
            <li>Lembrar suas preferências</li>
            <li>Análise de tráfego (Google Analytics)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Links externos</h2>
          <p className="mb-4">
            Nosso site contém links para sites externos de parceiros e afiliados. 
            Não nos responsabilizamos pelas práticas de privacidade desses sites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Seus direitos</h2>
          <p className="mb-4">Você tem direito a:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Acessar seus dados pessoais</li>
            <li>Solicitar correção de dados incorretos</li>
            <li>Solicitar exclusão de seus dados</li>
            <li>Revogar consentimento para uso dos dados</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contato</h2>
          <p className="mb-4">
            Para questões sobre nossa política de privacidade, entre em contato através do email: 
            <a href="mailto:contato@achandooferta.com.br" className="text-primary hover:underline">
              {' '}contato@achandooferta.com.br
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Atualizações</h2>
          <p className="mb-4">
            Esta política pode ser atualizada periodicamente. A data da última atualização será sempre indicada no topo desta página.
          </p>
          <p className="text-sm text-gray-600">
            Última atualização: 14 de Março de 2024
          </p>
        </section>
      </div>
    </>
  );
};

export default Privacy; 