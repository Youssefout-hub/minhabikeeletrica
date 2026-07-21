export default function AfiliacaoPage() {
    return (
        <div className="page-wrapper">
            <section className="hero">
                <div className="hero-glow" />
                <div className="hero-content">
                    <h1 className="hero-title">🔗 Divulgação de Afiliação</h1>
                    <p className="hero-subtitle">Transparência total sobre nossos links</p>
                </div>
            </section>

            <main className="main-container">
                <div className="content-grid single-column">
                    <div className="panel-card">
                        <div className="sobre-content">
                            <h2>O que é afiliação?</h2>
                            <p>
                                Alguns links neste site são links de afiliados. Isso significa que,
                                se você clicar e comprar um produto, podemos receber uma pequena
                                comissão — sem nenhum custo adicional para você.
                            </p>

                            <h2>Nossa independência</h2>
                            <p>
                                <strong>Isso não influencia nossas recomendações.</strong> Avaliamos
                                cada produto com base em critérios técnicos objetivos: autonomia real,
                                durabilidade da bateria, custo-benefício e avaliações de usuários.
                            </p>
                            <p>
                                Nunca recomendamos um produto apenas porque ele paga comissão.
                                Nosso objetivo é ajudar você a fazer a melhor escolha.
                            </p>

                            <h2>Como identificar links afiliados?</h2>
                            <p>
                                Todos os links de compra são claramente identificados com o texto
                                <strong> "Comprar no Mercado Livre"</strong> ou similar. Não usamos
                                links ocultos ou enganosos.
                            </p>

                            <h2>Programas de afiliados que utilizamos</h2>
                            <ul>
                                <li>🛒 <strong>Mercado Livre</strong> — Programa de Afiliados</li>
                                <li>🛒 <strong>Amazon Brasil</strong> — Associados Amazon</li>
                            </ul>

                            <h2>Dúvidas?</h2>
                            <p>
                                Se tiver qualquer dúvida sobre nossos links afiliados,
                                <a href="/contato" className="cta-button inline">entre em contato →</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}