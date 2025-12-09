import React from "react";
import styles from "./Privacy.module.css";

export default function Privacy() {
    return (
            <div className={styles.pageWrapper}>
                <main className={styles.contentWrapper}>
                    <h1>Privacyverklaring QuickHuisartsCheck</h1>

                    <h2>Wat is QuickHuisartsCheck?</h2>
                    <p>
                        QuickHuisartsCheck is een online gezondheidsplatform waarmee u op een veilige manier klachten
                        kunt registreren, vragen kunt doorlopen en communiceren met uw zorgverlener. Alleen
                        zorgverleners die QuickHuisartsCheck aanbieden kunnen u toegang geven tot het platform. Uw
                        gegevens worden beveiligd en u kunt alleen inloggen met een account dat door uw zorgverlener
                        is geverifieerd.
                    </p>

                    <h2>Notificatie-instellingen</h2>
                    <p>
                        U kunt notificaties ontvangen wanneer er nieuwe informatie beschikbaar is in QuickHuisartsCheck.
                        Sommige notificaties zijn standaard en altijd actief, andere kunt u zelf aan- of uitzetten.
                    </p>
                    <ul>
                        <li>Altijd een e-mail bij antwoorden van uw zorgverlener of nieuwe onderzoeksresultaten</li>
                        <li>Alleen bij aangevinkte notificaties ontvangt u berichten over gedeelde documenten of gemaakte afspraken</li>
                    </ul>

                    <h2>Verantwoordelijkheden bij verwerking van persoonsgegevens</h2>
                    <p>
                        Elke zorgaanbieder die QuickHuisartsCheck aanbiedt is zelfstandig verwerkingsverantwoordelijke
                        voor de gegevens die zij beschikbaar stellen. Voor vragen over uw persoonsgegevens of
                        privacyrechten kunt u contact opnemen met uw zorgverlener.
                    </p>
                    <p>
                        QuickHuisartsCheck verwerkt gegevens alleen voor de dienstverlening en houdt zich aan het
                        medisch beroepsgeheim en de AVG.
                    </p>

                    <h2>Verwerker ten behoeve van de verwerkingsverantwoordelijke</h2>
                    <p>
                        QuickHuisartsCheck wordt technisch ondersteund door een ICT-partner die het platform bouwt en onderhoudt.
                        Deze ICT-partner kan alleen toegang tot gegevens krijgen wanneer dit strikt noodzakelijk is
                        voor ondersteuning van de zorgverlener of het platform.
                    </p>

                    <h2>Welke persoonsgegevens worden verwerkt?</h2>
                    <p>Afhankelijk van de functionaliteiten en uw zorgverlener kunnen de volgende gegevens verwerkt worden:</p>
                    <ul>
                        <li>Persoonlijke gegevens: naam, adres, geboortedatum, telefoonnummer, mailadres, geslacht, BSN</li>
                        <li>Uw zorgverleners</li>
                        <li>Berichten en communicatie met uw zorgverlener</li>
                        <li>Uw medische dossier: onderwerpen, bijzonderheden, medicatiestatus, documenten, meetwaarden, voorschriften, lab-uitslagen</li>
                        <li>Uw medicatiedossier bij uw apotheek: bijzonderheden, actuele medicatiestatus, afleveringen, afspraakgegevens</li>
                    </ul>
                    <p>Uw gegevens worden verwerkt volgens de wettelijke bewaartermijnen en het medisch beroepsgeheim.</p>

                    <h2>Beveiliging en vertrouwelijkheid</h2>
                    <p>
                        Alle communicatie en gegevens binnen QuickHuisartsCheck vallen onder het medisch beroepsgeheim
                        van uw zorgverlener. De ICT-partner heeft alleen toegang wanneer strikt noodzakelijk en is contractueel
                        gebonden aan geheimhouding.
                    </p>

                    <h2>Vragen of contact</h2>
                    <p>
                        Voor vragen over de verwerking van persoonsgegevens binnen QuickHuisartsCheck kunt u contact
                        opnemen met de functionaris voor de gegevensbescherming via
                        <a href="mailto:privacy@quickhuisartscheck.nl"> privacy@quickhuisartscheck.nl</a>.
                    </p>
                </main>
            </div>

    );
}
