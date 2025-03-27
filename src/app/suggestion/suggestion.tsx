'use client'
import { useToast } from "@/utils/toastcontext";
import { useState } from "react";

export default function Suggestion({ storeDetail }: any) {
    const [disease, setDisease] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const fetchSuggestion = async () => {
        if (!disease.trim()) return toast.showToast("Please enter a disease!", 'error');

        setLoading(true);
        setSuggestion(""); // Clear previous results

        try {
            const response = await fetch(`api/ai-suggest?disease=${disease}`);

            if (!response.ok) throw new Error("Failed to fetch suggestions");

            const data = await response.json();
            setSuggestion(data.choices?.[0]?.message?.content || "No suggestions available.");
        } catch (error) {
            setSuggestion("Error fetching data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Disease Suggestion</h1>

            <input
                type="text"
                placeholder="Enter a disease..."
                className="w-[200px] sm:w-[220px] text-sm px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none shadow-sm"
                value={disease}
                required
                onChange={(e) => setDisease(e.target.value)}
            />

            <button
                onClick={fetchSuggestion}
                className="w-[130px] text-sm py-2 rounded-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white font-medium shadow-md transition-all duration-200 ease-in-out ml-6"
                disabled={loading}
            >
                {loading ? "Fetching..." : "Suggest"}
            </button>

            {suggestion && (
                <div className="mt-4 p-3 bg-gray-100 rounded-md">
                    <h2 className="font-semibold">Suggestion:</h2>
                    <p className="text-gray-700">{suggestion}</p>
                </div>
            )}
        </div>
    );
}
