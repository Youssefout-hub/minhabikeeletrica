import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-b from-green-50 to-white rounded-2xl mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
          Melhor Bicicleta Elétrica para Entregador
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Economize dinheiro, ganhe tempo e trabalhe com conforto.
          Compare as melhores bikes elétricas para iFood, Rappi e Uber Eats.
        </p>
        <div className="space-x-4">
          <Link href="/calculadora" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Calcular Economia 💰
          </Link>
          <Link href="/recomendador" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Encontrar Bike 🔍
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="text-xl font-bold mb-2">Economia Real</h3>
          <p className="text-gray-600">Compare o custo da bike elétrica vs moto e ônibus. Veja quanto você economiza por mês.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-xl font-bold mb-2">Bikes Testadas</h3>
          <p className="text-gray-600">Análises honestas de bicicletas elétricas reais disponíveis no Mercado Livre.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="text-4xl mb-3">🇧🇷</div>
          <h3 className="text-xl font-bold mb-2">Feito para o Brasil</h3>
          <p className="text-gray-600">Conteúdo em português, preços em reais, pensado para entregadores brasileiros.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 text-white p-8 rounded-2xl text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="mb-6">Use nossa calculadora e descubra a melhor bike para o seu trabalho.</p>
        <Link href="/recomendador" className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          Ver Recomendações
        </Link>
      </section>
    </main>
  );
}