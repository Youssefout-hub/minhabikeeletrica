export default function ContatoPage() {
    return (
        <div className="page-wrapper">
            <section className="hero">
                <div className="hero-glow" />
                <div className="hero-content">
                    <h1 className="hero-title">📬 Fale Conosco</h1>
                    <p className="hero-subtitle">Resposta em até 48 horas</p>
                </div>
            </section>

            <main className="main-container">
                <div className="content-grid single-column">
                    <div className="panel-card">
                        <form
                            action="mailto:contato@minhabikeeletrica.com.br"
                            method="post"
                            encType="text/plain"
                            className="contato-form"
                        >
                            <div className="form-group">
                                <label htmlFor="nome">Nome</label>
                                <input type="text" id="nome" name="nome" placeholder="Seu nome" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" name="email" placeholder="seu@email.com" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="assunto">Assunto</label>
                                <select id="assunto" name="assunto">
                                    <option value="duvida">Dúvida sobre bikes</option>
                                    <option value="sugestao">Sugestão de conteúdo</option>
                                    <option value="parceria">Parceria</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="mensagem">Mensagem</label>
                                <textarea id="mensagem" name="mensagem" rows={5} placeholder="Sua mensagem..." required />
                            </div>

                            <button type="submit" className="cta-button full-width">
                                Enviar Mensagem →
                            </button>
                        </form>

                        <div className="contato-info">
                            <p>📧 contato@minhabikeeletrica.com.br</p>
                            <p>⏰ Respondemos em até 48 horas úteis</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}