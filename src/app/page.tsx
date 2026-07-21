'use client';

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (val: number) => void;
  icon: string;
}

interface ResultProps {
  title: string;
  value: string;
  sub: string;
  color: string;
  icon: string;
}

interface ArticleProps {
  emoji: string;
  title: string;
  desc: string;
  tags: Array<{ text: string; color: string }>;
  href: string;
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-700 bg-slate-900 px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <a href="/" className="flex items-center gap-3 text-xl font-bold text-white no-underline">
          <img src="/logo.png" alt="Logo" className="h-9 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span>Minha <span className="text-orange-500">Bike</span></span>
        </a>
        <nav className="flex gap-6 text-sm text-slate-300">
          <a href="/" className="hover:text-white">Início</a>
          <a href="/calculadora" className="hover:text-white">Calculadora</a>
          <a href="/recomendador" className="hover:text-white">Recomendador</a>
          <a href="/sobre" className="hover:text-white">Sobre</a>
        </nav>
      </div>
    </header>
  );
}

function Slider({ label, value, min, max, step, unit, onChange, icon }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <span className="text-xl">{icon}</span>
          {label}
        </label>
        <span className="rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-1 text-sm font-semibold text-white">
          {value} {unit}
        </span>
      </div>
      <div className="relative flex h-8 items-center">
        <div className="absolute h-2 w-full rounded-full bg-slate-900">
          <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400" style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute z-10 h-full w-full cursor-pointer opacity-0"
        />
        <div className="absolute z-0 h-6 w-6 rounded-full border-3 border-white bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg" style={{ left: `calc(${pct}% - 12px)` }} />
      </div>
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}

function ResultCard({ title, value, sub, color, icon }: ResultProps) {
  const borderClass = {
    green: 'border-l-green-500',
    blue: 'border-l-blue-500',
    yellow: 'border-l-yellow-500',
    purple: 'border-l-purple-500',
  }[color] || 'border-l-orange-500';

  const textClass = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
    purple: 'text-purple-500',
  }[color] || 'text-orange-500';

  return (
    <div className={`mb-4 rounded-lg border border-slate-700 bg-slate-900 p-4 ${borderClass} border-l-4`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className="text-sm text-slate-300">{title}</span>
      </div>
      <div className={`text-2xl font-bold ${textClass}`}>{value}</div>
      <div className="mt-1 text-xs text-slate-400">{sub}</div>
    </div>
  );
}

