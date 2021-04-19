import { render, screen } from '@testing-library/react';
import App from './App';

test('renders top bar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Keskustelufoorumi/i);
  expect(linkElement).toBeInTheDocument();
});
