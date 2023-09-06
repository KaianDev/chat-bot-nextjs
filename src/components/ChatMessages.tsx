import { useUser } from "@/contexts/UserContext";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { useChat } from "@/contexts/ChatContext";
import { GoKebabHorizontal } from "react-icons/go";

import { useState } from "react";
import { EditModal } from "./EditModal";

export const ChatMessages = () => {
    const userCtx = useUser();
    const chatCtx = useChat();

    const [btnClicked, setBtnClicked] = useState<Number | null>(null);
    const [modalBtn, setModalBtn] = useState(false);

    const [editModal, setEditModal] = useState(false);
    const [actualMessage, setActualMessage] = useState<Message>({
        id: "",
        user: "",
        text: "",
    });

    const handleOpenModal = (key: number) => {
        setBtnClicked(key);
        setModalBtn(true);
    };

    const handleCloseBtnModal = () => {
        if (modalBtn) {
            setModalBtn(false);
            setBtnClicked(null);
        }
    };

    const handleRemoveMessage = (id: string) => {
        chatCtx?.removeMessage(id);
    };

    const handleOpenEditModal = (id: string) => {
        setEditModal(true);
        const msg = chatCtx?.chat.reduce(
            (acc, msg) => {
                if (msg.id === id) {
                    return msg;
                }
                return acc;
            },
            { id: "", text: "", user: "" }
        );
        if (msg) {
            setActualMessage(msg);
            console.log(msg);
        }
    };

    const handleCloseEditModal = () => {
        setEditModal(false);
    };

    return (
        <div className="flex flex-col gap-2 h-[90vh]">
            <ChatHeader />
            <div
                className="p-3 flex-1 flex flex-col gap-2 overflow-y-auto"
                onClick={handleCloseBtnModal}>
                {chatCtx?.chat.map((item, key) => (
                    <div
                        key={item.id}
                        className={`text-white pt-3 pb-2 pl-2 pr-4 break-words min-w-[80px] text-sm max-w-[70%] rounded-lg relative group
                        ${
                            userCtx?.user === item.user
                                ? "bg-blue-500 text-right self-end"
                                : "bg-zinc-700 text-left self-start"
                        }
                    `}
                        onClick={handleCloseBtnModal}>
                        <p className="text-left">{item.text}</p>
                        <button
                            onClick={() => handleOpenModal(key)}
                            className="absolute text-white text-xl top-0 right-2 invisible opacity-0 transition-all ease-in duration-300 group-hover:visible group-hover:opacity-100">
                            <GoKebabHorizontal />
                        </button>
                        {modalBtn && btnClicked === key && (
                            <div
                                className={`absolute rounded-md p-2 text-left bg-zinc-600/90 z-10 w-20 shadow-lg shadow-black/25
                            ${
                                userCtx?.user === item.user
                                    ? "top-2 left-[-50px]"
                                    : "top-2 right-[-50px]"
                            }
                            `}>
                                <div
                                    onClick={() => handleOpenEditModal(item.id)}
                                    className="hover:underline cursor-pointer">
                                    Editar
                                </div>
                                <div
                                    onClick={() => handleRemoveMessage(item.id)}
                                    className="hover:underline cursor-pointer">
                                    Apagar
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <ChatInput name={userCtx ? userCtx.user : ""} />
            <ChatInput name="Bot" />

            {editModal && (
                <EditModal
                    onChange={setActualMessage}
                    onCloseModal={handleCloseEditModal}
                    actualMsg={actualMessage}
                />
            )}
        </div>
    );
};
