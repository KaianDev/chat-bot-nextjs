import { chatReducer } from "@/reducers/chatReducer";
import { ReactNode, createContext, useContext, useReducer } from "react";

type ChatContext = {
    chat: Message[];
    addMessage: (user: string, text: string) => void;
    removeMessage: (id: string) => void;
    editMessage: (id: string, newText: string) => void;
    likeMessage: (id: string) => void;
    clearAllMessage: () => void;
};

export const ChatContext = createContext<ChatContext | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chat, dispatch] = useReducer(chatReducer, []);

    const addMessage = (user: string, text: string) => {
        dispatch({ type: "add", payload: { user, text } });
    };

    const removeMessage = (id: string) => {
        dispatch({ type: "remove", payload: { id } });
    };

    const editMessage = (id: string, newText: string) => {
        dispatch({ type: "edit", payload: { id, newText } });
    };

    const likeMessage = (id: string) => {
        dispatch({ type: "like", payload: { id } });
    };

    const clearAllMessage = () => {
        dispatch({ type: "clear" });
    };

    return (
        <ChatContext.Provider
            value={{
                chat,
                addMessage,
                removeMessage,
                editMessage,
                clearAllMessage,
                likeMessage,
            }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
