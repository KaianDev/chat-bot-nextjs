import { ReactNode, createContext, useContext, useState } from "react";

type ScrollContextType = {
    toRoll: boolean;
    setToRoll: (v: boolean) => void;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
    const [toRoll, setToRoll] = useState(false);
    
    return (
        <ScrollContext.Provider value={{ toRoll, setToRoll }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = () => useContext(ScrollContext);
