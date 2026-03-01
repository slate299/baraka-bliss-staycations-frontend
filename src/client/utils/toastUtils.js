// src/client/utils/toastUtils.js
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

export const showSuccessToast = (message) => {
  toast.success(message, {
    icon: <FaCheckCircle className="text-white" />,
    duration: 4000,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    icon: <FaExclamationCircle className="text-white" />,
    duration: 5000,
  });
};

export const showInfoToast = (message) => {
  toast(message, {
    icon: <FaInfoCircle className="text-white" />,
    duration: 3000,
  });
};

// Animated version with custom styling
export const showAnimatedToast = (message, type = "success") => {
  const colors = {
    success: "bg-client-green",
    error: "bg-client-error",
    info: "bg-blue-500",
  };

  toast.custom(
    (t) => (
      <div
        className={`${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg
                   transform transition-all duration-300 ease-out
                   ${t.visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}
                   flex items-center gap-3`}
      >
        {type === "success" && <FaCheckCircle className="text-white text-lg" />}
        {type === "error" && (
          <FaExclamationCircle className="text-white text-lg" />
        )}
        {type === "info" && <FaInfoCircle className="text-white text-lg" />}
        <span className="font-medium">{message}</span>
      </div>
    ),
    {
      duration: 4000,
      position: "top-right",
    },
  );
};
