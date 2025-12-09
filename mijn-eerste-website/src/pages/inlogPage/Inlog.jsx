import React from "react";
import {Link} from "react-router-dom";
import styles from "./Inlog.module.css";

export default function Login() {
    return (

        <main className={styles.main}>
            <section className={styles.loginSection}>
                <div className={styles.loginContainer}>
                    {/* Linker helft: voordelen */}
                    <div className={styles.loginLeft}>
                        <h2>Waarom inloggen?</h2>
                        <ul>
                            <li>Bekijk persoonlijke adviezen van je huisarts</li>
                            <li>Houd je klachten bij en volg voortgang</li>
                            <li>Ontvang zelfzorgtips en notificaties</li>
                            <li>Veilige opslag van medische informatie</li>
                        </ul>
                    </div>

                    {/* Rechter helft: login */}
                    <div className={styles.loginRight}>
                        <h2>Inloggen</h2>
                        <form className={styles.loginForm}>
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="jouw@email.nl"
                            />

                            <label htmlFor="password">Wachtwoord</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="Wachtwoord"
                            />

                            <p className={styles.noAccount}>
                                Heb je nog geen account?{" "}
                                <Link to="/registration">Registreren</Link>
                            </p>

                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" id="terms" name="terms" required/>
                                <label htmlFor="terms">Ik ga akkoord met de voorwaarden</label>
                            </div>

                            <button type="submit" className={styles.loginBtn}>
                                Inloggen
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
)
    ;
}
