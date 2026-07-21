import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="site-header">
            <div className="header-inner">
                <Link href="/" className="logo">
                    <Image src="/logo.png" alt="Minha Bike Elétrica" width={40} height={40} />
                    <span className="logo-text">Minha <span>Bike</span></span>
                </Link>
                <nav>
                    <Link href="/calculadora" className="cta-button inline">Calculadora</Link>
                </nav>
            </div>
        </header>
    );
}
