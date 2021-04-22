import axios from 'axios';
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Comment } from '.';
import PostsContext from '../context/PostsContext';
import UserContext from '../context/UserContext';
import { PostType } from '../models/post';
import { Types } from '../reducers/PostsReducer';
import { Button } from './ui-components';

const Post = (props: PostType) => {
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(PostsContext);
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
          dispatch({
            type: Types.Delete,
            payload: id,
          });
        }
      });
  };

  return (
    <div
      data-testid="post-component"
      key={props._id}
      className="flex flex-col mb-5"
    >
      <div className="bg-red-700 px-3 py-1 flex justify-between">
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
      <div className="bg-red-400 px-3 py-1">
        <span className="text-white">
          {new Date(props.createdAt).toLocaleString() +
            ' by ' +
            props.author.username}
        </span>
      </div>
      <div className="py-2 px-5 border-l border-r text-justify">
        <pre className="font-sans whitespace-pre-line text-left">
          {props.body}
        </pre>
      </div>
      <div className="bg-red-500 py-2 px-3 text-white">
        Comments: {props.comments.length}
      </div>
      {props.comments.map((comment) => (
        <Comment key={comment._id} {...comment} />
      ))}
    </div>
  );
};

export default Post;
