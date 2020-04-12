import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author and hides likes and url by default", () => {
  const blog = {
    author: "Mike",
    title: "Cars",
    url: "http://localhost:3001",
    likes: 1,
  };

  const component = render(<Blog blog={blog} />);

  const title = component.container.querySelector(".blog_title");
  const author = component.container.querySelector(".blog_author");
  const url = component.container.querySelector(".blog_url");
  const likes = component.container.querySelector(".blog_likes");

  expect(title).toHaveTextContent("Cars");
  expect(author).toHaveTextContent("Mike");
  expect(url).toBeNull();
  expect(likes).toBeNull();
});
