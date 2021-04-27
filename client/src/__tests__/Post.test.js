import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Post } from '../components';

test('renders post', () => {
  render(
    <Post
      _id="test123"
      body="Test body"
      author={{ username: 'Testuser', _id: 'test321' }}
      comments={[]}
    />,
    { wrapper: MemoryRouter }
  );
  const post = screen.getByTestId('post-component');
  expect(post).toBeInTheDocument();
});
