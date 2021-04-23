import { render, screen } from '@testing-library/react';
import TextField from './TextField';

test('renders text field', () => {
  render(<TextField />);
  const textField = screen.getByTestId('textfield-component');
  expect(textField).toBeInTheDocument();
});
