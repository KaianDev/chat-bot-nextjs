import { useUser } from "@/contexts/UserContext";
import { InputName } from "./InputName";
import { ChatMessages } from "./ChatMessages";

export const Home = () => {
    const userCtx = useUser();

    if (!userCtx) return null;
    if (userCtx.user === "") return <InputName />;

    return <ChatMessages />;
};
