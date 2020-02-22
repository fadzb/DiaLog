export interface Message {
  id: number;
  text: string;
  timestamp: Date;
  user: {
    id: number;
    name: string;
  };
}

// _id: 1,
//           text: 'Hello developer',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//             avatar: 'https://placeimg.com/140/140/any',
//           },
