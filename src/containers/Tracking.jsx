import React from "react";
import { NavigationBack } from "../components";
import { section } from "framer-motion/client";
import { NavLink } from "react-router-dom"; // Fixed import (added -dom)
import { Routes, Route } from "react-router-dom";
import PendingPackage from "./PendingPackage";
import AcceptedPackage from "./AcceptedPackage";

const TrackingListNav = () => {
  return (
    <nav className="px-2 border-b-[1px] border-[#dadae8]">
      <ul className="flex text-center">
        <li>
          <NavLink
            to="/tracking/pending"
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
            to="/tracking/in-transit"
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

const Tracking = () => {
  return (
    <section>
      <NavigationBack routeName="/" routeTitle="Track your Delivery Orders" />
      <section>
        <div className="px-2">
          <TrackingListNav />
          <div>
            <Routes>
              <Route index element={<PendingPackage />} />
              <Route path="pending" element={<PendingPackage />} />
              <Route path="in-transit" element={<AcceptedPackage />} />
            </Routes>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Tracking;
