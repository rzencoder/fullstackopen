import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

let component;

const blog = {
  author: "Mike",
  title: "Cars",
  url: "http://localhost:3001",
  likes: 1,
  user: {
    username: "TestUser",
    name: "TestUser",
    id: "11",
  },
};
const user = {
  username: "TestUser",
  name: "TestUser",
  id: "11",
};

describe("Testing the show/hide button", () => {
  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />);
  });

  test("renders title and author and hides likes and url by default", () => {
    const title = component.container.querySelector(".blog_title");
    const author = component.container.querySelector(".blog_author");
    const url = component.container.querySelector(".blog_url");
    const likes = component.container.querySelector(".blog_likes");

    expect(title).toHaveTextContent("Cars");
    expect(author).toHaveTextContent("Mike");
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("renders likes and url when show button clicked", () => {
    const button = component.container.querySelector(".show_all_button");
    fireEvent.click(button);

    const url = component.container.querySelector(".blog_url");
    const likes = component.container.querySelector(".blog_likes");
    expect(url).toHaveTextContent("http://localhost:3001");
    expect(likes).toHaveTextContent("1");
  });
});

describe("testing like button", () => {
  test("like handler is fired twice when like button clicked twice", () => {
    const mockHandler = jest.fn();
    component = render(
      <Blog blog={blog} user={user} updateLikes={mockHandler} />
    );
    const showButton = component.container.querySelector(".show_all_button");
    fireEvent.click(showButton);
    const button = component.container.querySelector(".like_button");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
