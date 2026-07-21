export default function SobrePage() {
    return (
        <div className="page-wrapper">
            <section className="hero">
                <div className="hero-glow" />
                <div className="hero-content">
                    <h1 className="hero-title">👋 Quem Somos</h1>
                    <p className="hero-subtitle">A história por trás do Minha Bike Elétrica</p>
                </div>
            </section>

            <main className="main-container">
                <div className="content-grid single-column">
                    <div className="panel-card">
                        <div className="sobre-content">
                            <h2>Por que criamos este site?</h2>
                            <p>
                                O Minha Bike Elétrica nasceu de uma necessidade real: ajudar brasileiros
                                a encontrarem o meio de transporte ideal para o dia a dia, economizando
                                dinheiro e reduzindo o impacto ambiental.
                            </p>

                            <h2>Nossa história</h2>
                            <p>
                                Começamos testando bikes elétricas no dia a dia — para entregas,
                                trabalho e lazer. Percebemos que muita gente queria trocar a moto
                                ou o ônibus por uma bike elétrica, mas não sabia por onde começar.
                            </p>
                            <p>
                                Qual modelo comprar? Qual a autonomia real? Vale a pena o investimento?
                                Respondemos essas perguntas com dados reais, testes práticos e
                                comparações honestas.
                            </p>

                            <h2>Como funciona?</h2>
                            <ul>
                                <li>🔍 <strong>Pesquisamos</strong> os melhores modelos do mercado</li>
                                <li>📊 <strong>Comparamos</strong> preços, autonomia e durabilidade</li>
                                <li>🧮 <strong>Calculamos</strong> sua economia real com nossas ferramentas</li>
                                <li>🎯 <strong>Recomendamos</strong> a bike ideal para seu perfil</li>
                            </ul>

                            <h2>Independência e transparência</h2>
                            <p>
                                Somos independentes. Nossas recomendações são baseadas em dados,
                                não em comissões. Quando um link é afiliado, deixamos isso claro
                                — mas isso nunca influencia nossa opinião.
                            </p>

                            <h2>Entre em contato</h2>
                            <p>
                                Tem dúvidas, sugestões ou quer colaborar?
                                <a href="/contato" className="cta-button inline">Fale conosco →</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
