import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


test("renders without error", () => {
  render(<Episode episode={{}} />);
});

test("renders the summary test passed as prop", () =>{
  render(<Episode episode={{summary: 'summary test'}} />);
  let summary = screen.queryByText(/summary test/i);
  expect(summary).toBeInTheDocument();
  expect(summary).toBeTruthy();
  expect(summary).toHaveTextContent('summary test');
});

test("renders default image when image is not defined", () =>{
  render(<Episode episode={{summary: 'summary test', image: null}} />);
  const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
  expect(image).toBeInTheDocument();
});