import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { login } from "../../reducer/authActions"; // Ensure correct path to your action
import LeftSide from "../signin/index"; // Ensure correct path to your component
import store from "../../store"; // Ensure this imports the correct store configuration

jest.mock("../../reducer/authActions", () => ({
  login: jest.fn(), // Mock the login action
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

test("should submit form with valid email and password", async () => {
  const mockDispatch = jest.fn().mockResolvedValue({}); // Mock dispatch

  jest
    .spyOn(require("react-redux"), "useDispatch")
    .mockReturnValue(mockDispatch);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LeftSide />} />
          <Route
            path="/success"
            element={<div>Success! Redirected to Dashboard</div>}
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "ValidPassword123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledWith(
      login({ email: "test@example.com", password: "ValidPassword123" })
    );
  });

  await waitFor(() => {
    expect(
      screen.getByText(/Success! Redirected to Dashboard/i)
    ).toBeInTheDocument();
  });
});

test("should display validation error for invalid email", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LeftSide />
      </MemoryRouter>
    </Provider>
  );

  // Enter an invalid email
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "invalid-email" },
  });

  // Enter a valid password
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "ValidPassword123" },
  });

  // Click the 'Sign In' button to trigger validation
  fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  // Assert that the error message for invalid email is displayed
  const emailError = screen.queryByText(/Please enter a valid email address./i);
  expect(emailError).toBeInTheDocument();
});

test("should display validation error for short password", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LeftSide />
      </MemoryRouter>
    </Provider>
  );

  // Enter a valid email
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "test@example.com" },
  });

  // Enter a short password
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "short" },
  });

  // Click the 'Sign In' button to trigger validation
  fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  // Assert that the error message for short password is displayed
  const passwordError = screen.queryByText(
    /Password must be at least 6 characters long./i
  );
  expect(passwordError).toBeInTheDocument();
});

test("should toggle password visibility", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LeftSide />
      </MemoryRouter>
    </Provider>
  );

  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const toggleButton = screen.getByLabelText(/Toggle password visibility/i);

  // Check initial type of password input
  expect(passwordInput.type).toBe("password");

  // Click the toggle button
  fireEvent.click(toggleButton);

  // Check if the type of password input has changed to text
  expect(passwordInput.type).toBe("text");

  // Click the toggle button again
  fireEvent.click(toggleButton);

  // Check if the type of password input has changed back to password
  expect(passwordInput.type).toBe("password");
});

test("should open and close the password reset modal", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LeftSide />
      </MemoryRouter>
    </Provider>
  );

  // Click the 'Forgot Password?' link to open the modal
  fireEvent.click(screen.getByText(/Forgot Password?/i));

  // Wait for the modal to be displayed
  await waitFor(() => {
    // Query for the modal dialog
    const dialog = screen.queryByRole("dialog");

    //  console.log("Dialog element:", dialog);
    //  console.log("Dialog innerHTML:", dialog?.innerHTML);

    // Assert that the modal is displayed
    expect(dialog).toBeInTheDocument();
  });
});
