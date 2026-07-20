"use client";

import { useState } from "react";

export default function Calculadora() {
    const [kmDia, setKmDia] = useState(50);
    const [diasMes, setDiasMes] = useState(26);
    const [precoGasolina, setPrecoGasolina] = useState(6.0);
    const [consumoMoto, setConsumoMoto] = useState(30);
    const [precoBike, setPrecoBike] = useState(4500);
    const [precoOnibus, setPrecoOnibus] = useState(5.5);

    const kmMes = kmDia * diasMes;
    const custoMoto = (kmMes / consumoMoto) * precoGasolina;
    const custoOnibus = kmMes * precoOnibus;
    const custoBike = 30;
    const economiaMoto = custoMoto - custoBike;
    const economiaOnibus = custoOnibus - custoBike;
    const payback = precoBike / economiaMoto;

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-2">💰 Calculadora de Economia</h1>
            <p className="text-gray-600 mb-8">Compare o custo da bike elétrica vs moto e ônibus</p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-white p-6 rounded-xl shadow-md border space-y-4">
                    <h2 className="text-xl font-bold mb-4">Seu Uso</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">Km por dia</label>
                        <input type="number" value={kmDia} onChange={(e) => setKmDia(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Dias por mês</label>
                        <input type="number" value={diasMes} onChange={(e) => setDiasMes(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Preço gasolina (R$/L)</label>
                        <input type="number" step="0.1" value={precoGasolina} onChange={(e) => setPrecoGasolina(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Consumo moto (km/L)</label>
                        <input type="number" value={consumoMoto} onChange={(e) => setConsumoMoto(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Preço bike elétrica (R$)</label>
                        <input type="number" value={precoBike} onChange={(e) => setPrecoBike(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Preço passagem ônibus (R$)</label>
                        <input type="number" step="0.1" value={precoOnibus} onChange={(e) => setPrecoOnibus(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg" />
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                        <h3 className="text-lg font-bold text-red-800">🏍️ Custo Moto/ mês</h3>
                        <p className="text-3xl font-bold text-red-600">R$ {custoMoto.toFixed(2)}</p>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                        <h3 className="text-lg font-bold text-yellow-800">🚌 Custo Ônibus/ mês</h3>
                        <p className="text-3xl font-bold text-yellow-600">R$ {custoOnibus.toFixed(2)}</p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                        <h3 className="text-lg font-bold text-green-800">⚡ Custo Bike Elétrica/ mês</h3>
                        <p className="text-3xl font-bold text-green-600">R$ {custoBike.toFixed(2)}</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h3 className="text-lg font-bold text-blue-800">💚 Economia vs Moto</h3>
                        <p className="text-3xl font-bold text-blue-600">R$ {economiaMoto.toFixed(2)}/mês</p>
                        <p className="text-sm text-blue-500 mt-1">Payback: {payback.toFixed(1)} meses</p>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                        <h3 className="text-lg font-bold text-purple-800">💚 Economia vs Ônibus</h3>
                        <p className="text-3xl font-bold text-purple-600">R$ {economiaOnibus.toFixed(2)}/mês</p>
                    </div>
                </div>
            </div>
        </main>
    );
}