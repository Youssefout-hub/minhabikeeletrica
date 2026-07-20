'use client';

import { useState } from 'react';

// ===== DATA: BIKES =====
interface Bike {
    id: string;
    nome: string;
    tipo: 'pedalec' | 'ciclomotor';
    motorW: number;
    bateriaAh: number;
    autonomiaKm: number;
    velocidadeMax: number;
    pesoMaxKg: number;
    alturaMinCm: number;
    alturaMaxCm: number;
    altitudeMaxM: number;
    quadroPolegadas: string;
    temPedais: boolean;
    bateriaRemovivel: boolean;
    preco: number;
    imagem: string;
    linkML: string;
    tags: string[];
}

const bikes: Bike[] = [
    {
        id: 'bike1',
        nome: 'Bicicleta Elétrica 350W 36V',
        tipo: 'pedalec',
        motorW: 350,
        bateriaAh: 10,
        autonomiaKm: 35,
        velocidadeMax: 32,
        pesoMaxKg: 100,
        alturaMinCm: 150,
        alturaMaxCm: 175,
        altitudeMaxM: 1000,
        quadroPolegadas: '16"',
        temPedais: true,
        bateriaRemovivel: true,
        preco: 3299,
        imagem: '🚲',
        linkML: 'https://lista.mercadolivre.com.br/bicicleta-eletrica-350w',
        tags: ['popular', 'custo-beneficio', 'entrega'],
    },
    {
        id: 'bike2',
        nome: 'Bicicleta Elétrica 500W 48V',
        tipo: 'pedalec',
        motorW: 500,
        bateriaAh: 15,
        autonomiaKm: 50,
        velocidadeMax: 32,
        pesoMaxKg: 120,
        alturaMinCm: 160,
        alturaMaxCm: 185,
        altitudeMaxM: 2000,
        quadroPolegadas: '18"',
        temPedais: true,
        bateriaRemovivel: true,
        preco: 4299,
        imagem: '🚲',
        linkML: 'https://lista.mercadolivre.com.br/bicicleta-eletrica-500w',
        tags: ['recomendada', 'entrega', 'alta-autonomia'],
    },
    {
        id: 'bike3',
        nome: 'Bicicleta Elétrica 750W 48V',
        tipo: 'pedalec',
        motorW: 750,
        bateriaAh: 17,
        autonomiaKm: 55,
        velocidadeMax: 32,
        pesoMaxKg: 130,
        alturaMinCm: 165,
        alturaMaxCm: 190,
        altitudeMaxM: 3000,
        quadroPolegadas: '20"',
        temPedais: true,
        bateriaRemovivel: true,
        preco: 5299,
        imagem: '🚲',
        linkML: 'https://lista.mercadolivre.com.br/bicicleta-eletrica-750w',
        tags: ['potente', 'montanha', 'alta-altitude'],
    },
    {
        id: 'bike4',
        nome: 'Bicicleta Elétrica 1000W 52V',
        tipo: 'pedalec',
        motorW: 1000,
        bateriaAh: 20,
        autonomiaKm: 60,
        velocidadeMax: 32,
        pesoMaxKg: 150,
        alturaMinCm: 170,
        alturaMaxCm: 195,
        altitudeMaxM: 4000,
        quadroPolegadas: '21"',
        temPedais: true,
        bateriaRemovivel: true,
        preco: 6299,
        imagem: '🚲',
        linkML: 'https://lista.mercadolivre.com.br/bicicleta-eletrica-1000w',
        tags: ['top', 'pesado', 'extrema-altitude'],
    },
    {
        id: 'ciclo1',
        nome: 'Ciclomotor Elétrico 2000W 60V',
        tipo: 'ciclomotor',
        motorW: 2000,
        bateriaAh: 25,
        autonomiaKm: 70,
        velocidadeMax: 50,
        pesoMaxKg: 180,
        alturaMinCm: 160,
        alturaMaxCm: 200,
        altitudeMaxM: 5000,
        quadroPolegadas: 'N/A',
        temPedais: false,
        bateriaRemovivel: true,
        preco: 8999,
        imagem: '🏍️',
        linkML: 'https://lista.mercadolivre.com.br/ciclomotor-eletrico',
        tags: ['ciclomotor', 'cnh-obrigatoria', 'placa'],
    },
];

// ===== TYPES =====
interface FormData {
    peso: number;
    alturaCiclista: number;
    altitude: number;
    uso: 'entrega' | 'lazer' | 'montanha';
    terreno: 'plano' | 'misto' | 'declive';
    distanciaDiaria: number;
    orcamento: number;
    temCNH: boolean;
    aceitaPlaca: boolean;
}

