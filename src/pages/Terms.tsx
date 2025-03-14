import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Uso - Achando Oferta</title>
        <meta name="description" content="Termos de uso do Achando Oferta. Conheça as regras e condições de uso do nosso site." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-5xl mx-auto px-4 py-12 pt-28">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>
            
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">1. Aceitação dos Termos</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Ao acessar e usar o site Achando Oferta, você concorda com estes termos de uso. 
                  Se você não concordar com algum dos termos, recomendamos que não utilize nossos serviços.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">2. Descrição do Serviço</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  O Achando Oferta é um site que:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Reúne e apresenta ofertas de diversos e-commerces</li>
                  <li>Fornece análises e comparações de produtos</li>
                  <li>Utiliza links de afiliados para monetização</li>
                  <li>Oferece conteúdo informativo sobre produtos e ofertas</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">3. Links de Afiliados</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Nosso site utiliza links de afiliados. Isso significa que:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Podemos receber comissão por compras realizadas através de nossos links</li>
                  <li>O preço final para o usuário permanece o mesmo</li>
                  <li>As comissões nos ajudam a manter o site funcionando</li>
                  <li>Sempre indicamos quando um link é de afiliado</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">4. Responsabilidades</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  O Achando Oferta não se responsabiliza por:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Disponibilidade dos produtos nas lojas parceiras</li>
                  <li>Alterações de preços após a publicação</li>
                  <li>Problemas com entregas ou atendimento das lojas parceiras</li>
                  <li>Qualidade dos produtos anunciados</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">5. Propriedade Intelectual</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Todo o conteúdo do site (textos, imagens, logotipos, etc.) é protegido por direitos autorais. 
                  Não é permitido copiar, reproduzir ou utilizar sem autorização prévia.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">6. Alterações nos Termos</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Reservamos o direito de modificar estes termos a qualquer momento. 
                  Alterações significativas serão comunicadas através do site.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">7. Legislação Aplicável</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida 
                  nos tribunais do Brasil.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">8. Contato</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Para dúvidas sobre estes termos, entre em contato através do email:{' '}
                  <a href="mailto:contato@achandooferta.com.br" className="text-primary hover:underline">
                    contato@achandooferta.com.br
                  </a>
                </p>
              </section>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                  Última atualização: 14 de Março de 2024
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Terms; 