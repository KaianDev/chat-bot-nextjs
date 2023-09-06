import { BsArrowLeft, BsCameraVideo, BsInfoCircle } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { BtnHeader } from "./BtnHeader";
import { useUser } from "@/contexts/UserContext";

export const ChatHeader = () => {
    const userCtx = useUser();

    return (
        <header className="p-3 flex items-center gap-5 justify-between">
            <div
                className="text-3xl cursor-pointer"
                onClick={() => userCtx?.setUser("")}>
                <BsArrowLeft />
            </div>
            <div className="flex-1 flex gap-2 items-center">
                <img
                    src="./perfilBot.png"
                    className="w-12 rounded-full"
                    alt="Perfil do Bot"
                />
                <strong className="text-lg">Bot</strong>
            </div>
            <div className="flex gap-5">
                <BtnHeader>
                    <FiPhoneCall />
                </BtnHeader>
                <BtnHeader>
                    <BsCameraVideo />
                </BtnHeader>
                <BtnHeader>
                    <BsInfoCircle />
                </BtnHeader>
            </div>
        </header>
    );
};
