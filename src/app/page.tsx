'use client';

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// ===== TYPES =====
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
  color: 'green' | 'blue' | 'yellow' | 'purple';
  icon: string;
}

interface ArticleProps {
  emoji: string;
  title: string;
  desc: string;
  tags: Array<{ text: string; color: string }>;
  href: string;
}

// ===== SLIDER =====
function Slider({ label, value, min, max, step, unit, onChange, icon }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="slider-container">
      <div className="slider-header">
        <label className="slider-label">
          <span className="slider-icon">{icon}</span>
          {label}
        </label>
        <span className="slider-value-badge">
          {value} {unit}
        </span>
      </div>
      <div className="slider-track-wrapper">
        <div className="slider-track">
          <div className="slider-fill" style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input"
        />
        <div className="slider-thumb" style={{ left: `calc(${pct}% - 12px)` }} />
      </div>
      <div className="slider-range-labels">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}

// ===== RESULT CARD =====
function ResultCard({ title, value, sub, color, icon }: ResultProps) {
  const colorMap = {
    green: { bg: 'result-green', text: 'text-green', border: 'border-green' },
    blue: { bg: 'result-blue', text: 'text-blue', border: 'border-blue' },
    yellow: { bg: 'result-yellow', text: 'text-yellow', border: 'border-yellow' },
    purple: { bg: 'result-purple', text: 'text-purple', border: 'border-purple' },
  };
  const c = colorMap[color];

  return (
    <div className={`result-card ${c.bg} ${c.border}`}>
      <div className="result-header">
        <span className="result-icon">{icon}</span>
        <span className="result-title">{title}</span>
      </div>
      <div className={`result-value ${c.text}`}>{value}</div>
      <div className="result-sub">{sub}</div>
    </div>
  );
}

// ===== ARTICLE CARD =====
function ArticleCard({ emoji, title, desc, tags, href }: ArticleProps) {
  return (
    <a href={href} className="article-card">
      <div className="article-inner">
        <div className="article-emoji">{emoji}</div>
        <div className="article-content">
          <h3 className="article-title">{title}</h3>
          <p className="article-desc">{desc}</p>
          <div className="article-tags">
            {tags.map((t, i) => (
              <span key={i} className={`article-tag tag-${t.color}`}>{t.text}</span>
            ))}
          </div>
        </div>
        <span className="article-arrow">→</span>
      </div>
    </a>
  );
}

// ===== MAIN PAGE =====
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
    <div className="page-wrapper">
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <h1 className="hero-title">💰 Calculadora de Economia</h1>
          <p className="hero-subtitle">Compare o custo da bike elétrica vs moto e ônibus. Descubra quanto você economiza por mês.</p>
        </div>
      </section>

      {/* MAIN */}
      <main className="main-container">
        <div className="content-grid">
          {/* LEFT: Controls */}
          <div className="left-panel">
            <div className="panel-card">
              <h2 className="panel-title">⚙️ Seu Uso</h2>
              <Slider label="Km por dia" value={kmDia} min={10} max={150} step={5} unit="km" icon="📍" onChange={setKmDia} />
              <Slider label="Dias por mês" value={diasMes} min={10} max={31} step={1} unit="dias" icon="📅" onChange={setDiasMes} />
              <Slider label="Preço gasolina" value={precoGasolina} min={3} max={10} step={0.01} unit="R$/L" icon="⛽" onChange={setPrecoGasolina} />
              <Slider label="Consumo moto" value={consumoMoto} min={15} max={50} step={1} unit="km/L" icon="🏍️" onChange={setConsumoMoto} />
              <Slider label="Passagem ônibus" value={precoOnibus} min={2} max={10} step={0.25} unit="R$" icon="🚌" onChange={setPrecoOnibus} />
              <Slider label="Preço bike elétrica" value={precoBike} min={1500} max={10000} step={100} unit="R$" icon="🚲" onChange={setPrecoBike} />
              <Slider label="Preço patinete" value={precoPatinete} min={1000} max={7000} step={100} unit="R$" icon="🛴" onChange={setPrecoPatinete} />
            </div>

            <div className="articles-section">
              <h2 className="section-title">📰 Reviews & Comparativos</h2>
              {articles.map((a, i) => (
                <ArticleCard key={i} {...a} />
              ))}
            </div>
          </div>

          {/* RIGHT: Results (Desktop) */}
          <aside className="right-panel desktop-only">
            <div className="sticky-results">
              <h2 className="panel-title">📊 Resultados</h2>
              <ResultCard title="Economia Bike vs Moto" value={`R$ ${fmt(r.economiaBikeMoto)}`} sub="por mês" color="green" icon="💚" />
              <ResultCard title="Economia Bike vs Ônibus" value={`R$ ${fmt(r.economiaBikeOnibus)}`} sub="por mês" color="blue" icon="💙" />
              <ResultCard title="Economia Patinete vs Moto" value={`R$ ${fmt(r.economiaPatineteMoto)}`} sub="por mês" color="yellow" icon="💛" />
              <ResultCard title="Payback Bike" value={`${r.paybackBike} meses`} sub="para pagar o investimento" color="purple" icon="⏱️" />
              <ResultCard title="Payback Patinete" value={`${r.paybackPatinete} meses`} sub="para pagar o investimento" color="green" icon="⚡" />

              <div className="cta-card">
                <div className="cta-emoji">🎯</div>
                <div className="cta-title">Quer a melhor bike?</div>
                <div className="cta-sub">Use nosso recomendador inteligente</div>
                <a href="/recomendador" className="cta-button">Encontrar Bike →</a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MOBILE FAB */}
      <button className="mobile-fab" onClick={() => setMobileOpen(true)}>
        📊 Resultados
      </button>

      {/* MOBILE SHEET */}
      <div className={`mobile-sheet ${mobileOpen ? 'open' : ''}`}>
        <div className="sheet-header">
          <h3>📊 Resultados</h3>
          <button className="sheet-close" onClick={() => setMobileOpen(false)}>✕</button>
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