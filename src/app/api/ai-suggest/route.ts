import { NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
    const d = req.nextUrl.searchParams
    const dis = d.get("disease")
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer sk-or-v1-k", // Add your API key if required
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat-v3-0324:free",
                messages: [
                    {
                        role: "user",
                        content: `what tablets to take for ${dis}, make sure to keep single reply with minimum words`,
                    },
                ],
            }),
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({}), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })
    }

}