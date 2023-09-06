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
            <div className="p-3 bg-zinc-200 rounded-full flex items-center dark:bg-transparent dark:border dark:border-white/25">
                <input
                    type="text"
                    className="outline-none bg-transparent flex-1 px-2 text-lg"
                    placeholder="Digite seu nome"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyUp={handleKeyPress}
                />
                {inputName !== "" && (
                    <button
                        onClick={handleSetUser}
                        className="px-2 font-bold flex items-center justify-center gap-2">
                        Enviar
                    </button>
                )}
            </div>
        </div>
    );
};
