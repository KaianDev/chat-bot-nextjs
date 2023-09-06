import { useTheme } from "@/contexts/ThemeContext";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    label: string;
};

export const BtnTheme = ({ children, label }: Props) => {
    const themeCtx = useTheme();

    return (
        <button
            onClick={themeCtx?.toggleTheme}
            className="text-xl relative bg-zinc-600 p-1 text-white rounded-md group shadow-md shadow-black/20"
        >
            {children}
            <div className="absolute text-xs top-[2px] right-[35px] w-20 bg-zinc-500 text-white p-1 transition-all ease-in duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100">
                {label}
            </div>
        </button>
    );
};
