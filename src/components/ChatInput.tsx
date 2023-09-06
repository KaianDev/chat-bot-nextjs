import { BsSend } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { useState, KeyboardEvent } from "react";
import { useChat } from "@/contexts/ChatContext";

type Props = {
    name: string;
};

export const ChatInput = ({ name }: Props) => {
    const [message, setMessage] = useState("");
    const chatCtx = useChat();

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            chatCtx?.addMessage(name, message.trim());
            setMessage("");
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") handleSendMessage();
    };

    return (
        <div className="p-3 flex items-center gap-3 justify-between bg-zinc-100 rounded-full text-white dark:border dark:border-white/25 dark:bg-transparent">
            <input
                type="text"
                className="text-black bg-transparent text-lg flex-1 outline-none dark:text-white"
                placeholder={`${name}, digite sua mensagem...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleKeyPress}
            />
            <button
                onClick={handleSendMessage}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-lg">
                <BsSend />
            </button>
        </div>
    );
};
