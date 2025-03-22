import useAuth from "../hooks/useAuth";

const PackageCard = ({ packageData }) => {
  const {
    packageId,
    recipientName,
    deliveryStatus,
    paymentStatus,
    deliveryDate,
    pickupDate,
  } = packageData;
  const { roles } = useAuth();

  // Ensure dates are valid before formatting
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  return (
    <article className="rounded-lg p-6 space-y-4 bg-white shadow-sm">
      {/* Package Information */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Package Information</h2>
        <p className="text-gray-700">
          <span className="font-medium">Package ID:</span> {packageId}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Recipient:</span> {recipientName}
        </p>
      </div>

      {/* Delivery Information */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Delivery Information</h2>
        <p className="text-gray-700">
          <span className="font-medium">Delivery Status:</span>{" "}
          <span
            className={`${
              deliveryStatus === "Delivered"
                ? "text-green-600"
                : deliveryStatus === "Cancelled"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {deliveryStatus}
          </span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Payment Status:</span>{" "}
          <span
            className={
              paymentStatus === "Paid" ? "text-green-600" : "text-red-600"
            }
          >
            {paymentStatus}
          </span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Delivery Date:</span>{" "}
          <time dateTime={deliveryDate}>{formatDate(deliveryDate)}</time>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Pickup Date:</span>{" "}
          <time dateTime={pickupDate}>{formatDate(pickupDate)}</time>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="bg-[#0056D2] rounded-sm px-6 py-3 text-white font-medium text-sm hover:bg-[#3b69a5] capitalize cursor-pointer">
          View Details
        </button>
        {roles.includes("Employee") && (
          <button className="bg-green-600 rounded-sm px-6 py-3 text-white font-medium text-sm hover:bg-green-700 capitalize cursor-pointer">
            Accept Delivery
          </button>
        )}
      </div>
    </article>
  );
};

export default PackageCard;

// import useAuth from "../hooks/useAuth";

// const PackageCard = ({ packageData }) => {
//   const {
//     // id,
//     packageId,
//     recipientName,
//     deliveryStatus,
//     paymentStatus,
//     deliveryDate,
//     pickupDate,
//   } = packageData;
//   const { roles } = useAuth();

//   return (
//     <article className="rounded-lg p-6 space-y-4 bg-white shadow-sm">
//       {/* Package Information */}
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Package Information</h2>
//         <p className="text-gray-700">
//           <span className="font-medium">Package ID:</span> {packageId}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-medium">Recipient:</span> {recipientName}
//         </p>
//       </div>

//       {/* Delivery Information */}
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Delivery Information</h2>
//         <p className="text-gray-700">
//           <span className="font-medium">Delivery Status:</span>{" "}
//           <span
//             className={`${
//               deliveryStatus === "Delivered"
//                 ? "text-green-600"
//                 : deliveryStatus === "Cancelled"
//                 ? "text-red-600"
//                 : "text-yellow-600"
//             }`}
//           >
//             {deliveryStatus}
//           </span>
//         </p>
//         <p className="text-gray-700">
//           <span className="font-medium">Payment Status:</span>{" "}
//           <span
//             className={`${
//               paymentStatus === "Paid" ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {paymentStatus}
//           </span>
//         </p>
//         <p className="text-gray-700">
//           <span className="font-medium">Delivery Date:</span>{" "}
//           {new Date(deliveryDate).toLocaleDateString()}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-medium">Pickup Date:</span>{" "}
//           {new Date(pickupDate).toLocaleDateString()}
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end space-x-4">
//         <button className="bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 text-white font-medium text-sm hover:bg-[#3b69a5] capitalize">
//           View Details
//         </button>
//         {roles.includes("Employee") && (
//           <button className="bg-green-600 rounded-sm pt-3 pb-3 pl-6 pr-6 text-white font-medium text-sm hover:bg-green-700 capitalize">
//             Accept Delivery
//           </button>
//         )}
//       </div>
//     </article>
//   );
// };

// export default PackageCard;
