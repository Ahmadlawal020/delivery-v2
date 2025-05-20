import React from "react";
import { NavLink } from "react-router-dom"; // Fixed import (added -dom)
import PendingPackageList from "./PendingPackageList";
import AcceptedPackageList from "./AcceptedPackageList";
import { Routes, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUserById } from "../services/api/userApiSlice";
import { UpdateUserInfoButton } from "../components";

const PackagesListNav = () => {
  return (
    <nav className="px-2 border-b-[1px] border-[#dadae8]">
      <ul className="flex text-center">
        <li>
          <NavLink
            to="/delivery/pending"
            className={({ isActive }) =>
              `flex items-center h-9 ${
                isActive ? "border-b-[2px] border-[green] text-[green]" : ""
              }`
            }
          >
            <span className="text-sm font-medium py-0 px-4 uppercase">
              pending
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/delivery/in-transit"
            className={({ isActive }) =>
              `flex items-center h-9 ${
                isActive ? "border-b-[2px] border-[green] text-[green]" : ""
              }`
            }
          >
            <span className="text-sm font-medium py-0 px-4 uppercase">
              In Transit
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const PackagesList = () => {
  const { id: userId } = useAuth();
  const user = useSelector((state) => selectUserById(state, userId));
  const isProfileComplete =
    user && user.firstName && user.lastName && user.phoneNumber;
  return (
    <section>
      <div className="px-2">
        <PackagesListNav />
        <div>
          {isProfileComplete ? (
            <Routes>
              <Route index element={<PendingPackageList />} />
              <Route path="pending" element={<PendingPackageList />} />
              <Route path="in-transit" element={<AcceptedPackageList />} />
            </Routes>
          ) : (
            <UpdateUserInfoButton />
          )}
        </div>
      </div>
    </section>
  );
};

export default PackagesList;
