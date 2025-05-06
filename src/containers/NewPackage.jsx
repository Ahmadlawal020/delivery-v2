import { useState } from "react";
import { useNavigate } from "react-router";
import { useAddPackageMutation } from "../services/api/packageApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { expandToMid } from "../services/bottomSheetSlice";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

import { selectUserById } from "../services/api/userApiSlice";
import { UpdateUserInfoButton } from "../components";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  DocumentTextIcon,
  CalendarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import {
  CurrencyDollarIcon,
  CreditCardIcon,
  ChevronDownIcon,
  CheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  BuildingStorefrontIcon,
  HomeIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

const NewPackageForm = () => {
  const { id: userId } = useAuth();
  const user = useSelector((state) => selectUserById(state, userId));
  const isProfileComplete =
    user && user.firstName && user.lastName && user.phoneNumber;

  const [addPackage, { isLoading }] = useAddPackageMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [priceOffer, setPriceOffer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default to cash

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
    if (step === 3 && (!description || !pickupDate)) {
      toast.error("Please fill in description and pickup date.");
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
      !pickupDate ||
      !priceOffer ||
      !paymentMethod
    ) {
      toast.error("Required fields are missing.");
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
        deliveryDate, // This is now optional
        pickupDate,
        priceOffer,
        paymentMethod,
      }).unwrap();

      // Show success toast
      toast.success("Package created successfully!");
      dispatch(expandToMid());

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

  if (!isProfileComplete) {
    return (
      <div className="max-sm:w-[320px] w-[396px] px-4 py-1">
        <Toaster />
        <div className="text-center my-8">
          <UpdateUserInfoButton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-sm:w-[320px] w-[396px] px-4 py-1">
      <Toaster /> {/* Add Toaster component to display toasts */}
      <header className="text-center mb-10">
        {/* <h1 className="text-3xl font-normal capitalize">Create New Package</h1> */}
      </header>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Pickup and Delivery Addresses */}
        {step === 1 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-medium text-gray-800 text-xl flex items-center gap-2">
                Enter Locations
              </h2>
            </div>

            <div className="p-8">
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <TruckIcon className="h-4 w-4 text-gray-500" />
                    Pickup Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123 Main St, City, Country"
                      required
                    />
                    <BuildingStorefrontIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <HomeIcon className="h-4 w-4 text-gray-500" />
                    Delivery Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="456 Elm St, City, Country"
                      required
                    />
                    <HomeModernIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full md:w-auto flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Next
                    <ArrowRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Recipient Details */}
        {step === 2 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-800 text-xl">
                Recipient Details
              </h2>
            </div>

            <div className="p-8">
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter recipient name"
                      required
                    />
                    <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Phone
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                      required
                    />
                    <PhoneIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email address"
                    />
                    <EnvelopeIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="pt-4 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 flex justify-center items-center gap-2 py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Next
                    <ArrowRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Product Information */}
        {step === 3 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-800 text-xl">
                Product Information
              </h2>
            </div>

            <div className="p-8">
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                      placeholder="Enter product description"
                      required
                    />
                    <DocumentTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Date
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Date (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <TruckIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 flex justify-center items-center gap-2 py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Next
                    <ArrowRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Pricing and Payment */}
        {step === 4 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-800 text-xl">
                Pricing and Payment
              </h2>
            </div>

            <div className="p-8">
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Offer
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={priceOffer}
                      onChange={(e) => setPriceOffer(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter price amount"
                      required
                    />
                    <CurrencyDollarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <div className="relative">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      required
                    >
                      <option value="cash">Cash on Delivery</option>
                      <option value="app">Pay with App</option>
                    </select>
                    <CreditCardIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <ChevronDownIcon className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="pt-4 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 flex justify-center items-center gap-2 py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <ArrowPathIcon className="h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckIcon className="h-5 w-5" />
                        Create Package
                      </>
                    )}
                  </button>
                </div>
              </div>
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
