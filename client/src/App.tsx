import { useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Types } from './reducers/PostsReducer';

import {
  LoginPage,
  HomePage,
  CreatePostPage,
  PostPage,
  RegisterPage,
  EditPostPage,
} from './pages';
import { Button } from './components/ui-components';

import UserContext from './context/UserContext';
import { UserType } from './models/user';
import PostsContext from './context/PostsContext';
import axios from 'axios';
import { PostsReducer } from './reducers/PostsReducer';

const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [posts, dispatch] = useReducer(PostsReducer, []);

  const logout = () => {
    axios.post('/user/logout').finally(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) setUser(JSON.parse(isLoggedIn));

    axios.get('/posts').then((res) => {
      if (res?.data) {
        dispatch({
          type: Types.Set,
          payload: res.data,
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <PostsContext.Provider value={{ posts, dispatch }}>
        <BrowserRouter>
          <div className="p-5 bg-red-500 flex content-center justify-between">
            <Link className="text-white" to="/">
              Keskustelufoorumi
            </Link>
            {!!user ? (
              <div className="flex content-center">
                <span className="text-white mr-3">{user.username}</span>
                <Button onClick={logout} text="Logout" />
              </div>
            ) : (
              <div className="flex">
                <Link
                  to="/register"
                  className="bg-red-400 px-2 py-1 uppercase text-sm rounded text-white mr-2"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-red-400 px-2 py-1 uppercase text-sm rounded text-white"
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
              <Route path="/post/:id/edit" component={EditPostPage} />
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
