import { NextRequest } from "next/server";
import { APIKEYS } from "../api_keys";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const photoReference = params.get("photoreference");

    if (!photoReference) {
        return new Response(JSON.stringify({ error: "Missing photoreference parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const googlePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&key=${APIKEYS.googlePlaces}&photoreference=${photoReference}`;

        const response = await fetch(googlePhotoUrl);
        const arrayBuffer = await response.arrayBuffer();

        return new Response(arrayBuffer, {
            status: 200,
            headers: {
                "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch photo" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
