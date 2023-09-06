import React, { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-white w-full h-screen px-2 text-black dark:text-white dark:bg-black">
            <div className="container mx-auto max-w-xl">{children}</div>
        </div>
    );
};
