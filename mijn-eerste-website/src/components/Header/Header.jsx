import { Link } from 'react-router-dom';
import '../Header/Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="outer-content-container">
                <div className="inner-content-container">
                    {/* Logo */}
                    <div className="logo">
                        <Link to="/" className="logo-link">QuickHuisartsCheck</Link>
                    </div>

                    {/* Navigatie */}
                    <nav className="header-content__navigation" aria-label="Hoofdnavigatie">
                        <ul>
                            <li>
                                <a href="#faq-work-video" className="scroll-link">Hulp bij inloggen</a>
                            </li>
                            <li>
                                <a href="#services">Toegankelijkheid</a>
                            </li>
                            <li>
                                <a href="#contact">NL</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
