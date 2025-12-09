import React, { useState, useEffect } from "react";
import styles from "./AllComplaints.module.css";

export default function AllComplaints() {
    const [allSymptoms, setAllSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeLetter, setActiveLetter] = useState("A");
    const [letterMap, setLetterMap] = useState({});
    const [selectedSymptom, setSelectedSymptom] = useState(null);

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // 🔹 Ophalen van symptomen
    useEffect(() => {
        async function fetchAllSymptoms() {
            try {
                const response = await fetch(
                    "https://novi-backend-api-wgsgz.ondigitalocean.app/api/symptoms",
                    {
                        headers: {
                            'accept': '*/*',
                            'novi-education-project-id': '4faa31ba-8691-4ae6-9f5e-9196c2b326f9',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdGllbnQxQGV4YW1wbGUuY29tIiwicHJvamVjdElkIjoiNGZhYTMxYmEtODY5MS00YWU2LTlmNWUtOTE5NmMyYjMyNmY5IiwidXNlcklkIjowLCJyb2xlIjoicGF0aWVudCIsImV4cCI6MTc2MTgzOTU1NiwiaXNzIjoiTm92aUR5bmFtaWNBcGkiLCJhdWQiOiJOb3ZpRnJvbnRlbmQifQ.gKSSrlCxvYO39VFgMkF_TySLubL_BIsZp7Q9PV8sWZo'
                        },
                    }
                );

                const data = await response.json();

                const items = Array.isArray(data) ? data : data.items || [];

                const validItems = items.filter(
                    (item) => item && item.symptom_name
                );

                const sortedItems = validItems.sort((a, b) => {
                    const nameA = a.symptom_name?.toLowerCase() || "";
                    const nameB = b.symptom_name?.toLowerCase() || "";
                    return nameA.localeCompare(nameB);
                });

                setAllSymptoms(sortedItems);

                const map = {};
                sortedItems.forEach((item) => {
                    const firstLetter =
                        item.symptom_name.trim()[0].toUpperCase();
                    if (!map[firstLetter]) map[firstLetter] = [];
                    map[firstLetter].push(item);
                });
                setLetterMap(map);
            } catch (err) {
                console.error("Fout bij ophalen symptomen:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchAllSymptoms();
    }, []);

    const filteredItems = letterMap[activeLetter] || [];

    return (
        <main className={styles.main}>
            <div className={styles.contentWrapper}>
                {/* 🔠 Alfabet */}
                <aside className={styles.alphabetNav}>
                    <ul>
                        {letters.map((letter) => (
                            <li key={letter}>
                                <button
                                    onClick={() => {
                                        if (!letterMap[letter]) return;
                                        setActiveLetter(letter);
                                        setSelectedSymptom(null);
                                    }}
                                    className={`${styles.letterButton} ${
                                        activeLetter === letter
                                            ? styles.activeLetter
                                            : ""
                                    } ${
                                        !letterMap[letter]
                                            ? styles.disabledLetter
                                            : ""
                                    }`}
                                    disabled={!letterMap[letter]}
                                >
                                    {letter}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* 🔍 Symptomenlijst of detail */}
                <section className={styles.topics}>
                    {!selectedSymptom ? (
                        <div className={styles.topicGroup}>
                            <h2>{activeLetter}</h2>

                            {loading ? (
                                <p>Laden...</p>
                            ) : filteredItems.length === 0 ? (
                                <p>Geen resultaten gevonden.</p>
                            ) : (
                                <ul>
                                    {filteredItems.map((item) => (
                                        <li
                                            key={item.id}
                                            className={styles.symptomItem}
                                            onClick={() =>
                                                setSelectedSymptom(item)
                                            }
                                        >
                                            <strong>
                                                {item.symptom_name}
                                            </strong>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        // 🔹 Detailweergave
                        <div className={styles.detailView}>
                            <button
                                onClick={() => setSelectedSymptom(null)}
                                className={styles.backButton}
                            >
                                ← Terug naar lijst
                            </button>

                            <h2>{selectedSymptom.symptom_name}</h2>

                            <p>
                                <strong>Beschrijving:</strong>{" "}
                                {selectedSymptom.description ||
                                    "Geen beschrijving beschikbaar."}
                            </p>

                            {selectedSymptom.self_care_advice && (
                                <div className={styles.selfAdviceBox}>
                                    <h3>Zelfzorgadvies</h3>
                                    <p>
                                        {selectedSymptom.self_care_advice}
                                    </p>
                                </div>
                            )}

                            {selectedSymptom.url && (
                                <a
                                    href={selectedSymptom.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.moreInfo}
                                >
                                    Meer info
                                </a>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
