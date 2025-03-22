import { Account, Home, Tracking } from "../containers";
import { Routes, Route, Outlet } from "react-router-dom";
import { PiPackageFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import {
  MdOutlineHome,
  MdOutlineDeliveryDining,
  MdDeliveryDining,
  MdAccountCircle,
  MdHome,
} from "react-icons/md";
import { PiPackageLight } from "react-icons/pi";
import { RiAccountCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import Delivery from "./Delivery";

const DashNavigation = () => {
  const { roles } = useAuth();

  const isFullScreen = useSelector((state) => state.bottomSheet.isFullScreen);

  const primaryLinks = [
    {
      label: "Home",
      to: "home",
      icon: <MdOutlineHome className="text-[20px]" />,
      icon2: <MdHome className="text-[24px]" />,
    },
    // Conditionally add Tracking link if user is not an employee
    ...(!roles.includes("Employee")
      ? [
          {
            label: "Tracking",
            to: "tracking",
            icon: <MdOutlineDeliveryDining className="text-[20px]" />,
            icon2: <MdDeliveryDining className="text-[24px]" />,
          },
        ]
      : []),
    // Conditionally add Deliveries link if user is not a customer
    ...(!roles.includes("Customer")
      ? [
          {
            label: "Deliveries",
            to: "delivery",
            icon: <PiPackageLight className="text-[20px]" />,
            icon2: <PiPackageFill className="text-[24px]" />,
          },
        ]
      : []),
    {
      label: "Account",
      to: "account",
      icon: <RiAccountCircleLine className="text-[20px]" />,
      icon2: <MdAccountCircle className="text-[24px]" />,
    },
  ];

  return (
    !isFullScreen && (
      <nav className="bg-white shadow-md h-[64px] w-full flex justify-around items-center">
        <ul className="flex w-full justify-around">
          {primaryLinks.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-blue-500" : "text-gray-500"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span aria-hidden="true">
                      {isActive ? item.icon2 : item.icon}
                    </span>
                    <span className="text-[14px] mt-1">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

const DashLayout = ({ currentUserId }) => {
  return (
    <section>
      <Outlet context={{ currentUserId }} />
      {/* Pass currentUserId to child routes */}
    </section>
  );
};

const DashPage = ({ currentUserId }) => {
  return (
    <section className="w-full  flex flex-col pb-[70px]  ">
      {/* Content Area */}
      <div className="flex-1 overflow-y-hidden">
        <DashLayout currentUserId={currentUserId} />
      </div>
      {/* DashNavigation will be hidden when isFullScreen is true */}
      <div className="fixed bottom-0 w-full">
        <DashNavigation />
      </div>
    </section>
  );
};

export const DashRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashPage />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
};

export default DashRoutes;
