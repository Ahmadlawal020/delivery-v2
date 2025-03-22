import { NavigationBack } from "../components";
import UserInfo from "./UserInfo";

const PersonalInfo = () => {
  return (
    <section>
      <NavigationBack routeTitle={"User Information"} routeName={"/"} />
      <UserInfo />
    </section>
  );
};

export default PersonalInfo;
