import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  selectUserById,
  useUpdateUserMutation,
} from "../services/api/userApiSlice";
import { NavigationBack } from "../components";
import toast, { Toaster } from "react-hot-toast";

const EditUserForm = ({ user }) => {
  const [updateUser, { isSuccess, error }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");
  useEffect(() => {
    if (isSuccess) {
      navigate("/personal-info");
    }
  }, [isSuccess, navigate]);

  const onSaveUserClicked = async () => {
    try {
      await updateUser({
        id: user.id,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
      }).unwrap();
      toast.success("User updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className=" px-4 py-3">
      <Toaster /> {/* Add Toaster component to display toasts */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" flex flex-col w-full items-center justify-center"
      >
        {/* First Name */}
        <div className="flex flex-col text-xs w-full mb-2">
          <label
            htmlFor="firstName"
            className="text-xs font-medium text-black mb-2 cursor-pointer"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col text-xs w-full mb-2">
          <label
            htmlFor="lastName"
            className="text-xs font-medium text-black mb-2 cursor-pointer"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col text-xs w-full mb-2">
          <label
            htmlFor="email"
            className="text-xs font-medium text-black mb-2 cursor-pointer"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col text-xs w-full mb-2">
          <label
            htmlFor="phoneNumber"
            className="text-xs font-medium text-black mb-2 cursor-pointer"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col text-xs w-full mb-2">
          <label
            htmlFor="address"
            className="text-xs font-medium text-black mb-2 cursor-pointer"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 w-full text-white font-medium text-sm hover:bg-[#3b69a5] capitalize"
            onClick={onSaveUserClicked}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const EditUser = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditUserForm user={user} /> : <p>Loading ...</p>;
  return (
    <section>
      <NavigationBack
        routeName={"/personal-info"}
        routeTitle={"Edit Your Profile info"}
      />
      <div>{content}</div>
    </section>
  );
};

export default EditUser;

// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";
// import {
//   selectUserById,
//   useDeleteUserMutation,
//   useUpdateUserMutation,
// } from "../services/api/userApiSlice";
// import { NavigationBack } from "../components";

// const EditUserForm = ({ user }) => {
//   const [updateUser, { isSuccess, error }] = useUpdateUserMutation();
//   const [deleteUser, { isSuccess: isDelSuccess, error: delError }] =
//     useDeleteUserMutation();
//   const navigate = useNavigate();

//   const [firstName, setFirstName] = useState(user?.firstName || "");
//   const [lastName, setLastName] = useState(user?.lastName || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
//   const [roles, setRoles] = useState(user?.roles || ["customer"]);
//   const [address, setAddress] = useState(user?.address || "");
//   const [vehicle, setVehicle] = useState(user?.vehicle || "");
//   const [status, setStatus] = useState(user?.status || "Available");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (isSuccess || isDelSuccess) {
//       navigate("/users");
//     }
//   }, [isSuccess, isDelSuccess, navigate]);

//   const onSaveUserClicked = async () => {
//     try {
//       await updateUser({
//         id: user.id,
//         firstName,
//         lastName,
//         email,
//         phoneNumber,
//         roles,
//         address,
//         vehicle,
//         status,
//         ...(password && { password }),
//       }).unwrap();
//     } catch (err) {
//       console.error("Update failed:", err);
//     }
//   };

//   const onDeleteUserClicked = async () => {
//     try {
//       await deleteUser({ id: user.id }).unwrap();
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit User</h2>
//       {error && <p className="text-red-500">{error.data?.message}</p>}
//       {delError && <p className="text-red-500">{delError.data?.message}</p>}

//       <form className="space-y-4">
//         <input
//           type="text"
//           className="input"
//           placeholder="First Name"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//         <input
//           type="text"
//           className="input"
//           placeholder="Last Name"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//         <input
//           type="email"
//           className="input"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           className="input"
//           placeholder="Phone Number"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//         />
//         <input
//           type="password"
//           className="input"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="text"
//           className="input"
//           placeholder="Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           className="input"
//           placeholder="Vehicle"
//           value={vehicle}
//           onChange={(e) => setVehicle(e.target.value)}
//         />
//         <select
//           className="input"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <option value="Available">Available</option>
//           <option value="Busy">Busy</option>
//         </select>
//         <button
//           type="button"
//           className="btn-primary"
//           onClick={onSaveUserClicked}
//         >
//           Save
//         </button>
//         <button
//           type="button"
//           className="btn-danger"
//           onClick={onDeleteUserClicked}
//         >
//           Delete
//         </button>
//       </form>
//     </div>
//   );
// };

// const EditUser = () => {
//   const { id } = useParams();

//   const user = useSelector((state) => selectUserById(state, id));

//   const content = user ? <EditUserForm user={user} /> : <p>Loading ...</p>;
//   return (
//     <section>
//       <NavigationBack />
//       <div>{content}</div>
//     </section>
//   );
// };

// export default EditUser;

// import { useState, useEffect } from "react";
// import { useUpdateUserMutation, useDeleteUserMutation } from "../slices/usersApiSlice";
// import { useNavigate } from "react-router-dom";

// const EditUserForm = ({ user }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     roles: [],
//     address: "",
//     vehicle: "",
//     status: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
//   const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phoneNumber: user.phoneNumber || "",
//         roles: user.roles || [],
//         address: user.address || "",
//         vehicle: user.vehicle || "",
//         status: user.status || "Available",
//         password: "", // Empty initially
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateUser({ id: user.id, ...formData }).unwrap();
//       navigate("/users"); // Redirect after update
//     } catch (error) {
//       console.error("Update failed", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await deleteUser({ id: user.id }).unwrap();
//         navigate("/users");
//       } catch (error) {
//         console.error("Delete failed", error);
//       }
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded" />
//         <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-2 border rounded" />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" disabled />
//         <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" />
//         <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" />
//         <input type="text" name="vehicle" placeholder="Vehicle" value={formData.vehicle} onChange={handleChange} className="w-full p-2 border rounded" />
//         <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
//           <option value="Available">Available</option>
//           <option value="Busy">Busy</option>
//         </select>
//         <input type="password" name="password" placeholder="New Password (optional)" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">{updating ? "Updating..." : "Update"}</button>
//       </form>
//       <button onClick={handleDelete} className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600">{deleting ? "Deleting..." : "Delete User"}</button>
//     </div>
//   );
// };

// export default EditUserForm;
