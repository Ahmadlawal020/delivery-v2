import React, { useState } from "react";
import { Map } from "../components";
import { FiMenu } from "react-icons/fi";
import { SideBar } from "../components";
import AddPackageContainer from "./AddPackageContainer";
import { useSelector } from "react-redux";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isFullScreen = useSelector((state) => state.bottomSheet.isFullScreen);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section>
      {!isFullScreen && (
        <div className="absolute top-5 left-5 z-40 bg-white rounded-full p-1 cursor-pointer">
          <FiMenu
            className="text-2xl"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          />
        </div>
      )}

      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Map />
      <div className=" absolute bottom-0 w-full">
        <AddPackageContainer />
      </div>
    </section>
  );
};

export default Home;
