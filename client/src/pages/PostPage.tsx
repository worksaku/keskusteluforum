import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import PostsContext from '../context/PostsContext';
import { PostType } from '../models/post';

type MatchParams = {
  id?: string;
};

const PostPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const { posts } = useContext(PostsContext);
  const [currentPost, setPost] = useState<PostType | null>(null);

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
  }, []);

  if (!currentPost) return <p>Loading...</p>;
  return (
    <div>
      <p>{currentPost.author.username}</p>
      <h2>{currentPost.title}</h2>
      <p>{currentPost.body}</p>
    </div>
  );
};

export default PostPage;
