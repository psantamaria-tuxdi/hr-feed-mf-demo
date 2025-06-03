import { User } from "../../../core/user/user.types";

export interface Comments {
    count: number;
    items: Item[];
}

export interface Item {
    id: string;
    author: User;
    content: string;
    timestamp: Date;
    likes: number;
    replies?: Item[];
}
