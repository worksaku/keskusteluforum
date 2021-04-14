export interface PostType {
  _id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Array<any>;
  author: Author;
}

interface Author {
  _id: string;
  username: string;
}

export interface PostsContextType {
  posts: Array<PostType>;
  dispatchPosts: any;
}
