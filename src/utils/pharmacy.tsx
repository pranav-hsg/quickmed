'use client'
import { createContext, useContext, useEffect, useState } from "react";

const PharmacyContext = createContext<any>(undefined);

export const PharmacyProvider = ({ children }: any) => {
    const [selectedPharmacy, setSelectedPharmacy] = useState(() => {
        // Initialize from localStorage if available
        return localStorage.getItem("selectedPharmacy")
            ? JSON.parse(localStorage.getItem("selectedPharmacy")!)
            : null;
    });

    // Update localStorage whenever selectedPharmacy changes
    useEffect(() => {
        if (selectedPharmacy) {
            localStorage.setItem("selectedPharmacy", JSON.stringify(selectedPharmacy));
        }
    }, [selectedPharmacy]);
    return (
        <PharmacyContext.Provider value={{ selectedPharmacy, setSelectedPharmacy }}>
            {children}
        </PharmacyContext.Provider>
    );
};

export const usePharmacy = () => useContext(PharmacyContext);
