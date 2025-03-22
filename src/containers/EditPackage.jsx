import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectPackageById } from "../services/api/packageApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useUpdatePackageMutation,
  useDeletePackageMutation,
} from "../services/api/packageApiSlice";

const EditPackageForm = ({ packageData }) => {
  const [updatePackage, { isSuccess, error }] = useUpdatePackageMutation();
  const [deletePackage, { isSuccess: isDelSuccess, error: delError }] =
    useDeletePackageMutation();
  const navigate = useNavigate();

  const [recipientName, setRecipientName] = useState(
    packageData?.recipientName || ""
  );
  const [recipientPhone, setRecipientPhone] = useState(
    packageData?.recipientPhone || ""
  );
  const [recipientEmail, setRecipientEmail] = useState(
    packageData?.recipientEmail || ""
  );
  const [description, setDescription] = useState(
    packageData?.description || ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    packageData?.deliveryAddress || ""
  );
  const [pickupAddress, setPickupAddress] = useState(
    packageData?.pickupAddress || ""
  );
  const [deliveryDate, setDeliveryDate] = useState(
    packageData?.deliveryDate || ""
  );
  const [pickupDate, setPickupDate] = useState(packageData?.pickupDate || "");
  const [deliveryStatus, setDeliveryStatus] = useState(
    packageData?.deliveryStatus || "Pending"
  );
  const [paymentStatus, setPaymentStatus] = useState(
    packageData?.paymentStatus || "Unpaid"
  );

  const onSavePackageClicked = async () => {
    try {
      await updatePackage({
        id: packageData.id,
        recipientName,
        recipientPhone,
        recipientEmail,
        description,
        deliveryAddress,
        pickupAddress,
        deliveryDate,
        pickupDate,
        deliveryStatus,
        paymentStatus,
      }).unwrap();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const onDeletePackageClicked = async () => {
    try {
      await deletePackage({ id: packageData.id }).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (isSuccess || isDelSuccess) {
    navigate("/packages");
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Package</h2>
      {error && <p className="text-red-500">{error.data?.message}</p>}
      {delError && <p className="text-red-500">{delError.data?.message}</p>}

      <form className="space-y-4">
        <input
          type="text"
          className="input"
          placeholder="Recipient Name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Recipient Phone"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
        />
        <input
          type="email"
          className="input"
          placeholder="Recipient Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Delivery Address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Pickup Address"
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
        />
        <input
          type="datetime-local"
          className="input"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
        <input
          type="datetime-local"
          className="input"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />
        <select
          className="input"
          value={deliveryStatus}
          onChange={(e) => setDeliveryStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
        <select
          className="input"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select>
        <button
          type="button"
          className="btn-primary"
          onClick={onSavePackageClicked}
        >
          Save
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={onDeletePackageClicked}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

const EditPackage = () => {
  const { id } = useParams();
  const packageData = useSelector((state) => selectPackageById(state, id));

  const content = packageData ? (
    <EditPackageForm packageData={packageData} />
  ) : (
    <p>Loading...</p>
  );

  return content;
};

export default EditPackage;
