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
