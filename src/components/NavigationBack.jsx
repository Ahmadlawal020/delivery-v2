import { useNavigate } from "react-router-dom"; // Ensure correct import
import { FaArrowLeft } from "react-icons/fa6";
import PropTypes from "prop-types"; // Add prop validation

const NavigationBack = ({ routeTitle = "Back" }) => {
  const navigate = useNavigate();

  return (
    <nav className="p-2 bg-white border-b border-gray-300 mb-3 w-full">
      <div className="h-11 w-full flex items-center gap-2 capitalize">
        <button
          className="px-2"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <h1 className="text-base font-medium">{routeTitle}</h1>
      </div>
    </nav>
  );
};

// Prop validation
NavigationBack.propTypes = {
  routeName: PropTypes.string.isRequired,
  routeTitle: PropTypes.string,
};

export default NavigationBack;

// import { useNavigate } from "react-router";
// import { FaArrowLeft } from "react-icons/fa6";

// const NavigationBack = ({ routeName, routeTitle }) => {
//   const navigate = useNavigate();
//   const onBtnClick = () => navigate(routeName);

//   return (
//     <nav className=" p-2  bg-white border-b mb-[24px]  ">
//       <div className=" h-11 w-full  flex items-center gap-1 capitalize">
//         <button className="px-2" onClick={onBtnClick}>
//           <FaArrowLeft className="text-xl" />
//         </button>
//         <div>
//           <h1 className="text-base font-medium">{routeTitle}</h1>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavigationBack;
