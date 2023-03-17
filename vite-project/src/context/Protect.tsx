import React,{ createContext, useState } from "react";

interface ProtectContextProps {
  pro: string;
  setPro: React.Dispatch<React.SetStateAction<string>>;
  citty: string;
  setCitty: React.Dispatch<React.SetStateAction<string>>;
  countryy: string;
  setCountryy: React.Dispatch<React.SetStateAction<string>>;
}

export const ProtectContext = createContext<ProtectContextProps>({} as ProtectContextProps);

export const ProtectContextProvider = ({children}:{children: React.ReactNode}) => {
    const [pro, setPro] = useState<string>("0");
    const [citty, setCitty] = useState<string>("");
    const [countryy,setCountryy] = useState<string>("");

    return (
        <ProtectContext.Provider value={{pro,setPro,citty, setCitty, countryy,setCountryy}}>
            {children}
        </ProtectContext.Provider>
    )
}
