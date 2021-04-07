import { useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';

import { LoginPage, HomePage } from './pages';

import UserContext from './context/UserContext';
import { UserType } from './models/user';
import axios, { AxiosResponse } from 'axios';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#000',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
  },
  overrides: {},
});

const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

  const logout = () => {
    axios.post('/user/logout').finally(() => {
      setUser(null);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                <Link to="/">Keskustelufoorumi</Link>
              </Typography>
              {!!user ? (
                <Button onClick={logout}>Logout</Button>
              ) : (
                <Link to="/login" style={{ marginLeft: 'auto' }}>
                  Login
                </Link>
              )}
            </Toolbar>
          </AppBar>
          <Container maxWidth="md">
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </Container>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
