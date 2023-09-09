import { ScrollProvider } from "@/contexts/ScrollContext";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { Messages } from "./Messages";

import { useUser } from "@/contexts/UserContext";

export const ChatMessages = () => {
    const userCtx = useUser();

    return (
        <div className="flex flex-col gap-2 h-[90vh]">
            <ChatHeader />
            <ScrollProvider>
                <Messages />
                <ChatInput name={userCtx ? userCtx.user : ""} />
                <ChatInput name="Bot" />
            </ScrollProvider>
        </div>
    );
};
