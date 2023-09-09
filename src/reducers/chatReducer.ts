import { v4 as uuidv4 } from "uuid";

type AddAction = {
    type: "add";
    payload: {
        user: string;
        text: string;
    };
};

type RemoveAction = {
    type: "remove";
    payload: {
        id: string;
    };
};

type EditAction = {
    type: "edit";
    payload: {
        id: string;
        newText: string;
    };
};

type ClearAllAction = {
    type: "clear";
};

type LikeAction = {
    type: "like";
    payload: { id: string };
};

type Actions =
    | AddAction
    | RemoveAction
    | EditAction
    | ClearAllAction
    | LikeAction;

export const chatReducer = (chat: Message[], action: Actions) => {
    switch (action.type) {
        case "add":
            return [
                ...chat,
                {
                    id: uuidv4(),
                    user: action.payload.user,
                    text: action.payload.text,
                    active: false,
                },
            ];
        case "remove":
            return chat.filter((msg) => msg.id !== action.payload.id);
        case "edit":
            return chat.filter((msg) => {
                if (msg.id === action.payload.id) {
                    msg.text = action.payload.newText;
                }
                return msg;
            });
        case "like":
            return chat.map((msg) => {
                if (msg.id === action.payload.id) {
                    msg.active = !msg.active;
                }
                return msg;
            });
        case "clear":
            return [];
        default:
            return chat;
    }
};
