import { MdOutlineDeliveryDining } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiWallet } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { LiaExclamationCircleSolid } from "react-icons/lia";
import useAuth from "../hooks/useAuth";
import placeHolderImg from "../assets/img-place-holder.jpg";

// Sidebar links data
const sidebarLinks = [
  { to: "/payment", icon: <CiWallet />, text: "Payment" },
  { to: "/promotion", icon: <IoPricetagOutline />, text: "Promotion" },
  { to: "/delivery", icon: <MdOutlineDeliveryDining />, text: "My Deliveries" },
  { to: "/support", icon: <BsQuestionCircle />, text: "Support" },
  {
    to: "/delivery-request",
    icon: <LiaExclamationCircleSolid />,
    text: "About",
  },
];

const SideBar = ({ isOpen, toggleSidebar }) => {
  const { email, firstName, lastName } = useAuth();

  // Determine what to display for the user's name
  const displayName =
    [firstName, lastName].filter(Boolean).join(" ").trim() || email || "User";

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-70 transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={toggleSidebar}
    >
      {/* Sidebar Container */}
      <aside
        className={`bg-[#eeeeee] w-[80%] max-w-[300px] h-screen flex flex-col overflow-y-auto transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevents sidebar from closing when clicked inside
        aria-hidden={!isOpen}
        aria-label="Sidebar Navigation"
      >
        {/* Account Section */}
        <div className="flex items-center p-3 bg-white rounded-b-[10px]">
          <Link
            to="/account"
            className="flex items-center gap-3 px-4 min-h-16"
            onClick={toggleSidebar}
          >
            <img
              src={placeHolderImg}
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-base font-medium">{displayName}</span>
              <span className="text-sm text-green-500">My Account</span>
            </div>
          </Link>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col bg-white mt-2.5 rounded-[10px] py-2.5">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="flex items-center gap-2 py-3 px-4 h-8 min-h-12 transition-colors hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-sm">{link.text}</span>
            </Link>
          ))}
        </nav>

        {/* Empty Space for Flex Growth */}
        <div className="bg-white mt-2.5 rounded-[10px] flex-1"></div>
      </aside>
    </div>
  );
};

export default SideBar;

// import { MdOutlineDeliveryDining } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { CiWallet } from "react-icons/ci";
// import { IoPricetagOutline } from "react-icons/io5";
// import { BsQuestionCircle } from "react-icons/bs";
// import { LiaExclamationCircleSolid } from "react-icons/lia";
// import useAuth from "../hooks/useAuth";
// import placeHolderImg from "../assets/img-place-holder.jpg";
// import { useSelector } from "react-redux";
// import { selectUserById } from "../services/api/userApiSlice";

// // Sidebar links data
// const sidebarLinks = [
//   { to: "/payment", icon: <CiWallet />, text: "Payment" },
//   { to: "/promotion", icon: <IoPricetagOutline />, text: "Promotion" },
//   {
//     to: "/delivery",
//     icon: <MdOutlineDeliveryDining />,
//     text: "My Deliveries",
//   },
//   { to: "/support", icon: <BsQuestionCircle />, text: "Support" },
//   {
//     to: "/delivery-request",
//     icon: <LiaExclamationCircleSolid />,
//     text: "About",
//   },
// ];

// const SideBar = ({ isOpen, toggleSidebar }) => {
//   const { email, firstName, lastName, id } = useAuth();
//   const user = useSelector((state) => selectUserById(state, id));
//   console.log(user);

//   // Determine what to display for the user's name
//   const displayName =
//     [firstName, lastName]
//       .filter(Boolean) // Remove undefined/null values
//       .join(" ") // Join with a space
//       .trim() || email; // Fallback to email if both firstName and lastName are undefined

//   return (
//     <div
//       aria-hidden={!isOpen}
//       className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-70 transition-opacity h-screen ${
//         isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//       }`}
//       onClick={toggleSidebar}
//     >
//       <div
//         className="bg-[#eeeeee] w-[80%] h-screen flex flex-col overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Account Section */}
//         <div className="flex items-center p-1 bg-white rounded-b-[10px]">
//           <Link
//             to="/account"
//             className="flex items-center gap-3 px-4 min-h-16"
//             onClick={toggleSidebar}
//           >
//             <span className="w-[50px]">
//               <img src={placeHolderImg} alt="User Avatar" className="w-full" />
//             </span>
//             <div className="flex flex-col">
//               <span className="text-base font-medium">{displayName}</span>
//               <span className="text-sm text-green-500">My Account</span>
//             </div>
//           </Link>
//         </div>

//         {/* Sidebar Links */}
//         <div className="flex flex-col bg-white mt-2.5 rounded-[10px] py-2.5">
//           {sidebarLinks.map((link, index) => (
//             <Link
//               key={index}
//               to={link.to}
//               className="flex items-center gap-2 py-3 px-4 h-8 min-h-12"
//               onClick={toggleSidebar}
//             >
//               <span className="font-medium text-2xl">{link.icon}</span>
//               <span className="text-sm">{link.text}</span>
//             </Link>
//           ))}
//         </div>

//         {/* Empty Div Container */}
//         <div className="bg-white mt-2.5 rounded-[10px] flex-1"></div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
