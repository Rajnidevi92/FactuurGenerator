import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./Dashboard.module.css";
import Tile from "../../components/Tile/Tile";

export default function Dashboard() {
    return (
        <>
            <Header />

            <main className={styles.main}>
                {/* User-bar sectie */}
                <section className={styles.userBarSection}>
                    <div className={styles.userBar}>
                        <div className={styles.profileBlock}>
                            <div className={styles.userDetails}>
                                <span className={styles.loginBadge}>U bent ingelogd als:</span>
                                <span className={styles.userName}>Naam</span>
                            </div>
                            <div className={styles.userAvatarSection}>
                                <img
                                    src="src/assets/foto-huisarts.png"
                                    alt="Gebruiker"
                                    className={styles.userAvatar}
                                />
                                <button className={styles.uploadBtn}>Upload foto</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tiles sectie */}
                <section className={styles.tileSection}>
                    <div className={styles.outerContentContainer}>
                        <div className={styles.innerContentContainer}>
                            <div className={styles.tilesWrapper}>
                                <Tile
                                    variant="secondary"
                                    icon="src/assets/foto-huisarts.png"
                                    title="Check uw klacht"
                                    text="Bekijk persoonlijke adviezen van uw huisarts en volg de voortgang van uw klachten."
                                    btnText="Klik hier!"
                                    onClick={() => console.log('Ga naar klachtencheck')}
                                />
                                <Tile
                                    variant="secondary"
                                    icon="src/assets/foto-huisarts.png"
                                    title="Mijn dossier"
                                    text="Toegang tot uw medische dossiers en veilige opslag van persoonlijke gegevens."
                                    btnText="Klik hier!"
                                    onClick={() => console.log('Ga naar dossier')}
                                />
                                <Tile
                                    variant="secondary"
                                    icon="src/assets/foto-huisarts.png"
                                    title="Zelfzorgwijzer"
                                    text="Bekijk informatie over uw huisarts en plan afspraken eenvoudig via het platform."
                                    btnText="Klik hier!"
                                    onClick={() => console.log('Ga naar zelfzorgwijzer')}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
