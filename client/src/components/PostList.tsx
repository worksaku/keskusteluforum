import { useContext } from 'react';
import { useHistory } from 'react-router';
import PostsContext from '../context/PostsContext';
import UserContext from '../context/UserContext';
import { PostsContextType, PostType } from '../models/post';
import { UserContextType } from '../models/user';

const PostList: React.FC = () => {
  const { posts } = useContext<PostsContextType>(PostsContext);
  const { user } = useContext<UserContextType>(UserContext);
  const history = useHistory();
  return (
    <div>
      {user && (
        <button onClick={() => history.push('/create')}>Create post</button>
      )}
      {posts.map((post: PostType) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
