import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="outer-content-container">
                <div className="inner-content-container footer-flex">
                    <div className="footer-logo">
                        <Link to="/#" className="logo-link">QuickHuisartsCheck</Link>
                    </div>
                    {/* Tip 1: div -> nav */}
                    <nav className="footer-links">
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/disclaimer">Disclaimer</Link>
                        {/* Tip 2: href="#" vervangen door echte route */}
                        <Link to="/contact">Contact</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
