// src/client/components/common/LoadingButton.jsx
import { FaSpinner } from "react-icons/fa";

const LoadingButton = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden
        transition-all duration-200
        hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${className}
      `}
      {...props}
    >
      <span
        className={`flex items-center justify-center gap-2 transition-all duration-200
        ${loading ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </span>

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <FaSpinner className="animate-spin text-current" />
        </span>
      )}
    </button>
  );
};

export default LoadingButton;
