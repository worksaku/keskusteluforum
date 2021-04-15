import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Post } from '../components/';
import { Button } from '../components/ui-components';
import PostsContext from '../context/PostsContext';
import UserContext from '../context/UserContext';
import { PostType } from '../models/post';

type MatchParams = {
  id?: string;
};

const PostPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const { posts, dispatchPosts } = useContext(PostsContext);
  const { user } = useContext(UserContext);
  const [currentPost, setPost] = useState<PostType | null>(null);
  const [body, setBody] = useState('');

  console.log(props);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put('/comment', {
        id: props.match.params.id,
        body,
      })
      .then((res: any) => {
        if (res?.data) {
          dispatchPosts({
            type: 'edit',
            payload: res.data,
          });
        }
        setBody('');
      });
  };

  useEffect(() => {
    const post = posts.find((post) => post._id === props.match.params.id);
    if (post) {
      setPost(post);
    } else {
      axios
        .get('/post', {
          params: {
            id: props.match.params.id,
          },
        })
        .then((res) => {
          if (res?.data) setPost(res.data);
        });
    }
  }, [posts]);

  if (!currentPost) return <p>Loading...</p>;
  return (
    <>
      <Post {...currentPost} />
      {user && (
        <div>
          <p>Write comment</p>
          <form onSubmit={submit}>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="block w-full border mb-3 py-1 px-3"
            ></textarea>
            <Button type="submit" text="Comment" />
          </form>
        </div>
      )}
    </>
  );
};

export default PostPage;
