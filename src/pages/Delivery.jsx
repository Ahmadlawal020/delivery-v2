import { NavigationBack } from "../components";
import { PackagesList } from "../containers";

const Delivery = () => {
  return (
    <section>
      <NavigationBack routeTitle={"Delivery Request"} />

      <PackagesList />
    </section>
  );
};

export default Delivery;
