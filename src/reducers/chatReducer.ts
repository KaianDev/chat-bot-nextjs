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

type Actions = AddAction | RemoveAction | EditAction;

export const chatReducer = (chat: Message[], action: Actions) => {
    switch (action.type) {
        case "add":
            return [
                ...chat,
                {
                    id: uuidv4(),
                    user: action.payload.user,
                    text: action.payload.text,
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
        default:
            return chat;
    }
};
