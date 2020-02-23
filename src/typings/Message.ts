import { User } from './User';

export interface Message {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
}
