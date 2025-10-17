import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./ComplaintFinder.module.css";

export default function Klacht() {
    return (
        <>
            <Header />
            <main className={styles.klachtWrapper}>
                <section className={styles.klachtCard} aria-labelledby="klacht-title">

                    <a href="#" className={styles.backButton}>&larr; Terug</a>

                    <h1 id="klacht-title">Wat is uw klacht?</h1>
                    <p className={styles.klachtSubtitle}>Beschrijf hieronder uw klacht.</p>

                    <form className={styles.klachtForm} action="#" method="post" noValidate>
                        <div className={styles.formField}>
              <textarea
                  id="klacht"
                  name="klacht"
                  placeholder="Typ hier uw klacht..."
                  required
              />
                        </div>

                        <button type="submit" className={styles.btnPrimary}>
                            Verzenden
                        </button>
                    </form>

                </section>
            </main>
            <Footer />
        </>
    );
}
