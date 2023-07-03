import { UserAttributes } from './user.type';

export interface BlogAttributes {
  id: number;
  ownerId?: UserAttributes['id'];
  title: string;
  author: string;
  url: string;
  likes: number;
}
export type BlogCreation = Omit<BlogAttributes, 'id'>;
export type BlogUpdate = Pick<BlogAttributes, 'likes'>;
