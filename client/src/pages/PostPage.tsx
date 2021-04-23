import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post, TextArea } from '../components/';
import { Button } from '../components';
import PostsContext from '../context/PostsContext';
import UserContext from '../context/UserContext';
import { PostType } from '../models/post';
import { Types } from '../reducers/PostsReducer';

const PostPage: React.FC = () => {
  const { posts, dispatch } = useContext(PostsContext);
  const { user } = useContext(UserContext);
  const [currentPost, setPost] = useState<PostType | null>(null);
  const [body, setBody] = useState('');
  const { id } = useParams<{ id: string }>();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put('/comment', {
        id,
        body,
      })
      .then((res: AxiosResponse<PostType>) => {
        if (res?.data) {
          dispatch({
            type: Types.Edit,
            payload: res.data,
          });
        }
        setBody('');
      });
  };

  useEffect(() => {
    const post = posts.find((post) => post._id === id);
    if (post) {
      setPost(post);
    } else {
      axios
        .get('/post', {
          params: {
            id,
          },
        })
        .then((res) => {
          if (res?.data) setPost(res.data);
        });
    }
  }, [posts]);

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  if (!currentPost) return <p>Loading...</p>;
  return (
    <>
      <Post {...currentPost} />
      {user && (
        <div>
          <p>Write comment</p>
          <form onSubmit={submit}>
            <TextArea
              value={body}
              onChange={handleBodyChange}
              className="block w-full border mb-3 py-1 px-3"
            />
            <Button type="submit" text="Comment" />
          </form>
        </div>
      )}
    </>
  );
};

export default PostPage;
