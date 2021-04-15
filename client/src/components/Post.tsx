import axios from 'axios';
import { useContext } from 'react';
import {
  Link,
  RouteComponentProps,
  useHistory,
  withRouter,
} from 'react-router-dom';
import { Comment } from '.';
import PostsContext from '../context/PostsContext';
import UserContext from '../context/UserContext';
import { PostType } from '../models/post';
import { Button } from './ui-components';

interface PostComponentProps extends PostType, RouteComponentProps {}

const Post = (props: PostComponentProps) => {
  const { user } = useContext(UserContext);
  const { dispatchPosts } = useContext(PostsContext);
  const history = useHistory();

  const deletePost = (id: string) => {
    axios
      .delete('/post', {
        data: {
          id,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          dispatchPosts({
            type: 'delete',
            payload: id,
          });
        }
      });
  };

  return (
    <div key={props._id} className="flex flex-col mb-5">
      <div className="bg-blue-700 px-3 py-1 flex justify-between">
        <Link to={`/post/${props._id}`} className="text-white text-xl">
          {props.title}
        </Link>
        <div>
          {(user?.role === 'admin' || props.author._id === user?._id) && (
            <Button
              classes="mr-1"
              text="Edit"
              onClick={() => history.push(`/post/${props._id}/edit`)}
            />
          )}
          {(user?.role === 'admin' || props.author._id === user?._id) && (
            <Button text="Delete" onClick={() => deletePost(props._id)} />
          )}
        </div>
      </div>
      <div className="bg-blue-400 px-3 py-1">
        <span className="text-white">
          {props.author.username} {new Date(props.createdAt).toString()}
        </span>
      </div>
      <div className="py-2 px-5 border-l border-r text-justify">
        <pre className="font-sans whitespace-pre-line text-left">
          {props.body}
        </pre>
      </div>
      <div className="bg-blue-500 py-2 px-3 text-white">
        Comments: {props.comments.length}
      </div>
      {props.comments.map((comment) => (
        <Comment key={comment._id} {...comment} />
      ))}
    </div>
  );
};

export default withRouter(Post);
