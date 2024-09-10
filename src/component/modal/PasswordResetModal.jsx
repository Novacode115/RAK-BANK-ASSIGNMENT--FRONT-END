import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

export const SimpleResetPasswordModal = ({ close, handlePasswordReset }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      handlePasswordReset(password);
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="dialog-title"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="relative max-w-md w-full bg-white dark:bg-darkblack-600 p-8 rounded-lg shadow-lg">
        <button
          aria-label="Close"
          type="button"
          onClick={close}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-400"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Reset Password
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-darkblack-500 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-success-300 focus:border-success-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-success-300 hover:bg-success-400 transition-all font-medium rounded-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

SimpleResetPasswordModal.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SimpleResetPasswordModal; // Ensure this default export
