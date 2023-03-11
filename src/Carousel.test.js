import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

/* Smoke test */

it("renders", () => {
  render(<Carousel />)
})

/* Snapshot test */

it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot()
})

/* Tests for right arrow */

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("doesn't show right arrow on last image", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow")

  // verify the right arrow is in the document
  expect(rightArrow).toBeInTheDocument()

  // move to last pic
  fireEvent.click(rightArrow)
  fireEvent.click(rightArrow)
  
  // verify it's on the last pic
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument()
  expect(rightArrow).not.toBeInTheDocument()
})

/* tests for left arrow */

it("works when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />)
  
  // Move to second image in carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // verify the alt text for the second img is present
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move back in carousel
  const leftArrow = queryByTestId("left-arrow")
  fireEvent.click(leftArrow)

  // expect first image to show, not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})

it("doesn't show the left arrow on the first pic", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />)
  const leftArrow = queryByTestId("left-arrow")

  // verify the first pic is showing
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(leftArrow).not.toBeInTheDocument()
})