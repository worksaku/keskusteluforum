import axios, { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import { Redirect, RouteComponentProps, useHistory } from 'react-router';
import { Button } from '../components';
import PostsContext from '../context/PostsContext';
import { PostType } from '../models/post';
import { Types } from '../reducers/PostsReducer';

type MatchParams = {
  id?: string;
};

const EditPostPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const { posts, dispatch } = useContext(PostsContext);
  const contextPost: PostType | undefined = posts.find(
    (post) => post._id === props.match.params.id
  );
  const [editablePost, setPost] = useState<PostType | undefined>(contextPost);
  const history = useHistory();

  if (!editablePost) return <Redirect to={`/`} />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editablePost.title && editablePost.body) {
      axios
        .post('/post', {
          id: editablePost._id,
          title: editablePost.title,
          body: editablePost.body,
        })
        .then((res: AxiosResponse<PostType>) => {
          if (res.data) {
            dispatch({
              type: Types.Edit,
              payload: res.data,
            });
            history.push(`/post/${res.data._id}`);
          }
        });
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col">
      <input
        type="text"
        value={editablePost.title}
        className="border mb-3 px-2 py-3 rounded"
        onChange={(e) => setPost({ ...editablePost, title: e.target.value })}
      />
      <textarea
        value={editablePost.body}
        className="border mb-3 px-2 py-3 rounded"
        rows={10}
        onChange={(e) => setPost({ ...editablePost, body: e.target.value })}
      />
      <Button type="submit" text="Save" />
    </form>
  );
};

export default EditPostPage;
