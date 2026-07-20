'use client';

import { useState } from 'react';

export default function CalculadoraPage() {
    const [kmDia, setKmDia] = useState(60);
    const [diasMes, setDiasMes] = useState(26);
    const [precoGasolina, setPrecoGasolina] = useState(5.89);
    const [consumoMoto, setConsumoMoto] = useState(35);
    const [precoOnibus, setPrecoOnibus] = useState(4.50);
    const [precoBike, setPrecoBike] = useState(4299);
    const [precoPatinete, setPrecoPatinete] = useState(2899);

    const kmMes = kmDia * diasMes;
    const custoMoto = (kmMes / consumoMoto) * precoGasolina;
    const custoOnibus = (precoOnibus * 2) * diasMes; // ida/volta
    const custoBike = 30;
    const custoPatinete = 20;
    const economiaBikeMoto = custoMoto - custoBike;
    const economiaBikeOnibus = custoOnibus - custoBike;
    const economiaPatineteMoto = custoMoto - custoPatinete;
    const paybackBike = Math.ceil(precoBike / (economiaBikeMoto > 0 ? economiaBikeMoto : 1));
    const paybackPatinete = Math.ceil(precoPatinete / (economiaPatineteMoto > 0 ? economiaPatineteMoto : 1));

    const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div style={{ background: '#0a0e1a', minHeight: '100vh', color: '#f8fafc', padding: '40px 20px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>💰 Calculadora de Economia</h1>
                <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: 40 }}>Compare o custo da bike elétrica vs moto e ônibus</p>

                <div style={{ background: '#111827', borderRadius: 24, padding: 32, border: '1px solid #1e293b' }}>
                    {/* Inputs */}
                    {[
                        { label: 'Km por dia', value: kmDia, min: 10, max: 150, step: 5, unit: 'km', set: setKmDia },
                        { label: 'Dias por mês', value: diasMes, min: 10, max: 31, step: 1, unit: 'dias', set: setDiasMes },
                        { label: 'Preço gasolina', value: precoGasolina, min: 3, max: 10, step: 0.01, unit: 'R$/L', set: setPrecoGasolina },
                        { label: 'Consumo moto', value: consumoMoto, min: 15, max: 50, step: 1, unit: 'km/L', set: setConsumoMoto },
                        { label: 'Passagem ônibus', value: precoOnibus, min: 2, max: 10, step: 0.25, unit: 'R$', set: setPrecoOnibus },
                        { label: 'Preço bike elétrica', value: precoBike, min: 1500, max: 10000, step: 100, unit: 'R$', set: setPrecoBike },
                        { label: 'Preço patinete', value: precoPatinete, min: 1000, max: 7000, step: 100, unit: 'R$', set: setPrecoPatinete },
                    ].map((field) => {
                        const pct = ((field.value - field.min) / (field.max - field.min)) * 100;
                        return (
                            <div key={field.label} style={{ marginBottom: 24 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <label style={{ fontSize: 14, color: '#94a3b8' }}>{field.label}</label>
                                    <span style={{ background: '#16a34a', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                                        {field.value} {field.unit}
                                    </span>
                                </div>
                                <div style={{ position: 'relative', height: 6, background: '#1e293b', borderRadius: 3 }}>
                                    <div style={{ height: '100%', background: '#22c55e', borderRadius: 3, width: `${pct}%`, transition: 'width 0.2s' }} />
                                    <input
                                        type="range"
                                        min={field.min}
                                        max={field.max}
                                        step={field.step}
                                        value={field.value}
                                        onChange={(e) => field.set(Number(e.target.value))}
                                        style={{ position: 'absolute', top: -10, left: 0, width: '100%', height: 26, opacity: 0, cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {/* Results */}
                    <div style={{ marginTop: 32, display: 'grid', gap: 12 }}>
                        {[
                            { title: 'Economia Bike vs Moto', value: `R$ ${fmt(economiaBikeMoto)}`, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
                            { title: 'Economia Bike vs Ônibus', value: `R$ ${fmt(economiaBikeOnibus)}`, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
                            { title: 'Economia Patinete vs Moto', value: `R$ ${fmt(economiaPatineteMoto)}`, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                            { title: 'Payback Bike', value: `${paybackBike} meses`, color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
                            { title: 'Payback Patinete', value: `${paybackPatinete} meses`, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
                        ].map((r) => (
                            <div key={r.title} style={{ background: r.bg, border: `1px solid ${r.color}33`, borderRadius: 16, padding: 20 }}>
                                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase' }}>{r.title}</div>
                                <div style={{ fontSize: 28, fontWeight: 800, color: r.color }}>{r.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}