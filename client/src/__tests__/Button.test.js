import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../components';

test('renders button', () => {
  render(<Button />);
  const button = screen.getByTestId('button-component');
  expect(button).toBeInTheDocument();
});
