import img from "../../assets/images/illustration/success-tick.png";

function Success() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mt-4 text-gray-800 dark:text-gray-200 mb-10">
          Successfully Submitted
        </h1>
        <img
          src={img}
          alt="success-image"
          className="mx-auto mb-6" // Center the image and add spacing below it
        />

        <p className="text-lg mt-4 text-gray-600 dark:text-gray-400">
          Our representative will get in touch with you shortly.
        </p>
      </div>
    </section>
  );
}

export default Success;
