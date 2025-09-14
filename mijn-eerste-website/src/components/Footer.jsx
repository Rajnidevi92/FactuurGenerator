import { Link } from 'react-router-dom';
import '../components/Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="outer-content-container">
                <div className="inner-content-container footer-flex">
                    <div className="footer-logo">QuickHuisartsCheck</div>
                    <div className="footer-links">
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/disclaimer">Disclaimer</Link>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
