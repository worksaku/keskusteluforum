import { render, screen } from '@testing-library/react';
import PostList from './PostList';

test('renders post list', () => {
  render(<PostList />);
  const postList = screen.getByTestId('postList-component');
  expect(postList).toBeInTheDocument();
});
