import { User } from './User';

export interface Message {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
}

// _id: 1,
//           text: 'Hello developer',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//             avatar: 'https://placeimg.com/140/140/any',
//           },
