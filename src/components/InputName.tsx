import { useUser } from "@/contexts/UserContext";
import { KeyboardEvent, useState } from "react";

export const InputName = () => {
    const userCtx = useUser();
    const [inputName, setInputName] = useState("");

    const handleSetUser = () => {
        if (inputName.trim() !== "" && inputName !== "Bot") {
            userCtx?.setUser(inputName);
            setInputName("");
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") handleSetUser();
    };

    return (
        <div className="mt-14">
            <div className="p-3 bg-zinc-200 rounded-full flex gap-3 w-full items-center dark:bg-transparent dark:border dark:border-white/25">
                <input
                    type="text"
                    className="pl-2 outline-none bg-transparent flex-1 max-w-[80%]  sm:max-w-none text-lg"
                    placeholder="Digite seu nome"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyUp={handleKeyPress}
                />
                {inputName !== "" && (
                    <button
                        onClick={handleSetUser}
                        className="px-1 bg-transparent font-bold flex items-center justify-center gap-2"
                    >
                        Enviar
                    </button>
                )}
            </div>
        </div>
    );
};
