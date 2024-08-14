export async function fetchBetData(user: { access_token: string; }, date: string) {
    try {
        const response = await fetch("https://api.betsol.la/bets/monitor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.access_token}`
            },
            body: JSON.stringify({
                "bets_date": date
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error data:", errorData);
            throw new Error("Error al cargar los datos: " + response.status);
        }

        const jsonData = await response.json();
        console.log("Datos recibidos:", jsonData);

        if (typeof jsonData !== "object") {
            throw new Error("Los datos recibidos no son un objeto");
        }
        return jsonData;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}