import { useChat } from "@/contexts/ChatContext";
import { KeyboardEvent } from "react";
import { BsSend, BsX } from "react-icons/bs";

type Props = {
    onCloseModal: () => void;
    actualMsg: Message;
    onChange: (msg: Message) => void;
};

export const EditModal = ({ onCloseModal, onChange, actualMsg }: Props) => {
    const chatCtx = useChat();

    const handleEditMessage = () => {
        if (actualMsg.text.trim() !== "") {
            chatCtx?.editMessage(actualMsg.id, actualMsg.text.trim());
            onCloseModal();
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") handleEditMessage();
    };

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-black/60 p-2">
            <div className="max-w-md w-full bg-slate-400 p-4 rounded-md relative overflow-hidden">
                <button
                    onClick={onCloseModal}
                    className="w-8 h-8 flex items-center justify-center text-4xl text-white absolute top-0 right-0 hover:bg-red-600"
                >
                    <BsX />
                </button>
                <div className="text-xl text-white mb-3 font-bold tracking-wide uppercase">
                    Editar
                </div>
                <div className="mb-3 p-3 flex items-center gap-3 justify-between bg-zinc-100 rounded-md text-white dark:border dark:border-white/25 dark:bg-black">
                    <input
                        type="text"
                        className="text-black bg-transparent text-lg flex-1 max-w-[80%] sm:max-w-none outline-none pl-3 dark:text-white"
                        value={actualMsg.text}
                        onChange={(e) =>
                            onChange({ ...actualMsg, text: e.target.value })
                        }
                        onKeyUp={handleKeyPress}
                    />
                    <button
                        onClick={handleEditMessage}
                        className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-lg"
                    >
                        <BsSend />
                    </button>
                </div>
            </div>
        </div>
    );
};
