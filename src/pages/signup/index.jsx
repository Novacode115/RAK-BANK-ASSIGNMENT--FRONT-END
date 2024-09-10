import signupImg from "../../assets/images/illustration/signup.svg";
import rakBankLogo from "../../assets/images/logo/rak-bank-logo.png";
import RightSide from "../../component/signin/RightSide";
import SignUpForm from "../../component/forms/SignUpForm";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <section className="bg-white dark:bg-darkblack-500">
      <div className="flex flex-col lg:flex-row justify-between min-h-screen">
        {/* Left */}
        <div className="lg:w-1/2 px-5 xl:pl-12 pt-10">
          <header>
            <img src={rakBankLogo} className="w-80 h-auto mx-auto" alt="Logo" />
          </header>
          <div className="max-w-[460px] m-auto pt-4 pb-16">
            <header className="text-align-left mb-4">
              <h2 className="text-bgray-900 dark:text-white text-4xl font-semibold font-poppins mb-2">
                Create Account
              </h2>
            </header>
            {/* Form  */}
            <SignUpForm />
            {/* Form Bottom  */}
            <p className="text-center text-bgray-900 dark:text-bgray-50 text-base font-medium pt-7">
              Already have an account?
              <Link to="/" className="font-semibold text-error-300 underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
        {/*  Right  */}
        <RightSide img={signupImg} />
      </div>
    </section>
  );
}

export default SignUp;
