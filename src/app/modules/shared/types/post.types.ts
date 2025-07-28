import { Author } from './author.types';
import { Comments } from './comment.types';
import { Likes } from './like.types';

export interface LinkPreview {
    title: string;
    description: string;
    image: string;
    url?: string;
}

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

export interface CreatePostDto {
  text: string;
  allowComments?: boolean;
  images?: File[];
}
