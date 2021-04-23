import { Dispatch } from 'react';
import { PostActions } from '../reducers/PostsReducer';

export interface PostType {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface PostsContextType {
  posts: PostType[];
  dispatch: Dispatch<PostActions>;
}
