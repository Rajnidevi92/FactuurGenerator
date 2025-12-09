import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ComplaintQuestions.module.css";

export default function ComplaintQuestions() {
    const location = useLocation();
    const navigate = useNavigate();
    const symptom = location.state?.symptom;

    const [gpQuestions, setGpQuestions] = useState([]);
    const [urgentQuestions, setUrgentQuestions] = useState([]);
    const [checked, setChecked] = useState({});
    const [loading, setLoading] = useState(true);
    const [advice, setAdvice] = useState("");

    useEffect(() => {
        if (!symptom) return;
        setLoading(true);

        async function fetchQuestions() {
            try {
                const token =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdGllbnQxQGV4YW1wbGUuY29tIiwicHJvamVjdElkIjoiNGZhYTMxYmEtODY5MS00YWU2LTlmNWUtOTE5NmMyYjMyNmY5IiwidXNlcklkIjowLCJyb2xlIjoicGF0aWVudCIsImV4cCI6MTc2MjI3MDM2NywiaXNzIjoiTm92aUR5bmFtaWNBcGkiLCJhdWQiOiJOb3ZpRnJvbnRlbmQifQ.lkswjkBBuh9Zi2PngVjnUrWtwY5_OH_B40rzZXjdXBY";

                const gpRes = await fetch(
                    "https://novi-backend-api-wgsgz.ondigitalocean.app/api/questionGP",
                    {
                        headers: {
                            accept: "*/*",
                            "novi-education-project-id": "4faa31ba-8691-4ae6-9f5e-9196c2b326f9",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const gpData = await gpRes.json();
                const gpFiltered =
                    (Array.isArray(gpData) ? gpData : gpData.items || []).filter(
                        (q) => q.symptomId === symptom.id
                    );

                const urgentRes = await fetch(
                    "https://novi-backend-api-wgsgz.ondigitalocean.app/api/questionUrgent",
                    {
                        headers: {
                            accept: "*/*",
                            "novi-education-project-id": "4faa31ba-8691-4ae6-9f5e-9196c2b326f9",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const urgentData = await urgentRes.json();
                const urgentFiltered =
                    (Array.isArray(urgentData) ? urgentData : urgentData.items || []).filter(
                        (q) => q.symptomId === symptom.id
                    );

                setGpQuestions(gpFiltered);
                setUrgentQuestions(urgentFiltered);
            } catch (err) {
                console.error("Fout bij ophalen vragen:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, [symptom]);

    const handleChange = (type, id) => {
        const key = `${type}_${id}`;
        setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const gpChecked = gpQuestions.some((q) => checked[`gp_${q.id}`]);
        const urgentChecked = urgentQuestions.some((q) => checked[`urgent_${q.id}`]);

        let resultAdvice = "";
        if (urgentChecked) {
            resultAdvice = "Advies: Bel 112 of de spoedlijn van uw huisarts.";
        } else if (gpChecked) {
            resultAdvice = "Advies: Plan afspraak bij uw huisarts.";
        }

        setAdvice(resultAdvice);
    };

    return (
        <main className={styles.mainWrapper}>
            <section className={styles.complaintSection}>
                <div className={styles.complaintContainer}>
                    <div className={styles.complaintLeft}>
                        {/* Terugknop */}
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className={styles.backButton}
                        >
                            &larr; Terug
                        </button>

                        <h2>Klacht: {symptom?.symptom_name || "Onbekend"}</h2>
                    </div>

                    <div className={styles.complaintRight}>
                        {loading ? (
                            <p>Laden...</p>
                        ) : (
                            <form className={styles.complaintForm} onSubmit={handleSubmit}>
                                {gpQuestions.map((q) => (
                                    <label key={`gp_${q.id}`} className={styles.questionLabel}>
                                        <input
                                            type="checkbox"
                                            checked={!!checked[`gp_${q.id}`]}
                                            onChange={() => handleChange("gp", q.id)}
                                            disabled={!!advice}
                                        />
                                        {q.question_text}
                                    </label>
                                ))}

                                {urgentQuestions.map((q) => (
                                    <label key={`urgent_${q.id}`} className={styles.questionLabel}>
                                        <input
                                            type="checkbox"
                                            checked={!!checked[`urgent_${q.id}`]}
                                            onChange={() => handleChange("urgent", q.id)}
                                            disabled={!!advice}
                                        />
                                        {q.question_text}
                                    </label>
                                ))}

                                <button type="submit" className={styles.continueBtn} disabled={!!advice}>
                                    Doorgaan
                                </button>

                                {advice && (
                                    <p
                                        className={styles.advice}
                                        style={{ color: "red", fontWeight: "bold", marginTop: "1rem" }}
                                    >
                                        {advice}
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
