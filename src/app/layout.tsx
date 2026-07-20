import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minha Bike Elétrica | Melhores Bicicletas para Entregadores",
  description: "Encontre a melhor bicicleta elétrica para iFood, Rappi e Uber Eats.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-1S2PQ9DL0E`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1S2PQ9DL0E');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <nav className="bg-green-600 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <a href="/" className="text-xl font-bold">🚲 Minha Bike Elétrica</a>
            <div className="space-x-4">
              <a href="/" className="hover:underline">Início</a>
              <a href="/calculadora" className="hover:underline">Calculadora</a>
              <a href="/recomendador" className="hover:underline">Recomendador</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-800 text-white p-6 mt-12">
          <div className="max-w-6xl mx-auto text-center">
            <p>© 2026 Minha Bike Elétrica. Links afiliados .</p>
          </div>
        </footer>
      </body>
    </html>
  );
}