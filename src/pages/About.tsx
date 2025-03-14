import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12 pt-28">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8 text-gray-900">Como funciona o Achando Oferta?</h1>
          
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Nossa Missão</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                O Achando Oferta não é e nunca será uma loja virtual. Nossa missão é única e clara: 
                apresentar as melhores promoções das maiores e mais reconhecidas lojas do Brasil, 
                ajudando nossos usuários a economizar em suas compras online.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Como Funcionamos</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Atuamos exclusivamente como um portal de divulgação, apresentando ofertas e produtos 
                que são comercializados por lojas parceiras de grande porte e reconhecimento nacional. 
                Não realizamos vendas diretas nem mantemos estoque próprio.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Isenção de Responsabilidade</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Todos os produtos divulgados em nossa plataforma são vendidos e entregues diretamente 
                pelas lojas parceiras. O Achando Oferta não se responsabiliza por transações, entregas, 
                garantias ou quaisquer aspectos relacionados à compra, que são de responsabilidade 
                exclusiva das lojas anunciantes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Nosso Compromisso</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Nos dedicamos a selecionar e apresentar ofertas apenas de lojas reconhecidas e 
                confiáveis do mercado brasileiro. Quando você vê uma oferta em nossa plataforma, 
                pode ter certeza de que ela pertence a uma loja com reconhecimento de nível nacional.
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 italic">
                Nota: O Achando Oferta é um site de divulgação de ofertas e pode receber comissão 
                por vendas realizadas através dos links disponibilizados. Isso não afeta o preço 
                final pago pelo consumidor.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
