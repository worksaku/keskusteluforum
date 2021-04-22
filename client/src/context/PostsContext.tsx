import { createContext } from 'react';
import { PostsContextType } from '../models/post';

const PostsContext = createContext<PostsContextType>({
  posts: [],
  dispatch: () => null,
});

export default PostsContext;
