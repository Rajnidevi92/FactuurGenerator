import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./ComplaintQuestions.module.css";

export default function ComplaintQuestions() {
    return (
        <>
            <Header />
            <main className={styles.mainWrapper}>
                <section className={styles.complaintSection}>
                    <div className={styles.complaintContainer}>

                        {/* Linker helft */}
                        <div className={styles.complaintLeft}>
                            <h2>Klacht: Hoofdpijn</h2>
                            <p>Beantwoord de vragen over deze klacht. Vink de van toepassing zijnde antwoorden aan.</p>
                        </div>

                        {/* Rechter helft */}
                        <div className={styles.complaintRight}>
                            <form className={styles.complaintForm} action="#" method="POST">
                                <label>
                                    <input type="checkbox" name="symptom1" />
                                    Sinds wanneer ervaar je hoofdpijn?
                                </label>

                                <label>
                                    <input type="checkbox" name="symptom2" />
                                    Hoe ernstig is de pijn (schaal 1-10)?
                                </label>

                                <label>
                                    <input type="checkbox" name="symptom3" />
                                    Heb je misselijkheid of andere klachten?
                                </label>

                                <label>
                                    <input type="checkbox" name="symptom4" />
                                    Zijn er triggers bekend zoals stress of voeding?
                                </label>

                                <button type="submit" className={styles.continueBtn}>
                                    Doorgaan
                                </button>
                            </form>
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
