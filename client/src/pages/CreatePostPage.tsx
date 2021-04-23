import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { TextField, Button, TextArea } from '../components';
import PostsContext from '../context/PostsContext';
import { PostType } from '../models/post';
import { Types } from '../reducers/PostsReducer';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { dispatch } = useContext(PostsContext);
  const history = useHistory();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
      axios
        .put('/posts', {
          title,
          body,
        })
        .then((res: AxiosResponse<PostType>) => {
          if (res?.data) {
            dispatch({
              type: Types.Add,
              payload: res.data,
            });
          }
        })
        .finally(() => {
          history.push('/');
        });
    }
  };
  return (
    <div>
      <h2 className="text-3xl mb-5">Create post</h2>
      <form onSubmit={submit} className="flex flex-col">
        <TextField
          value={title}
          onChange={handleTitleChange}
          classes="mb-3"
          placeholder="Topic"
        />
        <TextArea
          value={body}
          onChange={handleBodyChange}
          className="border mb-3 px-2 py-3 rounded"
          placeholder="Enter your text here"
        />
        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
};

export default CreatePostPage;
