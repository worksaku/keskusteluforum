import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
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
    <div>
      <p>{currentPost.author.username}</p>
      <h1 className="text-3xl mb-3">{currentPost.title}</h1>
      <p>{currentPost.body}</p>
      {currentPost?.comments.map((comment) => (
        <div key={comment._id}>{comment.body}</div>
      ))}
      {user && (
        <div>
          <p>Write comment</p>
          <form className="flex" onSubmit={submit}>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="border mr-3"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-400 px-2 py-1 uppercase text-sm rounded text-white self-center"
            >
              Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostPage;
