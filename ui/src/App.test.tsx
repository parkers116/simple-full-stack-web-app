import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import App from "./App";
import API_DATA from "./api/sample_todo_list.json";
import { getTodoList } from "./api/todolist";

// resolve typescript error
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

//

// mock axios api
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockImplementation((url) =>
  Promise.resolve({ data: { data: API_DATA, status: 200 } })
);
mockedAxios.post.mockImplementation((url) =>
  Promise.resolve({ data: null, status: 200 })
);
mockedAxios.put.mockImplementation((url) =>
  Promise.resolve({ data: null, status: 200 })
);
mockedAxios.delete.mockImplementation((url) =>
  Promise.resolve({ data: null, status: 200 })
);

// jest/jsdom doesn't fully support new dialog tag functions yet
// workaround until dialog elements are supported in jest/jsdom
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

test("mock api", async () => {
  const data = await getTodoList();
  expect(axios.get).toHaveBeenCalled();
  expect(data).toEqual(API_DATA);
});

test("renders header", async () => {
  render(<App />);
  const headerElement = screen.getByText(/todo list/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders create button", async () => {
  render(<App />);
  const buttonElement = screen.getByLabelText(/create button/i);
  expect(buttonElement).toBeInTheDocument();
});

test("open modal (form submit) after click create button", async () => {
  render(<App />);
  const buttonElement = screen.getByLabelText(/create button/i);
  fireEvent.click(buttonElement);
  const formElement = await screen.findByText(/name/i);
  expect(formElement).toBeInTheDocument();
  const formElement2 = await screen.findByText(/description/i);
  expect(formElement2).toBeInTheDocument();
  const formButtonElement = await screen.findByText(/reset/i);
  expect(formButtonElement).toBeInTheDocument();
  const formButtonElement2 = await screen.findByText(/description/i);
  expect(formButtonElement2).toBeInTheDocument();
});

test("test form validation", async () => {
  render(<App />);
  const buttonElement = screen.getByLabelText(/create button/i);
  fireEvent.click(buttonElement);
  const input = await screen.findByPlaceholderText("name of the todo item");
  const textArea = await screen.findByPlaceholderText("description here...");

  userEvent.clear(input);
  const submitButton = screen.getByLabelText(/submit/i);
  fireEvent.click(submitButton);
  expect(await screen.findByText(/'name' is required/i)).toBeInTheDocument();
});

test("submit form", async () => {
  render(<App />);
  const buttonElement = screen.getByLabelText(/create button/i);
  fireEvent.click(buttonElement);
  expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
  const input = await screen.findByPlaceholderText("name of the todo item");
  const textArea = await screen.findByPlaceholderText("description here...");

  userEvent.clear(input);
  userEvent.type(input, "1234");
  const submitButton = screen.getByLabelText(/submit/i);
  fireEvent.click(submitButton);
  expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
});

test("renders todo list", async () => {
  render(<App />);
  const listElement = await screen.findByText(/I need to have breakfast/i);
  expect(listElement).toBeInTheDocument();
  const listElement2 = await screen.findByText(/I need to have lunch/i);
  expect(listElement2).toBeInTheDocument();
  const listElement3 = await screen.findByText(/I need to have dinner./i);
  expect(listElement3).toBeInTheDocument();
});
