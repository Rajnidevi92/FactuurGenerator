// src/pages/login/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Inlog.css';

export default function Login() {
    return (
        <>
            <Header />

            <main style={{ marginTop: '100px' }}>
                <section className="login-section">
                    <div className="login-container">
                        <div className="login-left">
                            <h2>Waarom inloggen?</h2>
                            <ul>
                                <li>Bekijk persoonlijke adviezen van je huisarts</li>
                                <li>Houd je klachten bij en volg voortgang</li>
                                <li>Ontvang zelfzorgtips en notificaties</li>
                                <li>Veilige opslag van medische informatie</li>
                            </ul>
                        </div>

                        <div className="login-right">
                            <h2>Inloggen</h2>
                            <form className="login-form">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" name="email" required placeholder="jouw@email.nl" />

                                <label htmlFor="password">Wachtwoord</label>
                                <input type="password" id="password" name="password" required placeholder="Wachtwoord" />

                                <p className="no-account">
                                    Heb je nog geen account? <Link to="/registration">Registreren</Link>
                                </p>

                                <div className="checkbox-container">
                                    <input type="checkbox" id="terms" name="terms" required />
                                    <label htmlFor="terms">Ik ga akkoord met de voorwaarden</label>
                                </div>

                                <button type="submit" className="login-btn">Inloggen</button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
