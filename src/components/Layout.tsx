import React, { ReactNode } from "react";
import { SwitchTheme } from "./SwitchTheme";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-white w-full h-screen px-2 text-black dark:text-white dark:bg-black">
            <ThemeProvider>
                <SwitchTheme />
            </ThemeProvider>
            <div className="container mx-auto max-w-xl">{children}</div>
        </div>
    );
};
