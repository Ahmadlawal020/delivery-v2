import { useSelector } from "react-redux";
import { selectCurrentToken } from "../services/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isEmployee = false;
  let isAdmin = false;
  let status = "Customer";

  if (token) {
    const decoded = jwtDecode(token);
    const { id, email, roles, firstName, lastName } = decoded.UserInfo; // Changed from userId to id

    isEmployee = roles.includes("Employee");
    isAdmin = roles.includes("Admin");

    if (isEmployee) status = "Employee";
    if (isAdmin) status = "Admin";

    return {
      id,
      email,
      roles,
      status,
      isEmployee,
      firstName,
      lastName,
    }; // Changed userId to id
  }

  return {
    id: "", // Changed from userId to id
    email: "",
    roles: [],
    isEmployee,
    status,
    firstName: "",
    lastName: "",
  };
};

export default useAuth;
