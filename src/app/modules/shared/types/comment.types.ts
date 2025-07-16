import { Author } from './author.types';

export interface Comments {
    count: number;
    items?: Comment[];
}

export interface Comment {
    _id: string;
    author: Author;
    content: string;
    isLikedByCurrentUser: boolean;
    replies: Reply[];
    createdAt: string;
    likes: number;
}

export interface Reply extends Omit<Comment, 'replies'> {
    parentCommentId: string;
}

export interface CreateCommentDto {
    content: string;
    parentCommentId?: string;
}
