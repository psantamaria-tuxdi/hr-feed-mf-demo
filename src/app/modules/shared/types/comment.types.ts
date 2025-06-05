import { Author } from "./author.types";

export interface Comments {
    count: number;
    items: Item[];
}

export interface Item {
    _id: string;
    author: Author;
    content: string;
    isLikedByCurrentUser: boolean;
    replies: Reply[];
    createdAt: string;
    likes: number;
}

export interface Reply extends Omit<Item, 'replies'> {
    parentCommentId: string;
}
