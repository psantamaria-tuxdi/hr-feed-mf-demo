export type FeedParams = {
    lastSeen?: string;
    pageSize?: number;
};

export interface CreatePostDto {
    text: string;
    allowComments?: boolean;
    images?: File[];
}

export interface ToggleLikeResponse {
    success: boolean;
    action: 'liked' | 'unliked';
}

export interface CreateCommentDto {
    content: string;
    parentCommentId?: string;
}