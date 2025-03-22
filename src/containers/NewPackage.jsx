import { useState } from "react";
import { useNavigate } from "react-router";
import { useAddPackageMutation } from "../services/api/packageApiSlice";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const NewPackageForm = () => {
  const [addPackage, { isLoading }] = useAddPackageMutation();
  const navigate = useNavigate();

  const { id } = useAuth();

  // Step state
  const [step, setStep] = useState(1);

  // Form state
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [pickupDate, setPickupDate] = useState("");

  // Handle next step
  const handleNext = () => {
    if (step === 1 && (!pickupAddress || !deliveryAddress)) {
      toast.error("Please fill in both pickup and delivery addresses.");
      return;
    }
    if (step === 2 && (!recipientName || !recipientPhone)) {
      toast.error("Please fill in recipient name and phone number.");
      return;
    }
    setStep(step + 1);
  };

  // Handle previous step
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !pickupAddress ||
      !deliveryAddress ||
      !recipientName ||
      !recipientPhone ||
      !description ||
      !deliveryDate ||
      !pickupDate
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      // Call the addPackage mutation
      await addPackage({
        senderId: id,
        pickupAddress,
        deliveryAddress,
        recipientName,
        recipientPhone,
        recipientEmail,
        description,
        deliveryDate,
        pickupDate,
      }).unwrap();

      // Show success toast
      toast.success("Package created successfully!");

      // Redirect to the packages page after a short delay
      setTimeout(() => {
        navigate("/tracking");
      }, 2000); // 2 seconds delay
    } catch (err) {
      console.error("Package creation failed:", err);

      // Show error toast
      toast.error("Failed to create package. Please try again.");
    }
  };

  return (
    <div className="max-sm:w-[320px] w-[396px] px-4 py-1">
      <Toaster /> {/* Add Toaster component to display toasts */}
      <header className="text-center mb-10">
        {/* <h1 className="text-3xl font-normal capitalize">Create New Package</h1> */}
      </header>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Pickup and Delivery Addresses */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Enter locations</h2>
            <div className="flex flex-col text-xs w-full mb-2">
              <label
                htmlFor="pickupAddress"
                className="text-xs font-medium text-black mb-2 cursor-pointer"
              >
                Pickup Address
              </label>
              <input
                type="text"
                id="pickupAddress"
                placeholder="Enter Pickup Address"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
                required
              />
            </div>
            <div className="flex flex-col text-xs w-full mb-2">
              <label
                htmlFor="deliveryAddress"
                className="text-xs font-medium text-black mb-2 cursor-pointer"
              >
                Delivery Address
              </label>
              <input
                type="text"
                id="deliveryAddress"
                placeholder="Enter Delivery Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
                required
              />
            </div>
            <button
              type="button"
              className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 w-full text-white font-medium text-sm hover:bg-[#3b69a5] capitalize"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Recipient Details */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Recipient Details</h2>
            <div className="flex flex-col text-xs w-full mb-2">
              <label
                htmlFor="recipientName"
                className="text-xs font-medium text-black mb-2 cursor-pointer"
              >
                Recipient Name
              </label>
              <input
                type="text"
                id="recipientName"
                placeholder="Enter Recipient Name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
                required
              />
            </div>
            <div className="flex flex-col text-xs w-full mb-2">
              <label
                htmlFor="recipientPhone"
                className="text-xs font-medium text-black mb-2 cursor-pointer"
              >
                Recipient Phone
              </label>
              <input
                type="text"
                id="recipientPhone"
                placeholder="Enter Recipient Phone"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
                required
              />
            </div>
            <div className="flex flex-col text-xs w-full mb-2">
              <label
                htmlFor="recipientEmail"
                className="text-xs font-medium text-black mb-2 cursor-pointer"
              >
                Recipient Email
              </label>
              <input
                type="email"
                id="recipientEmail"
                placeholder="Enter Recipient Email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="mt-4 bg-gray-500 rounded-sm pt-3 pb-3 pl-9 pr-9 w-1/2 mr-2 text-white font-medium text-sm hover:bg-gray-600 capitalize"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="button"
                className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 w-1/2 text-white font-medium text-sm hover:bg-[#3b69a5] capitalize"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Product Information */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
            <div className="flex flex-col text-xs w-full mb-2">
              <label
                htmlFor="description"
                className="text-xs font-medium text-black mb-2 cursor-pointer"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
                required
              />
            </div>
            <div className="flex flex-col text-xs w-full mb-2">
              <label
                htmlFor="pickupDate"
                className="text-xs font-medium text-black mb-2 cursor-pointer"
              >
                Pickup Date
              </label>
              <input
                type="datetime-local"
                id="pickupDate"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
                required
              />
            </div>

            <div className="flex flex-col text-xs w-full mb-2">
              <label
                htmlFor="deliveryDate"
                className="text-xs font-medium text-black mb-2 cursor-pointer"
              >
                Delivery Date
              </label>
              <input
                type="datetime-local"
                id="deliveryDate"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="mt-4 bg-gray-500 rounded-sm pt-3 pb-3 pl-9 pr-9 w-1/2 mr-2 text-white font-medium text-sm hover:bg-gray-600 capitalize"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="submit"
                className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 w-1/2 text-white font-medium text-sm hover:bg-[#3b69a5] capitalize"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Create Package"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

const NewPackage = () => {
  return (
    <div>
      <NewPackageForm />
    </div>
  );
};

export default NewPackage;
