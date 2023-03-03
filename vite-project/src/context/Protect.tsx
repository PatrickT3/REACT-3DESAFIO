import React,{ createContext, useState } from "react";

interface ProtectContextProps {
  pro: string;
  setPro: React.Dispatch<React.SetStateAction<string>>;
}

export const ProtectContext = createContext<ProtectContextProps>({} as ProtectContextProps);

export const ProtectContextProvider = ({children}:{children: React.ReactNode}) => {
    const [pro, setPro] = useState<string>("0");

    return (
        <ProtectContext.Provider value={{pro,setPro}}>
            {children}
        </ProtectContext.Provider>
    )
}
