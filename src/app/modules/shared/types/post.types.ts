import { User } from '../../../core/user/user.types';
import { Comments } from './comment.types';

export interface Post {
    id: string;
    author: User;
    content: Content;
    engagement: Engagement;
    timestamp: string;
}

export interface Content {
    text: string;
    images: Image[];
}

export interface Image {
    url: string;
    alt: string;
}

export interface Engagement {
    likes: Likes;
    comments: Comments;
}

export interface Likes {
    count: number;
    isLikedByCurrentUser: boolean;
    topLikers: User[];
}
