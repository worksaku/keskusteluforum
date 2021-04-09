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
      <h2>Create post</h2>
      <form onSubmit={submit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
