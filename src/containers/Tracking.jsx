import { NavigationBack } from "../components";
import { useGetPackagesQuery } from "../services/api/packageApiSlice";
import useAuth from "../hooks/useAuth";
import { PackageCard } from "../components";

const Tracking = () => {
  const { id } = useAuth(); // Get the authenticated user's ID
  const { data: packages, isLoading, isError } = useGetPackagesQuery();

  const userPackages = packages?.entities
    ? Object.values(packages.entities).filter((pkg) => pkg.senderId._id === id)
    : [];

  return (
    <section className="px-4 py-3">
      <NavigationBack routeName="/" routeTitle="Track your Delivery Orders" />

      {/* Handle loading and error states */}
      {isLoading && <p className="text-gray-600">Loading packages...</p>}
      {isError && <p className="text-red-600">Failed to load packages.</p>}

      {/* Display packages if available */}
      {userPackages.length > 0 ? (
        <div className="space-y-4">
          {userPackages.map((pkg) => {
            console.log(pkg);
            return <PackageCard key={pkg.packageId} packageData={pkg} />;
          })}
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No packages found.</p>
      )}
    </section>
  );
};

export default Tracking;
