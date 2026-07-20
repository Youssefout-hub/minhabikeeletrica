"use client";

import { useState } from "react";

const bikes = [
    {
        nome: "Bicicleta Elétrica 500W 48V",
        preco: 4299,
        autonomia: 40,
        motor: "500W",
        bateria: "48V 15Ah",
        freio: "Disco",
        imagem: "🚲",
        tags: ["popular", "custo-beneficio"],
    },
    {
        nome: "Bike Elétrica Dobrável 350W",
        preco: 3599,
        autonomia: 35,
        motor: "350W",
        bateria: "36V 10Ah",
        freio: "V-Brake",
        imagem: "🛴",
        tags: ["compacta", "leve"],
    },
    {
        nome: "Bicicleta Elétrica 750W Premium",
        preco: 5899,
        autonomia: 55,
        motor: "750W",
        bateria: "48V 20Ah",
        freio: "Disco Hidráulico",
        imagem: "🏍️",
        tags: ["potente", "longa-autonomia"],
    },
    {
        nome: "Bike Elétrica Urbana 250W",
        preco: 2899,
        autonomia: 30,
        motor: "250W",
        bateria: "36V 8Ah",
        freio: "Disco",
        imagem: "🚴",
        tags: ["barata", "cidade"],
    },
    {
        nome: "Bicicleta Elétrica Cargo 1000W",
        preco: 7499,
        autonomia: 60,
        motor: "1000W",
        bateria: "48V 25Ah",
        freio: "Disco Duplo",
        imagem: "🚚",
        tags: ["carga", "entrega"],
    },
];

export default function Recomendador() {
    const [orcamento, setOrcamento] = useState(5000);
    const [autonomiaMin, setAutonomiaMin] = useState(30);
    const [potenciaMin, setPotenciaMin] = useState(250);

    const filtradas = bikes.filter((bike) =>
        bike.preco <= orcamento &&
        bike.autonomia >= autonomiaMin &&
        parseInt(bike.motor) >= potenciaMin
    );

    return (
        <main className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-2">🔍 Recomendador de Bikes</h1>
            <p className="text-gray-600 mb-8">Ajuste os filtros e encontre a bike ideal para você</p>

            {/* Filtros */}
            <div className="bg-white p-6 rounded-xl shadow-md border mb-8 grid md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Orçamento máximo: R$ {orcamento}</label>
                    <input type="range" min="2000" max="10000" step="100" value={orcamento}
                        onChange={(e) => setOrcamento(Number(e.target.value))}
                        className="w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Autonomia mínima: {autonomiaMin} km</label>
                    <input type="range" min="20" max="80" step="5" value={autonomiaMin}
                        onChange={(e) => setAutonomiaMin(Number(e.target.value))}
                        className="w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Potência mínima: {potenciaMin}W</label>
                    <input type="range" min="250" max="1000" step="50" value={potenciaMin}
                        onChange={(e) => setPotenciaMin(Number(e.target.value))}
                        className="w-full" />
                </div>
            </div>

            {/* Resultados */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtradas.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center py-12">Nenhuma bike encontrada com esses filtros. Tente ajustar.</p>
                ) : (
                    filtradas.map((bike) => (
                        <div key={bike.nome} className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition">
                            <div className="bg-gray-100 p-8 text-center text-6xl">{bike.imagem}</div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-2">{bike.nome}</h3>
                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <p>⚡ Motor: {bike.motor}</p>
                                    <p>🔋 Bateria: {bike.bateria}</p>
                                    <p>🛣️ Autonomia: {bike.autonomia} km</p>
                                    <p>🛑 Freio: {bike.freio}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {bike.tags.map((tag) => (
                                        <span key={tag} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-green-600">R$ {bike.preco.toLocaleString()}</span>
                                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition">
                                        Ver no Mercado Livre
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}