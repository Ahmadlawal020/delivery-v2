import ComingSoon from "../components/ComingSoon";
import NavigationBack from "../components/NavigationBack";

const About = () => {
  return (
    <div>
      <NavigationBack routeName={"/"} routeTitle={"about"} />
      <ComingSoon />
    </div>
  );
};

export default About;
