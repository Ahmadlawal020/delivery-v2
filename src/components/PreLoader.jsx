import { ThreeDots } from "react-loader-spinner";

const PreLoader = ({ visible = true }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <ThreeDots
        visible={visible}
        height="80"
        width="80"
        color="#3b82f6" // Tailwind blue-500
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default PreLoader;
