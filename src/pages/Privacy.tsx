import Navbar from "@/components/Navbar";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12 pt-28">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8 text-gray-900">Política de Privacidade</h1>
          
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">1. Introdução</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                O Achando Oferta está comprometido em proteger sua privacidade. Esta política descreve como 
                coletamos, usamos e protegemos suas informações quando você utiliza nosso site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">2. Coleta de Informações</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Coletamos informações quando você:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Visita nosso site</li>
                <li>Utiliza nossa ferramenta de busca</li>
                <li>Clica em links de produtos</li>
                <li>Interage com nossas redes sociais</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">3. Uso de Cookies</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Utilizamos cookies para melhorar sua experiência de navegação. Eles nos ajudam a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Lembrar suas preferências</li>
                <li>Entender como você usa nosso site</li>
                <li>Melhorar nossos serviços</li>
                <li>Fornecer anúncios mais relevantes</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">4. Compartilhamento de Dados</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Não vendemos suas informações pessoais. Compartilhamos dados apenas com:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Parceiros de análise de dados (de forma anônima)</li>
                <li>Lojas parceiras (apenas quando você clica em seus produtos)</li>
                <li>Autoridades (quando legalmente exigido)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">5. Seus Direitos</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Você tem direito a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Acessar seus dados pessoais</li>
                <li>Solicitar correção de informações</li>
                <li>Solicitar exclusão de dados</li>
                <li>Optar por não receber comunicações</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">6. Contato</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Para questões sobre privacidade, entre em contato através do email: privacidade@achandooferta.com
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

export default Privacy; 