import { Button, Card, CardContent, Typography } from '@material-ui/core';
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
        <Button onClick={() => history.push('/create')}>Create post</Button>
      )}
      {posts.map((post: PostType) => (
        <Card key={post._id}>
          <CardContent>
            <Typography gutterBottom>{post.title}</Typography>
            <Typography>{post.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
