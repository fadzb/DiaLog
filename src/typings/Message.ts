import { User } from './User';

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
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
