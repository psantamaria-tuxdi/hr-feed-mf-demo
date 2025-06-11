import { Post } from '../../../shared/types/post.types';

export const postMock: Post = {
    _id: 'post-1',
    allowComments: true,
    allowLikes: true,
    author: {
        _id: 'user-1',
        name: 'Caroline Lundu',
        avatar: 'http://localhost:4202/images/avatars/female-01.jpg',
    },
    content: {
        text: 'Look at that sky! I so want to be there.. Can we arrange a trip? Is that a possibility? Please!!!',
        images: ['http://localhost:4202/images/cards/14-640x480.jpg'],
    },
    engagement: {
        likes: {
            count: 25,
            isLikedByCurrentUser: true,
            topLikers: [
                {
                    _id: 'user-2',
                    name: 'Laverne Dodson',
                    avatar: 'http://localhost:4202/images/avatars/female-02.jpg',
                },
                {
                    _id: 'user-3',
                    name: 'Elsie Melendez',
                    avatar: 'http://localhost:4202/images/avatars/female-04.jpg',
                },
                {
                    _id: 'user-4',
                    name: 'Barber Johnson',
                    avatar: 'http://localhost:4202/images/avatars/male-09.jpg',
                },
                {
                    _id: 'user-5',
                    name: 'Meyer Roach',
                    avatar: 'http://localhost:4202/images/avatars/male-07.jpg',
                },
            ],
        },
        comments: {
            count: 5,
            items: [
                {
                    _id: 'comment-1',
                    author: {
                        _id: 'user-6',
                        name: 'Rutherford Brannan',
                        avatar: 'http://localhost:4202/images/avatars/male-05.jpg',
                    },
                    content:
                        "Oh, I'm in.. Let's arrange a trip for the next weekend if you want!",
                    createdAt: '2024-01-15T10:43:00Z',
                    likes: 2,
                    isLikedByCurrentUser: false,
                    replies: [
                        {
                            _id: 'reply-1',
                            parentCommentId: 'comment-1',
                            isLikedByCurrentUser: false,
                            author: {
                                _id: 'user-1',
                                name: 'Caroline Lundu',
                                avatar: 'http://localhost:4202/images/avatars/female-01.jpg',
                            },
                            content: "Yes!! Let's talk about it on lunch!",
                            createdAt: '2024-01-15T10:45:00Z',
                            likes: 1,
                        },
                        {
                            _id: 'reply-2',
                            parentCommentId: 'comment-1',
                            isLikedByCurrentUser: false,
                            author: {
                                _id: 'user-7',
                                name: 'Barbara Cotilla',
                                avatar: 'http://localhost:4202/images/avatars/female-08.jpg',
                            },
                            content: 'Count me in !!!',
                            createdAt: '2024-01-15T10:48:00Z',
                            likes: 0,
                        },
                    ],
                },
                {
                    _id: 'comment-2',
                    isLikedByCurrentUser: false,
                    author: {
                        _id: 'user-8',
                        name: 'Alan Marti',
                        avatar: 'http://localhost:4202/images/avatars/male-11.jpg',
                    },
                    content:
                        "The color of the sky doesn't look natural at all, do you really think this is natural? I'd say Photoshop! Your trip isn't going to worth it since you won't be seeing this exact sky.",
                    createdAt: '2024-01-15T10:36:00Z',
                    likes: 0,
                    replies: [
                        {
                            _id: 'reply-3',
                            parentCommentId: 'comment-2',
                            isLikedByCurrentUser: false,
                            author: {
                                _id: 'user-1',
                                name: 'Caroline Lundu',
                                avatar: 'http://localhost:4202/images/avatars/female-01.jpg',
                            },
                            content: 'Hey, Alan! You must be fun at parties!',
                            createdAt: '2024-01-15T10:38:00Z',
                            likes: 3,
                        },
                        {
                            _id: 'reply-4',
                            parentCommentId: 'comment-2',
                            isLikedByCurrentUser: false,
                            author: {
                                _id: 'user-8',
                                name: 'Alan Marti',
                                avatar: 'http://localhost:4202/images/avatars/male-11.jpg',
                            },
                            content:
                                "Caroline, I'm telling the truth, and if you cannot stand the truth, maybe we shouldn't be friends anymore...",
                            createdAt: '2024-01-15T10:40:00Z',
                            likes: 0,
                        },
                        {
                            _id: 'reply-5',
                            parentCommentId: 'comment-2',
                            isLikedByCurrentUser: false,
                            author: {
                                _id: 'user-1',
                                name: 'Caroline Lundu',
                                avatar: 'http://localhost:4202/images/avatars/female-01.jpg',
                            },
                            content:
                                "Dude! Relax! I'm just messing with you...",
                            createdAt: '2024-01-15T10:42:00Z',
                            likes: 1,
                        },
                        {
                            _id: 'reply-6',
                            parentCommentId: 'comment-2',
                            isLikedByCurrentUser: false,
                            author: {
                                _id: 'user-8',
                                name: 'Alan Marti',
                                avatar: 'http://localhost:4202/images/avatars/male-11.jpg',
                            },
                            content:
                                "Sorry! I had a bad morning, let's talk about this in couple hours, I need to relax a bit :(",
                            createdAt: '2024-01-15T10:44:00Z',
                            likes: 2,
                        },
                    ],
                },
                {
                    _id: 'comment-3',
                    isLikedByCurrentUser: false,
                    author: {
                        _id: 'user-9',
                        name: 'Marleah Eagleston',
                        avatar: 'http://localhost:4202/images/avatars/female-05.jpg',
                    },
                    content: 'Count me in, too!',
                    createdAt: '2024-01-15T10:26:00Z',
                    likes: 0,
                    replies: [],
                },
            ],
        },
    },
    createdAt: '2024-01-15T10:31:00Z',
};
