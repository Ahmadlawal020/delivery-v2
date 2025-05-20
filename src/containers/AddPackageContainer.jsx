import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFullScreen } from "../services/bottomSheetSlice";
import { div } from "framer-motion/client";
import NewPackage from "./NewPackage";
import { IoSearch } from "react-icons/io5";
import shippingImg from "../assets/shippingImg.png";
import { expandToMid } from "../services/bottomSheetSlice";

import useAuth from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { TruckIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const WelcomeBanner = ({ userName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewPackages = () => {
    dispatch(expandToMid());
    navigate("/delivery/pending");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back, {userName}!
          </h2>
          <p className="text-gray-600 capitalize">
            We Glad to have you with us
          </p>
        </div>

        <button
          onClick={handleViewPackages}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm"
        >
          <TruckIcon className="h-5 w-5" />
          View Available Packages
        </button>
      </div>
    </div>
  );
};

WelcomeBanner.propTypes = {
  userName: PropTypes.string.isRequired,
  packageCount: PropTypes.number.isRequired,
};

const AddPackageContainerNav = ({ isFullScreen, handleClose }) => {
  return (
    <>
      {isFullScreen && (
        <>
          <nav className=" p-2  bg-white">
            <div className=" h-11 w-full  flex items-center gap-1 capitalize">
              <button className="px-2" onClick={handleClose}>
                <X size={20} />
              </button>
              <div>
                <h1 className="text-base font-medium">Add package</h1>
              </div>
            </div>
          </nav>
        </>
      )}
      {!isFullScreen && (
        <div className=" flex items-center w-full justify-center  ">
          <div className="w-10 h-1 bg-gray-300 rounded-full mb-2 cursor-pointer " />
        </div>
      )}
    </>
  );
};

const AddPackageContainerDisplayCards = ({ handleCardClick }) => {
  const { roles } = useAuth();
  return (
    <div>
      <div className="flex flex-col text-xs w-full mb-2">
        {!roles.includes("Employee")
          ? [
              <div
                className=" bg-[#eee] flex justify-between items-center pt-3 pb-3 pl-4 pr-4 rounded-sm text-xl font-medium gap-2 "
                onClick={handleCardClick}
              >
                <span>
                  <IoSearch />
                </span>
                <span className=" w-full">Where to?</span>
              </div>,
            ]
          : []}
        <div
          className=" gap-4 mt-2 bg-[#eee] pt-3 pb-3 pl-4 pr-4 rounded-sm flex justify-between"
          onClick={handleCardClick}
        >
          <img src={shippingImg} className=" h-[50px] w-[70px]" alt="" />
          <div className=" flex flex-col w-full justify-center">
            <h2 className=" text-base font-medium">Deliver</h2>
            <p>lets start shipping</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddPackageContainer = () => {
  const { roles, firstName } = useAuth();

  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.bottomSheet.isFullScreen);
  const screenHeight = window.innerHeight;
  const collapsedHeight = screenHeight * 0.18; // 15% of the screen
  const midHeight = screenHeight * 0.32; // 25% of the screen
  const fullHeight = screenHeight; // Full screen

  const [height, setHeight] = useState(midHeight);

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100 && height === midHeight) {
      setHeight(collapsedHeight); // Collapse to 15%
    } else if (info.offset.y < -100 && height === collapsedHeight) {
      setHeight(midHeight); // Expand back to 25%
    } else if (info.offset.y < -100 && height === midHeight) {
      setHeight(fullHeight); // Expand to full screen
      dispatch(setFullScreen(true));
    } else if (info.offset.y > 100 && height === fullHeight) {
      setHeight(midHeight); // Collapse back to 25%
      dispatch(setFullScreen(false));
    }
  };

  const handleClose = () => {
    setHeight(midHeight);
    dispatch(setFullScreen(false));
  };
  const handleCardClick = () => {
    setHeight(fullHeight);
    dispatch(setFullScreen(true));
  };

  return (
    <motion.div
      drag={isFullScreen ? false : "y"}
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ height }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg px-2 flex flex-col items-center "
    >
      <div className=" flex flex-col w-full h-full ">
        <AddPackageContainerNav
          isFullScreen={isFullScreen}
          handleClose={handleClose}
        />
        {!isFullScreen && (
          <AddPackageContainerDisplayCards handleCardClick={handleCardClick} />
        )}
        {roles.includes("Employee")
          ? isFullScreen && <WelcomeBanner userName={firstName} />
          : isFullScreen && (
              <div className="flex justify-center">
                <NewPackage />
              </div>
            )}
      </div>
    </motion.div>
  );
};

export default AddPackageContainer;
