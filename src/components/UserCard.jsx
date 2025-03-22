import { useSelector } from "react-redux";
import { selectUserById } from "../services/api/userApiSlice";
import { useNavigate } from "react-router";

const UserCard = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (!user) return null;

  const handleEdit = () => navigate(`/edit-user/${userId}`);
  const userRoleString = user.roles?.join(", ") || "No roles";
  return (
    <div className="">
      <div>
        <p className="text-lg font-semibold">First Name: {user.firstName}</p>
        <p className="text-lg font-semibold">Last Name: {user.lastName}</p>
        <p className="text-lg font-semibold">Email: {user.email}</p>
        <p className="text-gray-600">Phone: {user.phoneNumber}</p>
        <p className="text-gray-600">Address: {user.address}</p>
        <p className="text-gray-600">Vehicle: {user.vehicle || "No vehicle"}</p>
        <p className="text-gray-600">Status: {user.status}</p>
        <p className="text-gray-600">Active: {user.active ? "Yes" : "No"}</p>
        <p className="text-gray-600">Roles: {userRoleString}</p>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={handleEdit}
      >
        Edit
      </button>
    </div>
  );
};

export default UserCard;
