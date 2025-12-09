import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ComplaintFinder.module.css";

export default function Klacht() {
    const [allSymptoms, setAllSymptoms] = useState([]);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    // 🔙 Terug naar dashboard
    const handleBack = () => {
        navigate("/dashboard");
    };

    // Haal alle symptomen op
    useEffect(() => {
        async function fetchSymptoms() {
            const res = await fetch(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/symptoms",
                {
                    headers: {
                        accept: "*/*",
                        "novi-education-project-id": "4faa31ba-8691-4ae6-9f5e-9196c2b326f9",
                    },
                }
            );
            const data = await res.json();
            const items = Array.isArray(data) ? data : data.items || [];
            setAllSymptoms(items.filter(i => i && i.symptom_name));
        }
        fetchSymptoms();
    }, []);

    // Filter voor autocomplete
    useEffect(() => {
        if (!search) return setSuggestions([]);
        const filtered = allSymptoms
            .filter(item =>
                item.symptom_name.toLowerCase().includes(search.toLowerCase())
            )
            .slice(0, 5);
        setSuggestions(filtered);
    }, [search, allSymptoms]);

    const handleSelect = (symptom) => {
        navigate("/complaintquestions", { state: { symptom } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestions[0]) {
            handleSelect(suggestions[0]);
        }
    };

    return (
        <main className={styles.klachtWrapper}>
            <section className={styles.klachtCard} aria-labelledby="klacht-title">

                {/* 🔙 Terugknop naar dashboard */}
                <button
                    type="button"
                    onClick={handleBack}
                    className={styles.backButton}
                >
                    &larr; Terug
                </button>

                <h1 id="klacht-title">Wat is uw klacht?</h1>
                <p className={styles.klachtSubtitle}>Beschrijf hieronder uw klacht.</p>

                <form className={styles.klachtForm} onSubmit={handleSubmit} noValidate>
                    <div className={styles.formField} style={{ position: "relative" }}>
                        <textarea
                            id="klacht"
                            name="klacht"
                            placeholder="Typ hier uw klacht..."
                            required
                            value={search}
                            className={styles.klachtInput}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {suggestions.length > 0 && (
                            <ul className={styles.suggestionsList}>
                                {suggestions.map((s) => (
                                    <li key={s.id} onClick={() => handleSelect(s)}>
                                        {s.symptom_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button type="submit" className={styles.btnPrimary}>
                        Verzenden
                    </button>
                </form>

            </section>
        </main>
    );
}
