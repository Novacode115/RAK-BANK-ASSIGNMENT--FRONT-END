import ProtoTypes from "prop-types";

function RightSide({ img }) {
  return (
    <div className="lg:w-1/2 lg:block hidden bg-[#F6FAFF] dark:bg-darkblack-600 p-20 relative min-h-screen ">
      <img src={img} alt="right-side-image" />
      <div>
        <div className="text-center max-w-lg px-1.5 m-auto">
          <h3 className="text-bgray-900 dark:text-white font-semibold font-popins text-4xl mb-4">
            Speady, Easy and Fast
          </h3>
          <p className="text-bgray-600 dark:text-bgray-50 text-sm font-medium">
            Rak Bank helps you achieve your financial goals with personalized
            savings plans, exclusive cash back offers, and early paycheck
            access. Benefit from enhanced financial management tools and enjoy a
            <span className="text-success-300 font-bold"> $20</span> bonus on
            qualifying direct deposits. Visit our disclaimer for full details
            and start maximizing your financial potential today!
          </p>
        </div>
      </div>
    </div>
  );
}

RightSide.propTypes = {
  img: ProtoTypes.string,
};

export default RightSide;
