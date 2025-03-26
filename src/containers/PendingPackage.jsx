import { useGetPackagesQuery } from "../services/api/packageApiSlice";
import useAuth from "../hooks/useAuth";
import { PackageCard } from "../components";

const PendingPackage = () => {
  const { id } = useAuth(); // Get the authenticated user's ID
  const { data: packages, isLoading, isError } = useGetPackagesQuery();

  if (isLoading) return <p className="text-center">Loading packages...</p>;
  if (isError)
    return <p className="text-center text-red-600">Failed to load packages.</p>;

  const allPackages = packages?.entities
    ? Object.values(packages.entities)
    : [];

  // Filter packages:
  // 1. That belong to the current user (senderId matches auth id)
  // 2. That have "pending" delivery status (case-insensitive check)
  const pendingPackages = allPackages.filter(
    (pkg) =>
      pkg.senderId?._id === id &&
      pkg.deliveryStatus &&
      pkg.deliveryStatus.toLowerCase() === "pending"
  );

  // Check if user has any packages at all (regardless of status)
  const hasAnyPackages = allPackages.some((pkg) => pkg.senderId?._id === id);

  return (
    <section className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pendingPackages.length > 0 ? (
          pendingPackages.map((pkg) => (
            <PackageCard key={pkg._id || pkg.packageId} packageData={pkg} />
          ))
        ) : (
          <p className="text-gray-600">
            {hasAnyPackages
              ? "You have no pending packages"
              : "You haven't sent any packages yet"}
          </p>
        )}
      </div>
    </section>
  );
};

export default PendingPackage;
