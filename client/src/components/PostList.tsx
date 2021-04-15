import axios from 'axios';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PostsContext from '../context/PostsContext';
import UserContext from '../context/UserContext';
import { PostsContextType, PostType } from '../models/post';
import { UserContextType } from '../models/user';

const PostList: React.FC = () => {
  const { posts, dispatchPosts } = useContext<PostsContextType>(PostsContext);
  const { user } = useContext<UserContextType>(UserContext);
  const history = useHistory();

  const formatDate = (date: Date) => {
    const dateString = new Date(date).toLocaleDateString('fi-FI');
    return dateString;
  };

  const deletePost = (id: string) => {
    axios
      .delete('/post', {
        data: {
          id,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          dispatchPosts({
            type: 'delete',
            payload: id,
          });
        }
      });
  };

  return (
    <div>
      {user && (
        <button
          onClick={() => history.push('/create')}
          className="bg-blue-400 px-2 py-1 uppercase text-sm rounded text-white mb-5"
        >
          Create post
        </button>
      )}
      {posts?.length ? (
        posts.map((post: PostType) => (
          <div key={post._id} className="border mb-5">
            <div className="px-5 flex justify-between">
              <p>{`Created: ${formatDate(post.createdAt)}`}</p>
              {post.createdAt !== post.updatedAt && (
                <p>{`Updated: ${formatDate(post.updatedAt)}`}</p>
              )}
            </div>
            <div className="border-t px-5 py-3 flex justify-between">
              <div>
                <p>by {post.author.username}</p>
                <h2 className="text-3xl mb-3 pr-1">{post.title}</h2>
                <p>{post.body}</p>
              </div>
              <div className="flex flex-col">
                {(user?.role === 'admin' || user?._id === post.author._id) && (
                  <>
                    <button
                      className="bg-blue-400 px-2 py-1 uppercase text-sm rounded text-white mb-1"
                      onClick={() => history.push(`/post/${post._id}?edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-blue-400 px-2 py-1 uppercase text-sm rounded text-white"
                      onClick={() => deletePost(post._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="border-t px-5 py-1 flex justify-between">
              <div>
                <Link
                  className="text-blue-700 hover:underline"
                  to={`/post/${post._id}`}
                >
                  Read comments
                </Link>
              </div>
              <p>{post.comments.length} comments</p>
            </div>
          </div>
        ))
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default PostList;
