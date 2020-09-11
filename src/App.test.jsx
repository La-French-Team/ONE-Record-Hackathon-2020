import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/ONE Record Hackathon 2020/i);
  expect(linkElement).toBeInTheDocument();
});
