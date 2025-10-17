import Tile from '../../components/Tile/Tile';
import './Home.css';

export default function Home() {
    return (
        <main>
            {/* Hero Section */}
            <section className="outer-content-container">
                <div className="inner-content-container">
                    <div className="hero-inner">
                        <div className="hero-text">
                            <h1>Welkom bij QuickHuisartsCheck</h1>
                            <p>
                                Beantwoord een paar vragen over je klachten en krijg persoonlijk advies van de
                                huisarts
                            </p>
                        </div>
                        <div className="hero-image-wrapper">
                            <img src="/src/assets/Ontwerp-zonder-titel.png" alt="Hero Image" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Tiles */}
            <section className="outer-content-container hero-tiles-section">
                <div className="inner-content-container hero-tiles">
                    <Tile
                        variant="primary"
                        title="Inloggen"
                        text="Log in om uw persoonlijke gegevens en adviezen te bekijken."
                        linkTo="/login"
                        btnText="Inloggen"
                    />
                    <Tile
                        variant="primary"
                        title="Registreren"
                        text="Maak een account aan om gebruik te maken van QuickHuisartsCheck."
                        linkTo="/registration"
                        btnText="Registreren"
                    />
                    <Tile
                        variant="primary"
                        title="Zelfzorgwijzer"
                        text="Bekijk uitleg en adviezen voor veelvoorkomende klachten."
                        linkTo="/allcomplaints"
                        btnText="Zelfzorgwijzer"
                    />
                </div>
            </section>

            {/* Work Section */}
            <section id="work" className="outer-content-container">
                <div className="inner-content-container default-area-padding">
                    <article className="work-article">
                        <span className="work-article__image-wrapper">
                            <img src="/src/assets/huisarts-card.jpg" alt="Portfolio work" />
                        </span>
                        <div className="work-article__info-container">
                            <h2>Waarom QuickHuisartsCheck gebruiken?</h2>
                            <ul>
                                <li>Direct praktische zelfzorgtips waarmee je zelf aan de slag kunt</li>
                                <li>Zekerheid wanneer je wél contact moet opnemen</li>
                                <li>Betrouwbare uitleg bij veelvoorkomende klachten</li>
                                <li>Persoonlijk advies afgestemd op jouw situatie</li>
                            </ul>
                        </div>
                    </article>

                    <article id="faq-work-video" className="work-article">
                        <span className="work-article__image-wrapper">
                            <img src="/src/assets/ideo-thumbnails.jpg" alt="Portfolio work" />
                        </span>
                        <div className="work-article__info-container">
                            <h2>Bekijk hoe u kunt inloggen en QuickHuisartsCheck kunt gebruiken</h2>
                        </div>
                    </article>

                    <article className="work-article">
                        <span className="work-article__image-wrapper">
                            <img src="/src/assets/huisartsenteam.jpg" alt="Portfolio work" />
                        </span>
                        <div className="work-article__info-container">
                            <h2>Onze huisartsen, jouw steun</h2>
                            <ul>
                                <li>Altijd medisch getoetst – onze huisartsen zorgen dat het advies klopt</li>
                                <li>Medisch betrouwbaar – advies altijd gebaseerd op actuele richtlijnen</li>
                                <li>Persoonlijk advies – afgestemd op jouw situatie op basis van je ingevulde klachten</li>
                            </ul>
                        </div>
                    </article>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="outer-content-container">
                <div className="inner-content-container default-area-padding">
                    <h2>Veelgestelde vragen</h2>

                    <details className="faq-details">
                        <summary className="faq-summary">Hoe werkt QuickHuisartsCheck?</summary>
                        <p className="faq-collapsable">
                            Vul een paar vragen in over je klachten en ontvang persoonlijk advies van de
                            huisarts. <a href="#faq-work-video">Bekijk hier hoe u kunt inloggen en QuickHuisartsCheck gebruiken</a>
                        </p>
                    </details>

                    <details className="faq-details">
                        <summary className="faq-summary">Is het advies van de app betrouwbaar?</summary>
                        <p className="faq-collapsable">
                            Ja, al het advies is medisch getoetst en gebaseerd op actuele richtlijnen.
                        </p>
                    </details>

                    <details className="faq-details">
                        <summary className="faq-summary">Heb ik een account nodig om de app te gebruiken?</summary>
                        <p className="faq-collapsable">
                            Voor algemene zelfzorgtips niet, maar een account is nodig voor persoonlijk advies en eerdere ingevulde gegevens.
                        </p>
                    </details>

                    <details className="faq-details">
                        <summary className="faq-summary">Worden mijn gegevens veilig opgeslagen?</summary>
                        <p className="faq-collapsable">
                            Ja, al je gegevens worden veilig en vertrouwelijk opgeslagen volgens de privacyrichtlijnen.
                        </p>
                    </details>

                    <details className="faq-details">
                        <summary className="faq-summary">Krijgt mijn eigen huisarts een bericht?</summary>
                        <p className="faq-collapsable">
                            Helaas niet meteen. Het advies blijft binnen de app, en contact met je huisarts moet je zelf initiëren indien nodig.
                        </p>
                    </details>
                </div>
            </section>
        </main>
    );
}
