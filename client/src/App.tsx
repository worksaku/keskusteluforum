import { useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { LoginPage, HomePage, CreatePostPage } from './pages';

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
          <div>
            <Link to="/">Keskustelufoorumi</Link>
            {!!user ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link to="/login" style={{ marginLeft: 'auto' }}>
                Login
              </Link>
            )}
          </div>
          <div className="md:container mx-auto">
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/create" component={CreatePostPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
        </BrowserRouter>
      </PostsContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
