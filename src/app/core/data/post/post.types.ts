export type FeedParams = {
    lastSeen?: string;
    pageSize?: number;
};

export interface CreatePostDto {
    text: string;
    allowComments?: boolean;
    images?: File[];
}
