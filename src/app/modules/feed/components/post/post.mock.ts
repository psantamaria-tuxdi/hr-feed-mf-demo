import { Comment } from 'app/modules/shared/types/comment.types';
import { Post } from '../../../shared/types/post.types';

export const commentsMock: Comment[] = [
    {
        _id: '685ac1c1ce37637c4fd100fe',
        content: "Let's plan something awesome!",
        createdAt: '2025-06-24T15:18:25.733Z',
        replies: [
            {
                _id: '685ac1c1ce37637c4fd10100',
                content: 'Count me in!',
                parentCommentId: '685ac1c1ce37637c4fd100fe',
                createdAt: '2025-06-24T15:18:25.740Z',
                author: {
                    _id: '685ac1c1ce37637c4fd100f3',
                    displayName: 'Laverne Dodson',
                    firstName: 'Laverne',
                    lastName: 'Dodson',
                },
                likes: 0,
                isLikedByCurrentUser: true,
            },
        ],
        author: {
            _id: '685ac1c1ce37637c4fd100f2',
            displayName: 'Caroline Lundu',
            firstName: 'Caroline',
            lastName: 'Lundu',
        },
        likes: 0,
        isLikedByCurrentUser: true,
    },
];

export const postsMock: Post[] = [
    {
        _id: '685ac1c1ce37637c4fd100f8',
        allowComments: true,
        allowLikes: true,
        createdAt: '2025-06-24T15:18:25.719Z',
        author: {
            _id: '685ac1c1ce37637c4fd100f2',
            displayName: 'Caroline Lundu',
            firstName: 'Caroline',
            lastName: 'Lundu',
        },
        content: {
            text: 'This is a test post text 1',
            images: [],
        },
        engagement: {
            likes: {
                count: 2,
                isLikedByCurrentUser: false,
                topLikers: [
                    {
                        _id: '685ac1c1ce37637c4fd100f2',
                        displayName: 'Caroline Lundu',
                        firstName: 'Caroline',
                        lastName: 'Lundu',
                    },
                    {
                        _id: '685ac1c1ce37637c4fd100f3',
                        displayName: 'Laverne Dodson',
                        firstName: 'Laverne',
                        lastName: 'Dodson',
                    },
                ],
            },
            comments: {
                count: 2,
                items: commentsMock
            },
        },
    },
    {
        _id: '685ac1c1ce37637c4fd100f9',
        allowComments: true,
        allowLikes: true,
        createdAt: '2025-06-24T15:18:25.719Z',
        author: {
            _id: '685ac1c1ce37637c4fd100f3',
            displayName: 'Laverne Dodson',
            firstName: 'Laverne',
            lastName: 'Dodson',
        },
        content: {
            text: 'This is a test post text 2',
            images: [],
        },
        engagement: {
            likes: {
                count: 2,
                isLikedByCurrentUser: false,
                topLikers: [
                    {
                        _id: '685ac1c1ce37637c4fd100f2',
                        displayName: 'Caroline Lundu',
                        firstName: 'Caroline',
                        lastName: 'Lundu',
                    },
                    {
                        _id: '685ac1c1ce37637c4fd100f3',
                        displayName: 'Laverne Dodson',
                        firstName: 'Laverne',
                        lastName: 'Dodson',
                    },
                ],
            },
            comments: {
                count: 2,
                items: commentsMock
            },
        },
    },
];
