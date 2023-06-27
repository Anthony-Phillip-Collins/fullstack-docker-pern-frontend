export interface Blog {
  id: string;
  author: string;
  url: string;
  title: string;
  likes: number;
}

export type NewBlog = Omit<Blog, 'id'>;
