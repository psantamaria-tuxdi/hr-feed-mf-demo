import { Author } from './author.types';
import { Comments } from './comment.types';

export interface Post {
    _id: string;
    allowComments: boolean;
    allowLikes: boolean;
    author: Author;
    content: Content;
    engagement: Engagement;
    createdAt: string;
}

export interface Content {
    text: string;
    images: string[];
}

export interface Engagement {
    likes: Likes;
    comments: Comments;
}

export interface Likes {
    count: number;
    isLikedByCurrentUser: boolean;
    topLikers: Author[];
}
