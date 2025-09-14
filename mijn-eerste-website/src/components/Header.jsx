import { Link } from 'react-router-dom';
import '../components/Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="outer-content-container">
                <div className="inner-content-container">
                    <div className="logo">QuickHuisartsCheck</div>
                    <nav className="header-content__navigation">
                        <ul>
                            <li><a href="#header-login">Hulp bij inloggen</a></li>
                            <li><a href="#services">Toegankelijkheid</a></li>
                            <li><a href="#contact">NL</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
