'use client'
import { createContext, useContext, useEffect, useState } from "react";

const PharmacyContext = createContext<any>(undefined);

export const PharmacyProvider = ({ children }: any) => {
    const [selectedPharmacy, setSelectedPharmacy] = useState();

    // Update localStorage whenever selectedPharmacy changes

    return (
        <PharmacyContext.Provider value={{ selectedPharmacy, setSelectedPharmacy }}>
            {children}
        </PharmacyContext.Provider>
    );
};

export const usePharmacy = () => useContext(PharmacyContext);