function ArticleCard({ emoji, title, desc, tags, href }: ArticleProps) {
  return (
    <a href={href} className="mb-4 block rounded-2xl border border-slate-700 bg-slate-800 p-5 no-underline transition-all hover:border-orange-500 hover:translate-x-1">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{emoji}</div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
          <p className="mb-3 text-sm leading-relaxed text-slate-300">{desc}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span
                key={i}
                className={`rounded-full px-3 py-1 text-xs font-medium ${t.color === 'green'
                    ? 'bg-green-500/20 text-green-400'
                    : t.color === 'yellow'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
              >
                {t.text}
              </span>
            ))}
          </div>
        </div>
        <span className="text-xl text-orange-500">→</span>
      </div>
    </a>
  );
}

export default function HomePage() {
  const [kmDia, setKmDia] = useState(60);
  const [diasMes, setDiasMes] = useState(26);
  const [precoGasolina, setPrecoGasolina] = useState(5.89);
  const [consumoMoto, setConsumoMoto] = useState(35);
  const [precoOnibus, setPrecoOnibus] = useState(4.50);
  const [precoBike, setPrecoBike] = useState(4299);
  const [precoPatinete, setPrecoPatinete] = useState(2899);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bikes, setBikes] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('bikes').select('*').then(({ data }) => {
      setBikes(data || []);
      console.log('Bikes from Supabase:', data);
    });
  }, []);

  const calcular = useCallback(() => {
    const kmMes = kmDia * diasMes;
    const custoMoto = (kmMes / consumoMoto) * precoGasolina;
    const custoOnibus = (precoOnibus * 2) * diasMes;
    const custoBike = 30;
    const custoPatinete = 20;
    const economiaBikeMoto = custoMoto - custoBike;
    const economiaBikeOnibus = custoOnibus - custoBike;
    const economiaPatineteMoto = custoMoto - custoPatinete;
    const paybackBike = Math.ceil(precoBike / (economiaBikeMoto > 0 ? economiaBikeMoto : 1));
    const paybackPatinete = Math.ceil(precoPatinete / (economiaPatineteMoto > 0 ? economiaPatineteMoto : 1));
    return { kmMes, custoMoto, custoOnibus, custoBike, custoPatinete, economiaBikeMoto, economiaBikeOnibus, economiaPatineteMoto, paybackBike, paybackPatinete };
  }, [kmDia, diasMes, precoGasolina, consumoMoto, precoOnibus, precoBike, precoPatinete]);

  const r = calcular();
  const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const articles: ArticleProps[] = [
    { emoji: '🚲', title: 'Melhor Bicicleta Elétrica para iFood em 2026', desc: 'Compare as 5 melhores bikes elétricas para entregadores. Autonomia, preço e durabilidade testadas na rua.', tags: [{ text: 'R$ 3.299', color: 'green' }, { text: '40km autonomia', color: 'yellow' }], href: '/reviews/melhor-bike-entrega-2026' },
    { emoji: '🛴', title: 'Patinete Elétrico vs Bike: Qual Vale Mais?', desc: 'Análise completa de custo-benefício. Veja qual compensa mais no dia a dia.', tags: [{ text: 'R$ 2.899', color: 'green' }, { text: '35km autonomia', color: 'blue' }], href: '/reviews/bike-vs-patinete-entrega' },
    { emoji: '⛽', title: 'Bike Elétrica vs Moto: Quanto Você Economiza?', desc: 'Descubra quanto dinheiro você guarda por mês trocando a moto pela bike elétrica.', tags: [{ text: 'Economia: R$ 450/mês', color: 'green' }], href: '/reviews/bike-eletrica-vs-moto' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <section className="relative border-b border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-12 text-center">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 opacity-5 blur-3xl" />
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-extrabold text-white">💰 Calculadora de Economia</h1>
          <p className="mx-auto max-w-xl text-lg text-slate-300">Compare o custo da bike elétrica vs moto e ônibus. Descubra quanto você economiza por mês.</p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-800 p-6">
              <h2 className="mb-6 text-xl font-semibold text-white">⚙️ Seu Uso</h2>
              <Slider label="Km por dia" value={kmDia} min={10} max={150} step={5} unit="km" icon="📍" onChange={setKmDia} />
              <Slider label="Dias por mês" value={diasMes} min={10} max={31} step={1} unit="dias" icon="📅" onChange={setDiasMes} />
              <Slider label="Preço gasolina" value={precoGasolina} min={3} max={10} step={0.01} unit="R$/L" icon="⛽" onChange={setPrecoGasolina} />
              <Slider label="Consumo moto" value={consumoMoto} min={15} max={50} step={1} unit="km/L" icon="🏍️" onChange={setConsumoMoto} />
              <Slider label="Passagem ônibus" value={precoOnibus} min={2} max={10} step={0.25} unit="R$" icon="🚌" onChange={setPrecoOnibus} />
              <Slider label="Preço bike elétrica" value={precoBike} min={1500} max={10000} step={100} unit="R$" icon="🚲" onChange={setPrecoBike} />
              <Slider label="Preço patinete" value={precoPatinete} min={1000} max={7000} step={100} unit="R$" icon="🛴" onChange={setPrecoPatinete} />
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">📰 Reviews & Comparativos</h2>
              {articles.map((a, i) => (
                <ArticleCard key={i} {...a} />
              ))}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="mb-6 text-xl font-semibold text-white">📊 Resultados</h2>
              <ResultCard title="Economia Bike vs Moto" value={`R$ ${fmt(r.economiaBikeMoto)}`} sub="por mês" color="green" icon="💚" />
              <ResultCard title="Economia Bike vs Ônibus" value={`R$ ${fmt(r.economiaBikeOnibus)}`} sub="por mês" color="blue" icon="💙" />
              <ResultCard title="Economia Patinete vs Moto" value={`R$ ${fmt(r.economiaPatineteMoto)}`} sub="por mês" color="yellow" icon="💛" />
              <ResultCard title="Payback Bike" value={`${r.paybackBike} meses`} sub="para pagar o investimento" color="purple" icon="⏱️" />
              <ResultCard title="Payback Patinete" value={`${r.paybackPatinete} meses`} sub="para pagar o investimento" color="green" icon="⚡" />

              <div className="mt-6 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-center">
                <div className="mb-2 text-4xl">🎯</div>
                <div className="mb-1 text-lg font-semibold text-white">Quer a melhor bike?</div>
                <div className="mb-4 text-sm text-slate-300">Use nosso recomendador inteligente</div>
                <a href="/recomendador" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3 font-semibold text-white no-underline shadow-lg transition-transform hover:-translate-y-0.5">Encontrar Bike →</a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <button className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-4 font-semibold text-white shadow-xl lg:hidden" onClick={() => setMobileOpen(true)}>
        📊 Resultados
      </button>

      <div className={`fixed bottom-0 left-0 right-0 z-40 max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-slate-700 bg-slate-800 p-6 transition-transform lg:hidden ${mobileOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">📊 Resultados</h3>
          <button className="text-2xl text-slate-400" onClick={() => setMobileOpen(false)}>✕</button>
        </div>
        <ResultCard title="Economia Bike vs Moto" value={`R$ ${fmt(r.economiaBikeMoto)}`} sub="por mês" color="green" icon="💚" />
        <ResultCard title="Economia Bike vs Ônibus" value={`R$ ${fmt(r.economiaBikeOnibus)}`} sub="por mês" color="blue" icon="💙" />
        <ResultCard title="Economia Patinete vs Moto" value={`R$ ${fmt(r.economiaPatineteMoto)}`} sub="por mês" color="yellow" icon="💛" />
        <ResultCard title="Payback Bike" value={`${r.paybackBike} meses`} sub="para pagar o investimento" color="purple" icon="⏱️" />
        <ResultCard title="Payback Patinete" value={`${r.paybackPatinete} meses`} sub="para pagar o investimento" color="green" icon="⚡" />
      </div>
    </div>
  );
}
