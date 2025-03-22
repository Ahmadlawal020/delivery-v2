import ComingSoon from "../components/ComingSoon";
import NavigationBack from "../components/NavigationBack";

const Promotion = () => {
  return (
    <div>
      <NavigationBack routeName={"/"} routeTitle={"promotion"} />
      <ComingSoon />
    </div>
  );
};

export default Promotion;
