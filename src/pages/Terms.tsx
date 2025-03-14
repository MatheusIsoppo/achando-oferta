import Navbar from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12 pt-28">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8 text-gray-900">Termos de Serviço</h1>
          
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">1. Aceitação dos Termos</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Ao acessar e utilizar o Achando Oferta, você concorda com estes termos de serviço. 
                Se você não concordar com algum aspecto destes termos, recomendamos que não utilize nosso site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">2. Natureza do Serviço</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                O Achando Oferta é um site de divulgação de ofertas que:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Não realiza vendas diretas de produtos</li>
                <li>Não possui estoque próprio</li>
                <li>Não processa pagamentos</li>
                <li>Redireciona usuários para sites de lojas parceiras</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">3. Isenção de Responsabilidade</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                O Achando Oferta não se responsabiliza por:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Transações realizadas nas lojas parceiras</li>
                <li>Disponibilidade dos produtos anunciados</li>
                <li>Variações de preços nas lojas</li>
                <li>Qualidade dos produtos ou serviços</li>
                <li>Problemas com entrega ou garantia</li>
                <li>Atendimento ao cliente das lojas parceiras</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">4. Links Afiliados</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Nosso site utiliza links afiliados, o que significa que:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Podemos receber comissão por vendas realizadas</li>
                <li>O preço final para o consumidor permanece o mesmo</li>
                <li>As comissões ajudam a manter nosso serviço gratuito</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">5. Propriedade Intelectual</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Todo o conteúdo do site, incluindo textos, imagens, logos e design, são de propriedade 
                do Achando Oferta ou devidamente licenciados, sendo proibida sua reprodução sem autorização.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">6. Modificações nos Termos</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                O Achando Oferta se reserva o direito de modificar estes termos a qualquer momento, 
                sendo responsabilidade do usuário verificar periodicamente as atualizações.
              </p>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms; 