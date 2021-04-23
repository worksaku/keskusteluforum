import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, useContext, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { Button, TextArea, TextField } from '../components';
import PostsContext from '../context/PostsContext';
import { PostType } from '../models/post';
import { Types } from '../reducers/PostsReducer';

const EditPostPage: React.FC = () => {
  const { posts, dispatch } = useContext(PostsContext);
  const { id } = useParams<{ id: string }>();
  const contextPost: PostType | undefined = posts.find(
    (post) => post._id === id
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

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPost({ ...editablePost, title: e.target.value });
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setPost({ ...editablePost, body: e.target.value });

  return (
    <form onSubmit={submit} className="flex flex-col">
      <TextField
        value={editablePost.title}
        classes="mb-3"
        onChange={handleTitleChange}
      />
      <TextArea
        value={editablePost.body}
        className="border mb-3 px-2 py-3 rounded"
        rows={10}
        onChange={handleBodyChange}
      />
      <Button type="submit" text="Save" />
    </form>
  );
};

export default EditPostPage;
