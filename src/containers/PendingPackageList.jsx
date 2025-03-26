import { useGetPackagesQuery } from "../services/api/packageApiSlice";
import { PackageCard } from "../components";

const PendingPackageList = () => {
  const {
    data: packages,
    isLoading,
    isError,
    isSuccess,
  } = useGetPackagesQuery();

  if (isLoading) return <p className="text-center">Loading packages...</p>;
  if (isError)
    return <p className="text-center text-red-600">Failed to load packages.</p>;

  // Safely extract packages data
  const allPackages =
    isSuccess && packages?.entities ? Object.values(packages.entities) : [];

  // Filter packages with 'Pending' status
  const pendingPackages = allPackages.filter(
    (pkg) => pkg?.deliveryStatus?.toLowerCase() === "pending"
  );

  return (
    <section className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Packages</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pendingPackages.length > 0 ? (
          pendingPackages.map((pkg) => (
            <PackageCard key={pkg._id} packageData={pkg} />
          ))
        ) : (
          <p className="text-gray-600">No pending packages found.</p>
        )}
      </div>
    </section>
  );
};

export default PendingPackageList;
