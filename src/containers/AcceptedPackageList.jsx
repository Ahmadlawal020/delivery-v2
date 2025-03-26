import { useGetPackagesQuery } from "../services/api/packageApiSlice";
import { PackageCard } from "../components";
import useAuth from "../hooks/useAuth";

const AcceptedPackageList = () => {
  const { data: packages, isLoading, isError } = useGetPackagesQuery();
  const { id } = useAuth(); // Get the authenticated user's _id

  if (isLoading) return <p className="text-center">Loading packages...</p>;
  if (isError)
    return <p className="text-center text-red-600">Failed to load packages.</p>;

  const allPackages = packages?.entities
    ? Object.values(packages.entities)
    : [];

  // Filter packages:
  // 1. That are assigned to the current user (has deliveryPersonId and matches auth _id)
  // 2. That are not in "Pending" status
  const acceptedPackages = allPackages.filter(
    (pkg) =>
      pkg.deliveryPersonId?._id === id &&
      pkg.deliveryStatus &&
      pkg.deliveryStatus !== "Pending"
  );

  // Check if user has any packages assigned (regardless of status)
  const hasAnyAssignedPackages = allPackages.some(
    (pkg) => pkg.deliveryPersonId?._id === id
  );

  return (
    <section className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {acceptedPackages.length > 0 ? (
          acceptedPackages.map((pkg) => (
            <PackageCard key={pkg._id} packageData={pkg} />
          ))
        ) : (
          <p className="text-gray-600">
            {hasAnyAssignedPackages
              ? "You only have pending packages"
              : "No packages are currently assigned to you"}
          </p>
        )}
      </div>
    </section>
  );
};

export default AcceptedPackageList;
