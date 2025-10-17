import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./Disclaimer.module.css";

export default function Disclaimer() {
    return (
        <>
            <Header />
            <div className={styles.pageWrapper}>
                <main className={styles.contentWrapper}>
                    <h1>Algemene Voorwaarden QuickHuisartsCheck</h1>
                    <p>
                        Om gebruik te maken van de functionaliteiten van QuickHuisartsCheck dient u akkoord te
                        gaan met deze Algemene Gebruiksvoorwaarden (hierna: “Voorwaarden”).
                    </p>

                    <p>
                        QuickHuisartsCheck biedt u een platform waarmee u klachten kunt registreren, opvolgen en
                        vragen kunt doorlopen voor gezondheidsadvies. U dient uw account zelf te activeren
                        alvorens u gebruik kunt maken van QuickHuisartsCheck.
                    </p>

                    <p>
                        Uw gegevens worden veilig opgeslagen en verwerkt conform de geldende wet- en regelgeving,
                        waaronder de Algemene Verordening Gegevensbescherming (AVG).
                    </p>

                    <h2>Functionaliteiten</h2>
                    <ul>
                        <li>Inzien van uw persoonlijke adviezen en eerdere vragen</li>
                        <li>Bijhouden van klachten en voortgang</li>
                        <li>Ontvangen van zelfzorgtips en notificaties</li>
                        <li>Veilige opslag van medische informatie</li>
                        <li>Vragen doorlopen met advies of doorverwijzing naar huisarts</li>
                    </ul>

                    <h2>Artikel 1: Toepasselijkheid</h2>
                    <p>
                        1.1. Deze Voorwaarden zijn van toepassing op al uw gebruik van QuickHuisartsCheck en
                        maken onderdeel uit van de gebruiksovereenkomst tussen u en QuickHuisartsCheck.
                    </p>

                    <h2>Artikel 2: Rechten en plichten van de gebruiker</h2>
                    <p>2.1. U dient aanwijzingen van QuickHuisartsCheck op te volgen en ervoor te zorgen dat uw account correct wordt gebruikt.</p>
                    <p>2.2. De informatie in uw persoonlijke profiel kan onvolledig of onjuist zijn. Voor privacyrechten zoals inzage, rectificatie, verwijdering of bezwaar, neem contact op met QuickHuisartsCheck.</p>

                    <h2>Artikel 3: Rechten en plichten van QuickHuisartsCheck</h2>
                    <p>3.1. QuickHuisartsCheck zorgt voor de beveiliging van uw gegevens en het correct functioneren van het platform.</p>
                    <p>3.2. QuickHuisartsCheck kan de functionaliteiten en beschikbaarheid van gegevens aanpassen.</p>
                    <p>3.3. QuickHuisartsCheck verwerkt uw gegevens uitsluitend voor de doeleinden van de dienstverlening en handelt conform de AVG.</p>
                    <p>3.4. QuickHuisartsCheck kan niet garanderen dat het platform altijd beschikbaar is of foutloos functioneert.</p>

                    <h2>Artikel 4: Koppelingen en externe diensten</h2>
                    <p>4.1. QuickHuisartsCheck kan koppelingen hebben met externe diensten. Voor deze diensten gelden de voorwaarden van de betreffende aanbieder.</p>

                    <h2>Artikel 5: Overige bepalingen</h2>
                    <ul>
                        <li>5.1. QuickHuisartsCheck handelt in overeenstemming met de AVG en de geldende wetgeving.</li>
                        <li>5.2. Het platform gebruikt alleen noodzakelijke cookies; er worden geen persoonlijke gegevens voor marketingdoeleinden verzameld.</li>
                        <li>5.3. Alle intellectuele eigendomsrechten van QuickHuisartsCheck blijven bij QuickHuisartsCheck. Niets uit de Voorwaarden mag worden gekopieerd of gedeeld zonder toestemming.</li>
                        <li>5.4. Klachten kunnen worden ingediend via het contactformulier van QuickHuisartsCheck.</li>
                        <li>5.5. QuickHuisartsCheck behoudt zich het recht voor de Voorwaarden eenzijdig te wijzigen.</li>
                        <li>5.6. Op het gebruik van QuickHuisartsCheck is Nederlands recht van toepassing.</li>
                    </ul>
                </main>
            </div>
            <Footer />
        </>
    );
}
