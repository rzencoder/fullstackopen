import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddBlog from "./AddBlog";

describe("Testing AddBlog Component", () => {
  test("Correct props are used when blog is submitted", () => {
    const mockHandler = jest.fn();
    const component = render(<AddBlog createBlog={mockHandler} />);

    const form = component.container.querySelector("form");
    const author = component.container.querySelector("#author");
    const title = component.container.querySelector("#title");
    const url = component.container.querySelector("#url");

    fireEvent.change(author, {
      target: { value: "Tom" },
    });
    fireEvent.change(title, {
      target: { value: "Test" },
    });
    fireEvent.change(url, {
      target: { value: "http://localhost:3000" },
    });
    fireEvent.submit(form);

    expect(mockHandler.mock.calls[0][0].author).toBe("Tom");
    expect(mockHandler.mock.calls[0][0].title).toBe("Test");
    expect(mockHandler.mock.calls[0][0].url).toBe("http://localhost:3000");
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
