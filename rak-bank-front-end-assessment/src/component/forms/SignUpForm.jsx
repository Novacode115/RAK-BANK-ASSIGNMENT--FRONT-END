import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setFullName,
  setEmail,
  setPassword,
  setErrors,
} from "../../reducer/formSlice";
import { toast } from "react-toastify";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fullName, email, password, errors } = useSelector(
    (state) => state.form
  );
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validate = () => {
    const errors = {};
    if (!fullName) errors.fullName = "Name is required";
    if (fullName.length > 50)
      errors.fullName = "Name cannot exceed 50 characters";
    if (!email) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    if (password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (!/^[A-Za-z0-9]+$/.test(password))
      errors.password = "Password must contain only alphabets and numbers";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted", { fullName, email, password });
      try {
        const response = await axios.post("/register", {
          fullName,
          email,
          password,
        });
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 5000,
        });
        navigate("/");
      } catch (error) {
        navigate("/404");
      }
    } else {
      dispatch(setErrors(errors));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div>
          <input
            type="text"
            className="text-bgray-800 dark:text-white dark:bg-darkblack-500 dark:border-darkblack-400  text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
            onChange={(e) => dispatch(setFullName(e.target.value))}
            placeholder="Full Name"
          />
          {errors.fullName && (
            <p className="text-error-300 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="text-bgray-800 dark:text-white dark:bg-darkblack-500 dark:border-darkblack-400  text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
          onChange={(e) => dispatch(setEmail(e.target.value))}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-error-300 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div className="mb-6 relative">
        <input
          type={showPassword ? "text" : "password"}
          className="text-bgray-800 dark:text-white dark:bg-darkblack-500 dark:border-darkblack-400 text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
          onChange={(e) => dispatch(setPassword(e.target.value))}
          placeholder="Password"
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
          <p className="text-error-300 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      <div className="flex justify-between mb-7">
        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            className="w-5 h-5 focus:ring-transparent rounded-md border border-bgray-300 focus:accent-success-300 text-success-300 dark:bg-transparent dark:border-darkblack-400"
            name="termsAndConditions"
            id="termsAndConditions"
          />
          <label
            htmlFor="termsAndConditions"
            className="text-bgray-600 dark:text-bgray-50 text-base"
          >
            I agree with
            <span className="text-bgray-900 text-error-300 font-bold">
              {" "}
              Terms{" "}
            </span>
            and
            <span className="text-bgray-900 text-error-300 font-bold">
              {" "}
              Privacy{" "}
            </span>
            .
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="py-3.5 flex items-center justify-center text-white font-bold bg-error-300 hover:bg-success-400 transition-all rounded-lg w-full"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
