const NHS_API_BASE = "https://sandbox.api.service.nhs.uk/nhs-website-content";
const API_KEY = "fLPEwejfoaGrdBnlpWdb3x8DNAhAdqr5";

// Haal alle symptomen op voor een bepaalde letter
export async function fetchSymptomsByLetter(letter, page = 1) {
    try {
        const response = await fetch(
            `${NHS_API_BASE}/symptoms?category=${letter}&page=${page}`,
            {
                headers: {
                    accept: "application/json",
                    apikey: API_KEY,
                },
            }
        );

        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();

        console.log(`NHS data for ${letter} (page ${page}):`, data);

        // Haal name, url én description op
        const items = (data.significantLink || []).map((item) => ({
            name: item.name,
            url: item.url,
            description: item.description || "",
        }));

        // Paginatie info
        const totalPages = parseInt(
            data.relatedLink?.find((link) => link.name === "Last Page")?.url?.split("page=")[1] || page
        );

        return { items, totalPages };
    } catch (error) {
        console.error("API error:", error);
        return { items: [], totalPages: 1 };
    }
}
