import { useUser } from "@/contexts/UserContext";
import { useChat } from "@/contexts/ChatContext";
import { GoKebabHorizontal, GoHeartFill } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { EditModal } from "./EditModal";
import { useScroll } from "@/contexts/ScrollContext";

export const Messages = () => {
    const userCtx = useUser();
    const chatCtx = useChat();
    const scrollCtx = useScroll();

    const [btnClicked, setBtnClicked] = useState<Number | null>(null);
    const [modalBtn, setModalBtn] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [actualMessage, setActualMessage] = useState<Message>({
        id: "",
        user: "",
        text: "",
        active: false,
    });

    const divRef = useRef<HTMLDivElement>(null);

    const handleHideOptions = () => {
        if (modalBtn) {
            setModalBtn(false);
            setBtnClicked(null);
        }
    };

    const handleShowOptions = (key: number) => {
        setBtnClicked(key);
        setModalBtn(true);
    };

    const handleOpenEditModal = (data: Message) => {
        setEditModal(true);
        setActualMessage(data);
    };

    const handleRemoveMessage = (id: string) => {
        chatCtx?.removeMessage(id);
    };

    const handleLikeMessage = (id: string) => {
        chatCtx?.likeMessage(id);
    };

    useEffect(() => {
        if (scrollCtx?.toRoll) {
            const scrollH = divRef.current?.scrollHeight;
            console.log(scrollH);
            if (scrollH) divRef.current.scrollTo(0, scrollH);
            scrollCtx.setToRoll(false);
        }
    }, [chatCtx?.chat]);

    return (
        <>
            <div
                ref={divRef}
                className="p-3 flex-1 flex flex-col gap-[10px] overflow-y-auto"
                onClick={handleHideOptions}>
                {chatCtx?.chat.map((item, key) => (
                    <div
                        key={item.id}
                        className={`text-white py-2 pl-4 pr-8 break-words  text-sm max-w-[70%] rounded-lg relative group
                    ${
                        userCtx?.user === item.user
                            ? "bg-blue-500 text-right self-end"
                            : "bg-slate-700 text-left self-start"
                    }`}
                        onClick={handleHideOptions}>
                        <p className="text-left">{item.text}</p>
                        {item.active && (
                            <div
                                className={`absolute -bottom-2 text text-red-500 bg-zinc-500 py-[2px] px-[6px] rounded-full flex justify-center items-center ${
                                    userCtx?.user === item.user
                                        ? "left-1"
                                        : "right-1"
                                }
                            `}>
                                <GoHeartFill />
                            </div>
                        )}

                        <button
                            onClick={() => handleShowOptions(key)}
                            className="absolute text-white text-xl top-0 right-2 invisible opacity-0 transition-all ease-in duration-300 group-hover:visible group-hover:opacity-100">
                            <GoKebabHorizontal />
                        </button>

                        {modalBtn && btnClicked === key && (
                            <div
                                className={`absolute rounded-md text-left bg-zinc-600/90 overflow-hidden z-10 w-28 shadow-lg shadow-black/25
                        ${
                            userCtx?.user === item.user
                                ? "top-2 right-[90%]"
                                : "top-2 left-[90%]"
                        }`}>
                                <div
                                    onClick={() => handleOpenEditModal(item)}
                                    className="cursor-pointer p-2 transition-all ease-in duration-100 hover:bg-zinc-800">
                                    Editar
                                </div>
                                <div
                                    onClick={() => handleRemoveMessage(item.id)}
                                    className="cursor-pointer p-2 transition-all ease-in duration-100 hover:bg-zinc-800">
                                    Apagar
                                </div>
                                <div
                                    onClick={() => handleLikeMessage(item.id)}
                                    className="cursor-pointer p-2 transition-all ease-in duration-100 hover:bg-zinc-800">
                                    {item.active ? "Descurtir" : "Curtir"}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {editModal && (
                <EditModal
                    onChange={setActualMessage}
                    onCloseModal={setEditModal}
                    actualMsg={actualMessage}
                />
            )}
        </>
    );
};
