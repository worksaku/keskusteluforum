import { useContext } from 'react';
import { useHistory } from 'react-router';
import PostsContext from '../context/PostsContext';
import UserContext from '../context/UserContext';
import { PostsContextType, PostType } from '../models/post';
import { UserContextType } from '../models/user';
import { Button } from '../components';
import { Post } from '../components';

const PostList: React.FC = () => {
  const { posts } = useContext<PostsContextType>(PostsContext);
  const { user } = useContext<UserContextType>(UserContext);
  const history = useHistory();

  return (
    <div data-testid="postList-component">
      {user && (
        <Button
          onClick={() => history.push('/create')}
          classes="mb-5"
          text="Create post"
        />
      )}
      {posts?.length ? (
        posts.map((post: PostType) => <Post key={post._id} {...post} />)
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default PostList;
