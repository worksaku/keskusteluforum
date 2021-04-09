import { Button, TextField, Typography } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import PostsContext from '../context/PostsContext';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { dispatchPosts } = useContext(PostsContext);
  const history = useHistory();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
      axios
        .post('/posts', {
          title,
          body,
        })
        .then((res: AxiosResponse) => {
          if (res?.data) {
            dispatchPosts({
              type: 'add',
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
      <Typography>Create post</Typography>
      <form onSubmit={submit}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Body"
          variant="outlined"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
