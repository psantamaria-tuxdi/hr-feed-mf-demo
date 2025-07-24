import { Comment } from 'app/modules/shared/types/comment.types';
import { Post } from '../../shared/types/post.types';

export const commentsMock: Comment[] = [
  {
    _id: '685ac1c1ce37637c4fd100fe',
    content: '¡Planeemos algo increíble!',
    createdAt: '2025-06-24T15:18:25.733Z',
    replies: [
      {
        _id: '685ac1c1ce37637c4fd10100',
        content: '¡Cuenta conmigo!',
        parentCommentId: '685ac1c1ce37637c4fd100fe',
        createdAt: '2025-06-24T15:18:25.740Z',
        author: {
          _id: '685ac1c1ce37637c4fd100f3',
          displayName: 'Laverne Dodson',
          firstName: 'Laverne',
          lastName: 'Dodson',
          avatar: 'http://localhost:4202/images/avatars/male-09.jpg',
        },
        likes: 0,
        isLikedByCurrentUser: true,
      },
    ],
    author: {
      _id: '685ac1c1ce37637c4xd100f2',
      displayName: 'Caroline Smith',
      firstName: 'Caroline',
      lastName: 'Smith',
    },
    likes: 0,
    isLikedByCurrentUser: true,
  },
];

export const postsMock: Post[] = [
  {
    _id: 'post-1',
    allowComments: true,
    allowLikes: true,
    author: {
      _id: 'user-1',
      displayName: 'Caroline Lundu',
      firstName: 'Caroline',
      lastName: 'Lundu',
      avatar: 'http://localhost:4202/images/avatars/female-01.jpg',
    },
    content: {
      text: '¡Mira ese cielo! Quiero estar ahí tanto... ¿Podemos organizar un viaje? ¿Es eso posible? ¡¡¡Por favor!!!',
      images: ['http://localhost:4202/images/cards/14-640x480.jpg'],
    },
    engagement: {
      likes: {
        count: 25,
        isLikedByCurrentUser: true,
        topLikers: [
          {
            _id: 'user-2',
            displayName: 'Laverne Dodson',
            firstName: 'Laverne',
            lastName: 'Dodson',
            avatar: 'http://localhost:4202/images/avatars/female-02.jpg',
          },
          {
            _id: 'user-3',
            displayName: 'Elsie Melendez',
            firstName: 'Elsie',
            lastName: 'Melendez',
            avatar: 'http://localhost:4202/images/avatars/female-04.jpg',
          },
          {
            _id: 'user-4',
            displayName: 'Barber Johnson',
            firstName: 'Barber',
            lastName: 'Johnson',
          },
          {
            _id: 'user-5',
            displayName: 'Meyer Roach',
            firstName: 'Meyer',
            lastName: 'Roach',
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
              displayName: 'Rutherford Brannan',
              firstName: 'Rutherford',
              lastName: 'Brannan',
              avatar: 'http://localhost:4202/images/avatars/male-05.jpg',
            },
            content:
              'Oh, estoy dentro... ¡Organicemos un viaje para el próximo fin de semana si quieres!',
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
                  displayName: 'Caroline Lundu',
                  firstName: 'Caroline',
                  lastName: 'Lundu',
                  avatar: 'http://localhost:4202/images/avatars/female-01.jpg',
                },
                content: '¡¡Sí!! ¡Hablemos de eso en el almuerzo!',
                createdAt: '2024-01-15T10:45:00Z',
                likes: 1,
              },
              {
                _id: 'reply-2',
                parentCommentId: 'comment-1',
                isLikedByCurrentUser: false,
                author: {
                  _id: 'user-7',
                  displayName: 'Barbara Cotilla',
                  firstName: 'Barbara',
                  lastName: 'Cotilla',
                  avatar: 'http://localhost:4202/images/avatars/female-08.jpg',
                },
                content: '¡Cuenta conmigo también!',
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
              displayName: 'Alan Marti',
              firstName: 'Alan',
              lastName: 'Marti',
              avatar: 'http://localhost:4202/images/avatars/male-11.jpg',
            },
            content:
              'El color del cielo no se ve natural para nada, ¿realmente crees que esto es natural? ¡Yo diría que es Photoshop! Tu viaje no va a valer la pena ya que no vas a ver exactamente este cielo.',
            createdAt: '2024-01-15T10:36:00Z',
            likes: 0,
            replies: [
              {
                _id: 'reply-3',
                parentCommentId: 'comment-2',
                isLikedByCurrentUser: false,
                author: {
                  _id: 'user-1',
                  displayName: 'Caroline Lundu',
                  firstName: 'Caroline',
                  lastName: 'Lundu',
                  avatar: 'http://localhost:4202/images/avatars/female-01.jpg',
                },
                content: '¡Oye, Alan! ¡Debes ser divertido en las fiestas!',
                createdAt: '2024-01-15T10:38:00Z',
                likes: 3,
              },
              {
                _id: 'reply-4',
                parentCommentId: 'comment-2',
                isLikedByCurrentUser: false,
                author: {
                  _id: 'user-8',
                  displayName: 'Alan Marti',
                  firstName: 'Alan',
                  lastName: 'Marti',
                  avatar: 'http://localhost:4202/images/avatars/male-11.jpg',
                },
                content:
                  'Caroline, estoy diciendo la verdad, y si no puedes soportar la verdad, tal vez ya no deberíamos ser amigos...',
                createdAt: '2024-01-15T10:40:00Z',
                likes: 0,
              },
              {
                _id: 'reply-5',
                parentCommentId: 'comment-2',
                isLikedByCurrentUser: false,
                author: {
                  _id: 'user-1',
                  displayName: 'Caroline Lundu',
                  firstName: 'Caroline',
                  lastName: 'Lundu',
                  avatar: 'http://localhost:4202/images/avatars/female-01.jpg',
                },
                content: '¡Amigo! ¡Relájate! Solo estoy bromeando contigo...',
                createdAt: '2024-01-15T10:42:00Z',
                likes: 1,
              },
              {
                _id: 'reply-6',
                parentCommentId: 'comment-2',
                isLikedByCurrentUser: false,
                author: {
                  _id: 'user-8',
                  displayName: 'Alan Marti',
                  firstName: 'Alan',
                  lastName: 'Marti',
                  avatar: 'http://localhost:4202/images/avatars/male-11.jpg',
                },
                content:
                  '¡Perdón! Tuve una mañana terrible, hablemos de esto en un par de horas, necesito relajarme un poco :(',
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
              displayName: 'Marleah Eagleston',
              firstName: 'Marleah',
              lastName: 'Eagleston',
              avatar: 'http://localhost:4202/images/avatars/female-05.jpg',
            },
            content: '¡Cuenta conmigo también!',
            createdAt: '2024-01-15T10:26:00Z',
            likes: 0,
            replies: [],
          },
        ],
      },
    },
    createdAt: '2024-01-15T10:31:00Z',
  },
  {
    _id: '685ac1c1ce37637c4fd100f8',
    allowComments: true,
    allowLikes: true,
    createdAt: '2025-06-24T15:18:25.719Z',
    author: {
      _id: '685ac1c1ce37637c4xd100f2',
      displayName: 'Caroline Smith',
      firstName: 'Caroline',
      lastName: 'Smith',
    },
    content: {
      text: 'Este es un texto de publicación de prueba 1',
      images: [],
    },
    engagement: {
      likes: {
        count: 2,
        isLikedByCurrentUser: false,
        topLikers: [
          {
            _id: '685ac1c1ce37637c4xd100f2',
            displayName: 'Caroline Smith',
            firstName: 'Caroline',
            lastName: 'Smith',
          },
          {
            _id: '685ac1c1ce37637c4fd100f3',
            displayName: 'Laverne Dodson',
            firstName: 'Laverne',
            lastName: 'Dodson',
            avatar: 'http://localhost:4202/images/avatars/male-09.jpg',
          },
        ],
      },
      comments: {
        count: 2,
        items: commentsMock,
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
      avatar: 'http://localhost:4202/images/avatars/male-09.jpg',
    },
    content: {
      text: 'Este es un texto de publicación de prueba 2',
      images: [],
    },
    engagement: {
      likes: {
        count: 2,
        isLikedByCurrentUser: false,
        topLikers: [
          {
            _id: '685ac1c1ce37637c4xd100f2',
            displayName: 'Caroline Smith',
            firstName: 'Caroline',
            lastName: 'Smith',
          },
          {
            _id: '685ac1c1ce37637c4fd100f3',
            displayName: 'Laverne Dodson',
            firstName: 'Laverne',
            lastName: 'Dodson',
            avatar: 'http://localhost:4202/images/avatars/male-09.jpg',
          },
        ],
      },
      comments: {
        count: 2,
        items: commentsMock,
      },
    },
  },
];
