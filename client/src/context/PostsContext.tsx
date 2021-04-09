import { createContext } from 'react';
import { PostsContextType } from '../models/post';

const PostsContext = createContext<PostsContextType>({
  posts: [],
  dispatchPosts: null,
});

export default PostsContext;
