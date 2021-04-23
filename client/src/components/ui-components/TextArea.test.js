import { render, screen } from '@testing-library/react';
import TextArea from './TextArea';

test('renders text area', () => {
  render(<TextArea />);
  const textarea = screen.getByTestId('textarea-component');
  expect(textarea).toBeInTheDocument();
});
