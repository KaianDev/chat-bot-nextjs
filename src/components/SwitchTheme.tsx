import { useTheme } from "@/contexts/ThemeContext";
import { BtnTheme } from "./BtnTheme";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";

export const SwitchTheme = () => {
    const themeCtx = useTheme();
    return (
        <div className="fixed top-0 left-0 right-0 p-2 text-right">
            {themeCtx?.theme === "light" && (
                <BtnTheme label="Dark Mode">
                    <BsFillMoonStarsFill />
                </BtnTheme>
            )}

            {themeCtx?.theme === "dark" && (
                <BtnTheme label="Light Mode">
                    <BsSun />
                </BtnTheme>
            )}
        </div>
    );
};
