import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./Registration.module.css";

export default function Registration() {
    return (
        <>
            <Header />
            <main className={`${styles.authWrapper} outer-content-container`}>
                <div className="inner-content-container">
                    <div className={styles.authCard} aria-labelledby="register-title">
                        <h1 id="register-title">Account aanmaken</h1>
                        <p className={styles.authSubtitle}>
                            Maak een nieuw QuickHuisartsCheck-account aan.
                        </p>

                        <form className={styles.authForm} action="#" method="post" noValidate>
                            <div className={styles.formRow}>
                                <div className={styles.formField}>
                                    <label htmlFor="firstName">Voornaam</label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="lastName">Achternaam</label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="dob">Geboortedatum</label>
                                <input id="dob" name="dob" type="date" required />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="email">E-mailadres</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formField}>
                                    <label htmlFor="password">Wachtwoord</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        minLength="8"
                                        required
                                    />
                                    <small className={styles.helpText}>Minimaal 8 tekens.</small>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="password2">Herhaal wachtwoord</label>
                                    <input
                                        id="password2"
                                        name="password2"
                                        type="password"
                                        minLength="8"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formCheck}>
                                <input id="terms" name="terms" type="checkbox" required />
                                <label htmlFor="terms">
                                    Ik ga akkoord met de <a href="#">voorwaarden</a> en <a href="#">privacy</a>.
                                </label>
                            </div>

                            <button type="submit" className={styles.btnPrimary}>
                                Registreren
                            </button>

                            <p className={styles.authAlt}>
                                Al een account? <a href="login.html">Inloggen</a>
                            </p>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
