export interface PostType {
  _id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  author: Author;
}

interface Author {
  _id: string;
  username: string;
}

export interface Comment {
  _id: string;
  body: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostsContextType {
  posts: Array<PostType>;
  dispatchPosts: any;
}
