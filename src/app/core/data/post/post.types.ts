export type FeedParams = {
    lastSeen?: string;
    pageSize?: number;
};

export interface CreatePostDto {
    text: string;
    allowComments?: boolean;
    allowLikes?: boolean;
    images?: File[];
}
