import img from "../../assets/images/illustration/404.svg";
import { Link } from "react-router-dom";

function Error() {
  return (
    <section>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl mx-auto">
          <img src={img} alt="404 Error - Page Not Found" />
          <h1 className="text-4xl font-bold mt-8 text-gray-800 dark:text-gray-200">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg mt-4 text-gray-600 dark:text-gray-400">
            It looks like the page you're looking for doesn't exist or has been
            moved.
          </p>
          <div className="flex justify-center mt-10">
            <Link
              to="/"
              className="bg-error-300 text-sm font-bold text-white rounded-lg px-10 py-3 hover:bg-error-400 transition ease-in-out duration-200"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Error;
