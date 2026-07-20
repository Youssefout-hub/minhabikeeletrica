import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Minha Bike Elétrica — Calculadora de Economia',
  description: 'Compare bikes e patinetes elétricos para entregadores.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}