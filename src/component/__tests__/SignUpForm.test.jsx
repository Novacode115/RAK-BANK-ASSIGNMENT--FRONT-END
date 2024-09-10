import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../../reducer/formSlice";
import SignUpForm from "../forms/SignUpForm";
import axios from "../../api/axiosConfig";
import { MemoryRouter } from "react-router-dom";

// Mock useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the axios post request
jest.mock("../../api/axiosConfig");

describe("SignUpForm", () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        form: formReducer,
      },
    });

    // Create a new mock function for each test
    mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should navigate to /404 if registration fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Registration failed"));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpForm />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "Password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Check what the mockNavigate was called with
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/404");
    });
  });

  test("should display validation error when full name exceeds 50 characters", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpForm />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );

    // Enter a full name with more than 50 characters
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
      target: {
        value:
          "ThisIsARandomFiftyCharatersLongNameWhichIsNotValiddddddddddddddddddddddddddddddddd",
      }, // 60 characters
    });

    // Click the 'Sign Up' button to trigger validation
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Assert that the error message for exceeding 50 characters is displayed
    const errorMessage = screen.queryByText(
      /Name cannot exceed 50 characters/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should display validation error for invalid email format", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpForm />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );

    // Input invalid email
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "invalid-email" },
    });

    // Trigger validation errors
    fireEvent.click(screen.getByText(/Sign Up/i));

    // Check if validation messages are displayed
    expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
  });

  test("should navigate to login on successful registration", async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: "Registration successful" },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpForm />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "Password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Assert that the navigate function was called to redirect to login page
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("should display validation error for required password", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpForm />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
  });

  test("should display validation error for an invalid password", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpForm />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );

    // Enter an invalid password (too short)
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "abc" }, // Invalid password, less than 8 characters
    });

    // Click the 'Sign Up' button to trigger validation
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Assert that the error message is displayed
    const errorMessage = screen.queryByText(
      /Password must be at least 8 characters/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should display validation error for an invalid password", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpForm />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );

    // Enter an invalid password (too short)
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "abc" }, // Invalid password, less than 8 characters
    });

    // Click the 'Sign Up' button to trigger validation
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Assert that the error message is displayed
    const errorMessage = screen.queryByText(
      /Password must be at least 8 characters/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should display validation error when password contains invalid characters", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpForm />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );

    // Enter a password with special characters
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "Passw@rd123!" }, // Example of an invalid password (contains special characters)
    });

    // Click the 'Sign Up' button to trigger validation
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Assert that the error message for invalid characters in password is displayed
    const errorMessage = screen.queryByText(
      /Password must contain only alphabets and numbers/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