// ===== SLIDER =====
function Slider({ label, value, min, max, step, unit, onChange, icon }: any) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div className="rec-slider">
            <div className="rec-slider-header">
                <label><span>{icon}</span> {label}</label>
                <span className="rec-slider-badge">{value} {unit}</span>
            </div>
            <div className="rec-slider-track-wrap">
                <div className="rec-slider-track"><div className="rec-slider-fill" style={{ width: `${pct}%` }} /></div>
                <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="rec-slider-input" />
                <div className="rec-slider-thumb" style={{ left: `calc(${pct}% - 11px)` }} />
            </div>
            <div className="rec-slider-labels"><span>{min} {unit}</span><span>{max} {unit}</span></div>
        </div>
    );
}

// ===== TOGGLE =====
function Toggle({ label, value, onChange }: any) {
    return (
        <div className="rec-toggle" onClick={() => onChange(!value)}>
            <span className="rec-toggle-label">{label}</span>
            <div className={`rec-toggle-switch ${value ? 'on' : ''}`}>
                <div className="rec-toggle-knob" />
            </div>
        </div>
    );
}

// ===== SELECT =====
function Select({ label, value, options, onChange, icon }: any) {
    return (
        <div className="rec-select">
            <label><span>{icon}</span> {label}</label>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((o: any) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>
    );
}

// ===== RESULT CARD =====
function ResultCard({ bike, rank }: { bike: Bike; rank: number }) {
    const isPedalec = bike.tipo === 'pedalec';
    return (
        <div className="rec-result-card">
            <div className="rec-result-rank">#{rank}</div>
            <div className="rec-result-header">
                <span className="rec-result-emoji">{bike.imagem}</span>
                <div>
                    <h3 className="rec-result-name">{bike.nome}</h3>
                    <span className={`rec-result-tipo ${isPedalec ? 'pedalec' : 'ciclomotor'}`}>
                        {isPedalec ? '✅ Isento de CNH/Placa' : '⚠️ Precisa CNH + Placa'}
                    </span>
                </div>
            </div>

            <div className="rec-result-specs">
                <div className="rec-spec"><span className="rec-spec-label">Motor</span><span className="rec-spec-value">{bike.motorW}W</span></div>
                <div className="rec-spec"><span className="rec-spec-label">Bateria</span><span className="rec-spec-value">{bike.bateriaAh}Ah {bike.bateriaRemovivel ? '(Removível)' : '(Fixa)'}</span></div>
                <div className="rec-spec"><span className="rec-spec-label">Autonomia</span><span className="rec-spec-value">{bike.autonomiaKm} km</span></div>
                <div className="rec-spec"><span className="rec-spec-label">Velocidade</span><span className="rec-spec-value">{bike.velocidadeMax} km/h</span></div>
                <div className="rec-spec"><span className="rec-spec-label">Quadro</span><span className="rec-spec-value">{bike.quadroPolegadas}</span></div>
                <div className="rec-spec"><span className="rec-spec-label">Peso Máx</span><span className="rec-spec-value">{bike.pesoMaxKg} kg</span></div>
                <div className="rec-spec"><span className="rec-spec-label">Altitude</span><span className="rec-spec-value">até {bike.altitudeMaxM}m</span></div>
            </div>

            <div className="rec-result-price">
                <span className="rec-price-label">Preço</span>
                <span className="rec-price-value">R$ {bike.preco.toLocaleString('pt-BR')}</span>
            </div>

            <div className="rec-result-tags">
                {bike.tags.map((t, i) => (
                    <span key={i} className="rec-tag">{t}</span>
                ))}
            </div>

            <a href={bike.linkML} target="_blank" rel="noopener noreferrer" className="rec-result-btn">
                Ver no Mercado Livre →
            </a>
        </div>
    );
}

// ===== MAIN =====
export default function RecomendadorPage() {
    const [form, setForm] = useState<FormData>({
        peso: 80,
        alturaCiclista: 175,
        altitude: 800,
        uso: 'entrega',
        terreno: 'misto',
        distanciaDiaria: 40,
        orcamento: 5000,
        temCNH: false,
        aceitaPlaca: false,
    });

    const [results, setResults] = useState<Bike[] | null>(null);

    const calcularRecomendacao = () => {
        let motorMin = 250;
        if (form.peso > 80) motorMin = 350;
        if (form.peso > 100) motorMin = 500;
        if (form.peso > 120) motorMin = 750;
        if (form.altitude > 1000) motorMin = Math.max(motorMin, 500);
        if (form.altitude > 2000) motorMin = Math.max(motorMin, 750);
        if (form.terreno === 'declive') motorMin = Math.max(motorMin, 500);
        if (form.terreno === 'misto') motorMin = Math.max(motorMin, 350);

        const autonomiaMin = form.distanciaDiaria * 1.5;

        const filtered = bikes.filter((b) => {
            if (b.preco > form.orcamento) return false;
            if (b.motorW < motorMin) return false;
            if (b.autonomiaKm < autonomiaMin) return false;
            if (form.alturaCiclista < b.alturaMinCm || form.alturaCiclista > b.alturaMaxCm) return false;
            if (form.altitude > b.altitudeMaxM) return false;
            if (form.peso > b.pesoMaxKg) return false;
            if (!form.temCNH && b.tipo === 'ciclomotor') return false;
            if (!form.aceitaPlaca && b.tipo === 'ciclomotor') return false;
            if (form.uso === 'entrega' && !b.bateriaRemovivel) return false;
            return true;
        });

        setResults(filtered.length > 0 ? filtered : []);
    };

    return (
        <div className="rec-page">
            {/* HERO */}
            <section className="rec-hero">
                <div className="rec-hero-glow" />
                <div className="rec-hero-content">
                    <h1>🔍 Recomendador de Bike</h1>
                    <p>Responda algumas perguntas e encontraremos a bike elétrica perfeita para você.</p>
                </div>
            </section>

            <main className="rec-main">
                <div className="rec-grid">
                    {/* FORM */}
                    <div className="rec-form-panel">
                        <h2 className="rec-panel-title">⚙️ Seu Perfil</h2>

                        <Slider label="Seu peso" value={form.peso} min={40} max={150} step={1} unit="kg" icon="⚖️" onChange={(v: number) => setForm({ ...form, peso: v })} />
                        <Slider label="Sua altura" value={form.alturaCiclista} min={140} max={210} step={1} unit="cm" icon="📏" onChange={(v: number) => setForm({ ...form, alturaCiclista: v })} />
                        <Slider label="Altitude da sua cidade" value={form.altitude} min={0} max={4000} step={50} unit="m" icon="🏔️" onChange={(v: number) => setForm({ ...form, altitude: v })} />
                        <Slider label="Distância diária" value={form.distanciaDiaria} min={5} max={100} step={5} unit="km" icon="📍" onChange={(v: number) => setForm({ ...form, distanciaDiaria: v })} />
                        <Slider label="Orçamento máximo" value={form.orcamento} min={1500} max={15000} step={100} unit="R$" icon="💰" onChange={(v: number) => setForm({ ...form, orcamento: v })} />

                        <Select
                            label="Uso principal"
                            value={form.uso}
                            icon="🎯"
                            options={[
                                { value: 'entrega', label: '📦 Entrega (iFood/Rappi/Uber)' },
                                { value: 'lazer', label: '🌳 Lazer / Passeio' },
                                { value: 'montanha', label: '⛰️ Montanha / Trilha' },
                            ]}
                            onChange={(v: string) => setForm({ ...form, uso: v as any })}
                        />

                        <Select
                            label="Tipo de terreno"
                            value={form.terreno}
                            icon="🛤️"
                            options={[
                                { value: 'plano', label: '🏙️ Plano (cidade)' },
                                { value: 'misto', label: '🏘️ Misto (subidas leves)' },
                                { value: 'declive', label: '🏔️ Declives / Montanha' },
                            ]}
                            onChange={(v: string) => setForm({ ...form, terreno: v as any })}
                        />

                        <Toggle label="Tenho CNH (Carteira de Motorista)" value={form.temCNH} onChange={(v: boolean) => setForm({ ...form, temCNH: v })} />
                        <Toggle label="Aceito placa e registro" value={form.aceitaPlaca} onChange={(v: boolean) => setForm({ ...form, aceitaPlaca: v })} />

                        <button className="rec-calc-btn" onClick={calcularRecomendacao}>
                            🚀 Encontrar Minha Bike
                        </button>
                    </div>

                    {/* RESULTS */}
                    <div className="rec-results-panel">
                        {results === null ? (
                            <div className="rec-empty">
                                <div className="rec-empty-icon">🚲</div>
                                <h3>Preencha o formulário</h3>
                                <p>Clique em "Encontrar Minha Bike" para ver as recomendações.</p>
                            </div>
                        ) : results.length === 0 ? (
                            <div className="rec-empty">
                                <div className="rec-empty-icon">😕</div>
                                <h3>Nenhuma bike encontrada</h3>
                                <p>Tente aumentar o orçamento ou ajustar seus critérios.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="rec-panel-title">🏆 {results.length} Bike{results.length > 1 ? 's' : ''} Recomendada{results.length > 1 ? 's' : ''}</h2>
                                {results.map((bike, i) => (
                                    <ResultCard key={bike.id} bike={bike} rank={i + 1} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}