'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils"
import { useToast } from "@/utils/toastcontext";

interface Pharmacy {
    name: string;
    vicinity: string;
    rating?: number;
    icon: string;
}

const MedicalStores = () => {
    const { showToast } = useToast();
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [manualLocation, setManualLocation] = useState({
        latitude: '',
        longitude: '',
    });
    const [geolocationAvailable, setGeolocationAvailable] = useState(true); // Track geolocation support


    const fetchPharmacies = async (latitude: number, longitude: number) => {
        setLoading(true);
        setError(null); // Clear any previous errors
        try {
            const resp = await fetch(`/api/pharmacies?latitude=${latitude}&longitude=${longitude}`);
            if (!resp.ok) {
                throw new Error(`Failed to fetch pharmacies: ${resp.status}`);
            }
            const data = await resp.json();
            if (data.results && data.results.length > 0) {
                setPharmacies(data.results);
            } else {
                showToast("No pharmacies found near the specified location.", 'error');
                setPharmacies([]); // Clear any previous data
            }

        } catch (err: any) {
            showToast(err.message || "An error occurred while fetching pharmacies.", 'error');
            setPharmacies([]); // Clear any previous data
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getPharmacies = async () => {
            if (navigator.geolocation) {
                try {
                    const position: GeolocationPosition = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const { latitude, longitude } = position.coords;
                    await fetchPharmacies(latitude, longitude);
                } catch (err: any) {
                    console.log("Error fetching geolocation:", err);
                    showToast("Failed to get your location. Please enter latitude and longitude manually.", 'error');
                    setGeolocationAvailable(false); // Set flag to false
                }
            } else {
                showToast("Geolocation is not supported by your browser. Please enter latitude and longitude manually.", 'error');
                setGeolocationAvailable(false);
            }
        };

        if (geolocationAvailable) { // Only run if geolocation is available
            getPharmacies();
        }
    }, [geolocationAvailable]);

    const handleManualLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setManualLocation({ ...manualLocation, [name]: value });
    };

    const handleSearch = async () => {
        const { latitude, longitude } = manualLocation;
        if (latitude && longitude) {
            const latNum = Number(latitude);
            const lonNum = Number(longitude);

            if (isNaN(latNum) || isNaN(lonNum)) {
                showToast("Invalid latitude or longitude. Please enter numeric values.", 'error');
                return;
            }
            await fetchPharmacies(latNum, lonNum);
        } else {
            showToast("Please enter both latitude and longitude.", 'error');
        }
    };

    return (
        <div className="p-8">

            <h1 className="text-2xl font-bold my-4">Medical Stores Near Me</h1>
            {/* Manual Location Input */}
            {(!geolocationAvailable) && (
                <div className="mb-4 space-y-3 flex flex-col ">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            name="latitude"
                            placeholder="Latitude"
                            value={manualLocation.latitude}
                            onChange={handleManualLocationChange}
                            className="w-[200px] sm:w-[220px] text-sm px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none shadow-sm"
                        />
                        <input
                            type="text"
                            name="longitude"
                            placeholder="Longitude"
                            value={manualLocation.longitude}
                            onChange={handleManualLocationChange}
                            className="w-[200px] sm:w-[220px] text-sm px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none shadow-sm"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="w-[130px] text-sm py-2 rounded-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white font-medium shadow-md transition-all duration-200 ease-in-out"
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>

                    </div>
                </div>

            )}


            {loading && <p className="mb-4 text-gray-600">Loading pharmacies...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pharmacies.map((pharmacy, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                    >
                        <img
                            src={pharmacy.icon}
                            alt={pharmacy.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h2 className="text-lg font-bold text-gray-800">{pharmacy.name}</h2>
                            <p className="text-sm text-gray-600">{pharmacy.vicinity}</p>
                            <div className="flex items-center">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <span className={`ml-1 font-semibold ${pharmacy.rating ? "text-yellow-700" : "text-gray-500"}`}>
                                    {pharmacy.rating || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {pharmacies.length === 0 && !loading && !error && (
                <div className="text-gray-500 text-center py-8">No pharmacies found.</div>
            )}
        </div>
    );
};

export default MedicalStores;



interface Pharmacy {
    business_status: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            };
            southwest: {
                lat: number;
                lng: number;
            };
        };
    };
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours?: {
        open_now: boolean;
    };
    photos?: {
        height: number;
        html_attributions: string[];
        photo_reference: string;
        width: number;
    }[];
    place_id: string;
    plus_code?: {
        compound_code: string;
        global_code: string;
    };
    rating?: number;
    reference: string;
    scope: string;
    types: string[];
    user_ratings_total?: number;
    vicinity: string;
}
