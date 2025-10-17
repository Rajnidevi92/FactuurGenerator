import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./AllComplaints.module.css";
import { fetchSymptomsByLetter } from "../../api/nhsApi";

export default function AllComplaints() {
    const [symptoms, setSymptoms] = useState({});
    const [loadingLetter, setLoadingLetter] = useState(null);
    const [activeLetter, setActiveLetter] = useState("A");
    const [search, setSearch] = useState("");

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    useEffect(() => {
        handleLetterClick(activeLetter);
    }, []);

    async function handleLetterClick(letter) {
        setActiveLetter(letter);
        if (symptoms[letter]) return;

        setLoadingLetter(letter);
        const { items } = await fetchSymptomsByLetter(letter);
        setSymptoms((prev) => ({
            ...prev,
            [letter]: items.sort((a, b) => a.name.localeCompare(b.name)),
        }));
        setLoadingLetter(null);
    }

    const filteredItems =
        symptoms[activeLetter]?.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        ) || [];

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.contentWrapper}>
                    {/* Alphabet navigation */}
                    <aside className={styles.alphabetNav}>
                        <ul>
                            {letters.map((letter) => (
                                <li key={letter}>
                                    <button
                                        onClick={() => handleLetterClick(letter)}
                                        className={`${styles.letterButton} ${
                                            activeLetter === letter ? styles.activeLetter : ""
                                        }`}
                                        disabled={loadingLetter === letter}
                                    >
                                        {loadingLetter === letter ? "…" : letter}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Topics list */}
                    <section className={styles.topics}>
                        <input
                            type="text"
                            placeholder="Zoek een onderwerp..."
                            className={styles.searchInput}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className={styles.topicGroup}>
                            <h2>{activeLetter}</h2>

                            {loadingLetter === activeLetter ? (
                                <p>Laden...</p>
                            ) : filteredItems.length === 0 ? (
                                <p>Geen resultaten gevonden.</p>
                            ) : (
                                <ul>
                                    {filteredItems.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item.name}
                                            </a>
                                            {item.description && (
                                                <p className={styles.description}>
                                                    {item.description}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}
