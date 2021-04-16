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
        .put('/posts', {
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
      <h2 className="text-3xl mb-5">Create post</h2>
      <form onSubmit={submit} className="flex flex-col">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border mb-3 px-2 py-3 rounded"
          placeholder="Topic"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border mb-3 px-2 py-3 rounded"
          placeholder="Enter your text here"
        />
        <button
          type="submit"
          className="bg-red-400 px-2 py-3 uppercase text-sm rounded text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
