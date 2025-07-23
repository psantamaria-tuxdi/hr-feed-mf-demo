import { Author } from './author.types';

export interface Likes {
    count: number;
    isLikedByCurrentUser: boolean;
    topLikers: Author[];
}

export interface ToggleLikeResponse {
    success: boolean;
    action: 'liked' | 'unliked';
}

export interface LikeResponseDto {
    _id: string;
    createdAt: string;
    author: Author;
}