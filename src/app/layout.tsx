import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Minha Bike Elétrica — Melhor Bicicleta para Entregador',
  description: 'Compare bikes e patinetes elétricos para iFood, Rappi e Uber Eats. Calculadora de economia e recomendador inteligente.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1S2PQ9DL0E" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1S2PQ9DL0E');
          `
        }} />
      </head>
      <body>
        <header style={{
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          color: 'white',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 700 }}>🚲 Minha Bike Elétrica</a>
            <nav style={{ display: 'flex', gap: 24 }}>
              <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Início</a>
              <a href="/calculadora" style={{ color: 'white', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Calculadora</a>
              <a href="/recomendador" style={{ color: 'white', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Recomendador</a>
            </nav>
          </div>
        </header>

        {children}

        <footer style={{ background: '#0f172a', borderTop: '1px solid #1e293b', padding: '40px 24px', marginTop: 60 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>
              © 2026 Minha Bike Elétrica. Conteúdo para entregadores do Brasil.
            </p>
            <p style={{ color: '#64748b', fontSize: 12, marginBottom: 16 }}>
              Links afiliados Mercado Livre. Consulte leis locais antes de comprar.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              <a href="/privacidade" style={{ color: '#64748b', fontSize: 12, textDecoration: 'none' }}>Política de Privacidade</a>
              <a href="/termos" style={{ color: '#64748b', fontSize: 12, textDecoration: 'none' }}>Termos de Uso</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}