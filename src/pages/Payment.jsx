// import { LiaExclamationCircleSolid } from "react-icons/lia";
// import { IoCardOutline } from "react-icons/io5";
// import { BsQuestionCircle } from "react-icons/bs";
// import { GoPlus } from "react-icons/go";
// import { Link, useNavigate } from "react-router";
// import { IoBriefcaseOutline } from "react-icons/io5";
// import NavigationBack from "../components/NavigationBack";
// // help me implement react-hot-toast
// const Payment = () => {
//   const navigate = useNavigate();
//   const onAddFundClicked = () => navigate("/deposit");

//   return (
//     <section className="bg-[#eeeeee]">
//       <NavigationBack routeTitle={"payment"} routeName={"/"} />

//       {/* User's Account Balance */}
//       <div className="flex flex-col mt-2 p-2 bg-white rounded-b-[10px]">
//         <div className="p-3 rounded-[5px] bg-[#eeeeee]">
//           <h2 className="text-base font-medium">Movit balance</h2>
//           <span className="text-2xl font-bold">$0</span>
//         </div>
//         <div>
//           <Link className="flex items-center gap-2 py-3 px-4 h-8 min-h-12">
//             <span className="font-medium text-2xl">
//               <BsQuestionCircle />
//             </span>
//             <span className="text-sm">What is Movit balance?</span>
//           </Link>
//           <Link className="flex items-center gap-2 py-3 px-4 h-8 min-h-12">
//             <span className="font-medium text-2xl">
//               <LiaExclamationCircleSolid />
//             </span>
//             <span className="text-sm">See Bolt balance transactions</span>
//           </Link>
//         </div>
//       </div>

//       {/* Add Funds Section */}
//       <div className="flex flex-col mt-2 p-2 bg-white rounded-b-[10px]">
//         <h1 className="text-base font-medium px-2">Add Funds</h1>
//         <button
//           className="flex items-center gap-2 py-3 px-4 h-8 min-h-12"
//           onClick={onAddFundClicked}
//         >
//           <span className="font-medium text-2xl">
//             <IoCardOutline />
//           </span>
//           <span className="text-sm capitalize">
//             Add using debit/credit card
//           </span>
//         </button>
//         <Link className="flex items-center gap-2 py-3 px-4 h-8 min-h-12">
//           <span className="font-medium text-2xl">
//             <GoPlus />
//           </span>
//           <span className="text-sm capitalize">Bank transfer</span>
//         </Link>
//       </div>

//       {/* Work Profile Setup Section */}
//       <div className="flex flex-col mt-2 p-2 bg-white rounded-b-[10px]">
//         <Link className="flex items-center gap-2 py-3 px-4 h-8 min-h-12">
//           <span className="font-medium text-2xl">
//             <IoBriefcaseOutline />
//           </span>
//           <span className="text-sm capitalize">Set up work profile</span>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Payment;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LiaExclamationCircleSolid } from "react-icons/lia";
import { IoCardOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import NavigationBack from "../components/NavigationBack";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUserById } from "../services/api/userApiSlice";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { id, roles } = useAuth();

  const user = useSelector((state) => selectUserById(state, id));

  // Display payment status notification
  useEffect(() => {
    if (state?.paymentStatus === "success") {
      toast.success("Payment successful!");
    } else if (state?.paymentStatus === "failed") {
      toast.error("Payment failed. Please try again.");
    }
  }, [state]);

  const onAddFundClicked = () => navigate("/deposit");

  return (
    <section className="bg-[#eeeeee]">
      <Toaster /> {/* Add Toaster for notifications */}
      <NavigationBack routeTitle={"payment"} routeName={"/"} />
      {/* User's Account Balance */}
      <div className="flex flex-col mt-2 p-2 bg-white rounded-b-[10px]">
        <div className="p-3 rounded-[5px] bg-[#eeeeee]">
          <h2 className="text-base font-medium">Movit balance</h2>
          {/* why is it when always id did this its not workin user.balance */}
          <span className="text-2xl font-bold">${user?.balance}</span>
        </div>
        <div>
          <Link
            to="#"
            className="flex items-center gap-2 py-3 px-4 h-8 min-h-12"
          >
            <span className="font-medium text-2xl">
              <BsQuestionCircle />
            </span>
            <span className="text-sm">What is Movit balance?</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 py-3 px-4 h-8 min-h-12"
          >
            <span className="font-medium text-2xl">
              <LiaExclamationCircleSolid />
            </span>
            <span className="text-sm">See Bolt balance transactions</span>
          </Link>
        </div>
      </div>
      {/* Add Funds Section */}
      <div className="flex flex-col mt-2 p-2 bg-white rounded-b-[10px]">
        <h1 className="text-base font-medium px-2">Add Funds</h1>
        <button
          className="flex items-center gap-2 py-3 px-4 h-8 min-h-12"
          onClick={onAddFundClicked}
        >
          <span className="font-medium text-2xl">
            <IoCardOutline />
          </span>
          <span className="text-sm capitalize">
            Add using debit/credit card
          </span>
        </button>
        <Link to="#" className="flex items-center gap-2 py-3 px-4 h-8 min-h-12">
          <span className="font-medium text-2xl">
            <GoPlus />
          </span>
          <span className="text-sm capitalize">Bank transfer</span>
        </Link>
      </div>
      {/* Work Profile Setup Section */}
      {!roles.includes("Employee") ? (
        <div className="flex flex-col mt-2 p-2 bg-white rounded-b-[10px]">
          <Link
            to="#"
            className="flex items-center gap-2 py-3 px-4 h-8 min-h-12"
          >
            <span className="font-medium text-2xl">
              <IoBriefcaseOutline />
            </span>
            <span className="text-sm capitalize">Set up work profile</span>
          </Link>
        </div>
      ) : (
        <h1>Hi</h1>
      )}
    </section>
  );
};

export default Payment;
