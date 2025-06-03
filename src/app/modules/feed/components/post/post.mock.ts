export const postMock = {
    id: 'post-2',
    author: {
        id: 'user-1',
        name: 'Pablo Santos',
        email: 'fake@email.com',
        avatar: 'http://localhost:4202/images/avatars/female-01.jpg',
    },
    content: {
        text: "We'll put a happy little sky in here. We touch the canvas, the canvas takes what it wants. A little happy sunlight shining through there. Let's build some happy little clouds up here. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things. This is the fun part.\n\nIsn't it great to do something you can't fail at? Little trees and bushes grow however makes them happy. Trees get lonely too, so we'll give him a little friend. There are no mistakes. You can fix anything that happens.",
        images: [],
    },
    engagement: {
        likes: {
            count: 25,
            isLikedByCurrentUser: true,
            topLikers: [
                {
                    id: 'user-2',
                    name: 'Laverne Dodson',
                    email: 'fake@email.com',
                    avatar: 'http://localhost:4202/images/avatars/female-02.jpg',
                },
                {
                    id: 'user-3',
                    name: 'Elsie Melendez',
                    email: 'fake@email.com',
                    avatar: 'http://localhost:4202/images/avatars/female-04.jpg',
                },
                {
                    id: 'user-4',
                    name: 'Barber Johnson',
                    email: 'fake@email.com',
                    avatar: 'http://localhost:4202/images/avatars/male-09.jpg',
                },
                {
                    id: 'user-5',
                    name: 'Meyer Roach',
                    email: 'fake@email.com',
                    avatar: 'http://localhost:4202/images/avatars/male-07.jpg',
                },
            ],
        },
        comments: {
            count: 0,
            items: [],
        },
    },
    timestamp: '2025-06-02T10:31:00Z',
};
