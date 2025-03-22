import { useGetPackagesQuery } from "../services/api/packageApiSlice";
import { PackageCard } from "../components";

const PackagesList = () => {
  const { data: packages, isLoading, isError } = useGetPackagesQuery();

  if (isLoading) return <p className="text-center">Loading packages...</p>;
  if (isError)
    return <p className="text-center text-red-600">Failed to load packages.</p>;

  const allPackages = packages?.entities
    ? Object.values(packages.entities)
    : [];

  return (
    <section className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allPackages.length > 0 ? (
          allPackages.map((pkg) => (
            <PackageCard key={pkg._id} packageData={pkg} />
          ))
        ) : (
          <p className="text-gray-600">No packages found.</p>
        )}
      </div>
    </section>
  );
};

export default PackagesList;
