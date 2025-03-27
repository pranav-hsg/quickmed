export default async function handler(req: any, res: any) {
    console.log("good")
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { latitude, longitude } = req.query;
    const apiKey = "AIzaSyCCGP7Mh70txo7NkVmrn5eXZ0uoVtzVk3Q"; // Secure API key in .env

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=drugstore&key=${apiKey}`;

    try {
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
