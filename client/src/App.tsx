import { useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import {
  LoginPage,
  HomePage,
  CreatePostPage,
  PostPage,
  RegisterPage,
} from './pages';

import UserContext from './context/UserContext';
import { UserType } from './models/user';
import PostsContext from './context/PostsContext';
import axios from 'axios';
import { PostsReducer } from './reducers/PostsReducer';

const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [posts, dispatchPosts] = useReducer(PostsReducer, []);

  const logout = () => {
    axios.post('/user/logout').finally(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    axios.get('/posts').then((res) => {
      if (res?.data) {
        dispatchPosts({
          type: 'set',
          payload: res.data,
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <PostsContext.Provider value={{ posts, dispatchPosts }}>
        <BrowserRouter>
          <div className="p-5 bg-blue-500 flex content-center justify-between">
            <Link className="text-white" to="/">
              Keskustelufoorumi
            </Link>
            {!!user ? (
              <div className="flex content-center">
                <span className="text-white mr-3">{user.username}</span>
                <button
                  onClick={logout}
                  className="bg-blue-400 px-2 py-1 uppercase text-sm rounded text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex">
                <Link
                  to="/register"
                  className="bg-blue-400 px-2 py-1 uppercase text-sm rounded text-white mr-2"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-400 px-2 py-1 uppercase text-sm rounded text-white"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
          <div className="mx-auto max-w-4xl p-5">
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/create" component={CreatePostPage} />
              <Route path="/post/:id" component={PostPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
        </BrowserRouter>
      </PostsContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
