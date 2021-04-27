import React from 'react';
import { render, screen } from '@testing-library/react';
import { Comment } from '../components';

test('renders Comment', () => {
  render(
    <Comment _id="test123" body="Test body" author={{ username: 'Testuser' }} />
  );
  const comment = screen.getByTestId('comment-component');
  expect(comment).toBeInTheDocument();
});
