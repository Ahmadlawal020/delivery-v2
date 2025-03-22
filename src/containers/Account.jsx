import { Link, useNavigate } from "react-router";
import { BsPerson } from "react-icons/bs";
import { LuShieldHalf } from "react-icons/lu";
import { LuShieldCheck } from "react-icons/lu";
import { IoHandLeftOutline } from "react-icons/io5";
import { LogOut } from "../components";
import placeHolderImg from "../assets/img-place-holder.jpg";

const Account = () => {
  const navigate = useNavigate();
  const onPersonalInfoClicked = () => navigate("/personal-info");
  return (
    <section className="bg-[#eeeeee]">
      <div className="flex flex-col bg-white mt-2.5 rounded-[10px] py-2.5">
        {/* Account */}
        <div className="w-full flex flex-col justify-center items-center ">
          <span className="w-[50px]">
            <img src={placeHolderImg} alt="placeHolderImg" className="w-full" />
          </span>

          <span className="text-xl font-medium">Account Name</span>
        </div>
        {/* Account */}
        <button
          onClick={onPersonalInfoClicked}
          className="flex items-center gap-2 py-3 px-4 h-8 min-h-12 "
        >
          <span className="font-medium text-2xl">
            <BsPerson />
          </span>
          <span className="text-sm">Personal Info</span>
        </button>
        <button className="flex items-center gap-2 py-3 px-4 h-8 min-h-12 ">
          <span className="font-medium text-2xl">
            <LuShieldHalf />
          </span>
          <span className="text-sm">Trip safety</span>
        </button>
        <button className="flex items-center gap-2 py-3 px-4 h-8 min-h-12 ">
          <span className="font-medium text-2xl">
            <LuShieldCheck />
          </span>
          <span className="text-sm">Login & Security</span>
        </button>
        <button className="flex items-center gap-2 py-3 px-4 h-8 min-h-12 ">
          <span className="font-medium text-2xl">
            <IoHandLeftOutline />
          </span>
          <span className="text-sm">Privacy</span>
        </button>
      </div>

      <div className="flex flex-col bg-white mt-2.5 rounded-[10px] py-2.5">
        <LogOut />
      </div>
      {/* ===================   */}
    </section>
  );
};

export default Account;
