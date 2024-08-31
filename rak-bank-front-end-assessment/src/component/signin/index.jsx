import React, { useState } from "react";
import rakBankLogo from "../../assets/images/logo/rak-bank-logo.png";
import SimpleResetPasswordModal from "../modal/PasswordResetModal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../reducer/authSlice";
import axios from "../../api/axiosConfig";

function LeftSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      dispatch(login(email, password))
        .then(() => navigate("/success"))
        .catch(() => navigate("/404"));
    }
  };

  const handlePasswordReset = async (newPassword) => {
    await axios.post("/password", { newPassword });
    setModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="lg:w-1/2 px-5 xl:pl-12 pt-10">
      {modalOpen && (
        <SimpleResetPasswordModal
          close={handleCloseModal}
          onSubmit={handlePasswordReset}
        />
      )}
      <header>
        <img src={rakBankLogo} className="logo-image mx-auto" alt="Logo" />
      </header>
      <div className="max-w-[450px] m-auto pt-8 pb-16">
        <header className="text-center mb-8">
          <h2 className="text-bgray-900 dark:text-white text-4xl font-semibold font-poppins mb-2">
            Sign in to your Account.
          </h2>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="text-error-300">{errors.email}</p>}
          </div>
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="text-bgray-800 dark:text-white dark:bg-darkblack-500 dark:border-darkblack-400 text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label="Toggle password visibility"
              className="absolute top-4 right-4"
            >
              {showPassword ? (
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 10c2-4 5-7 10-7s8 3 10 7-5 7-10 7-8-3-10-7Z"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="11"
                    cy="10"
                    r="3"
                    stroke="#718096"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 1L20 19"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.58445 8.58704C9.20917 8.96205 8.99823 9.47079 8.99805 10.0013C8.99786 10.5319 9.20844 11.0408 9.58345 11.416C9.95847 11.7913 10.4672 12.0023 10.9977 12.0024C11.5283 12.0026 12.0372 11.7921 12.4125 11.417"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.363 3.36506C9.22042 3.11978 10.1082 2.9969 11 3.00006C15 3.00006 18.333 5.33306 21 10.0001C20.222 11.3611 19.388 12.5241 18.497 13.4881M16.357 15.3491C14.726 16.4491 12.942 17.0001 11 17.0001C7 17.0001 3.667 14.6671 1 10.0001C2.369 7.60506 3.913 5.82506 5.632 4.65906"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            {errors.password && (
              <p className="text-error-300">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-end mb-6">
            <a
              onClick={() => setModalOpen(true)}
              className="modal-open text-error-300 font-semibold text-base underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="py-3.5 flex items-center justify-center text-white font-bold bg-error-300 hover:bg-error-400 transition-all rounded-lg w-full"
          >
            Sign In
          </button>
        </form>
        {error && <p>{error}</p>}
        <p className="text-center text-bgray-900 dark:text-bgray-50 text-base font-medium pt-7">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold underline text-error-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LeftSide;
