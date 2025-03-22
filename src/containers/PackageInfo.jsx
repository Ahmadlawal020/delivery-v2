import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectPackageById } from "../services/api/packageApiSlice";

const PackageInfo = ({ dPackageId }) => {
  const dPackage = useSelector((state) => selectPackageById(state, dPackageId));
  const navigate = useNavigate();

  if (!dPackage) return null;

  const created = new Date(dPackage.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const updated = new Date(dPackage.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleEdit = () => navigate(`/edit-package/${dPackageId}`);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Package Details</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Recipient Information</h2>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {dPackage.recipientName}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {dPackage.recipientPhone}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {dPackage.recipientEmail}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Delivery Information</h2>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">Delivery Address:</span>{" "}
              {dPackage.deliveryAddress}
            </p>
            <p>
              <span className="font-medium">Pickup Address:</span>{" "}
              {dPackage.pickupAddress}
            </p>
            <p>
              <span className="font-medium">Delivery Date:</span>{" "}
              {new Date(dPackage.deliveryDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Pickup Date:</span>{" "}
              {new Date(dPackage.pickupDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Status</h2>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">Delivery Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  dPackage.deliveryStatus === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {dPackage.deliveryStatus}
              </span>
            </p>
            <p>
              <span className="font-medium">Payment Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  dPackage.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {dPackage.paymentStatus}
              </span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Timestamps</h2>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">Created:</span> {created}
            </p>
            <p>
              <span className="font-medium">Last Updated:</span> {updated}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={handleEdit}
        >
          Edit Package
        </button>
      </div>
    </div>
  );
};

export default PackageInfo;
