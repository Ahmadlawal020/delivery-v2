// import { useSelector } from "react-redux";
// import { selectUserById } from "../services/api/userApiSlice";
// import { useNavigate } from "react-router";
// import useAuth from "../hooks/useAuth";

// const UserInfo = () => {
//   const { id } = useAuth();
//   const navigate = useNavigate();

//   const userData = useSelector((state) => selectUserById(state, id));

//   console.log(userData);

//   if (!userData)
//     return <p className="text-center text-gray-500">User not found</p>;

//   const handleEdit = () => navigate(`/edit-user/${id}`);
//   const userRoleString = userData.roles?.join(", ") || "No roles";

//   return (
//     <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
//       <div>
//         <p className="text-lg font-semibold">
//           First Name: {userData.firstName}
//         </p>
//         <p className="text-lg font-semibold">Last Name: {userData.lastName}</p>
//         <p className="text-lg font-semibold">Email: {userData.email}</p>
//         <p className="text-gray-600">Phone: {userData.phoneNumber}</p>
//         <p className="text-gray-600">Address: {userData.address}</p>
//         <p className="text-gray-600">
//           Vehicle: {userData.vehicle || "No vehicle"}
//         </p>
//         <p className="text-gray-600">Status: {userData.status}</p>
//         <p className="text-gray-600">
//           Active: {userData.active ? "Yes" : "No"}
//         </p>
//         <p className="text-gray-600">Roles: {userRoleString}</p>
//       </div>
//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         onClick={handleEdit}
//       >
//         Edit
//       </button>
//     </div>
//   );
// };

// export default UserInfo;

import { useSelector } from "react-redux";
import { selectUserById } from "../services/api/userApiSlice";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const UserInfo = () => {
  const { id } = useAuth();
  const navigate = useNavigate();

  const userData = useSelector((state) => selectUserById(state, id));

  if (!userData)
    return <p className="text-center text-gray-500">User not found</p>;

  const handleEdit = () => navigate(`/edit-user/${id}`);

  return (
    <section className=" px-4 py-3">
      <article className=" rounded-lg p-6 space-y-4">
        {/* Personal Information */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          <p className="text-gray-700">
            <span className="font-medium">First Name:</span>{" "}
            {userData.firstName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Last Name:</span> {userData.lastName}
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {userData.email}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Phone:</span> {userData.phoneNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Personal Address:</span>
            {userData.address}
          </p>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end">
          <button
            className="bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 text-white font-medium text-sm hover:bg-[#3b69a5] capitalize"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </article>
    </section>
  );
};

export default UserInfo;
