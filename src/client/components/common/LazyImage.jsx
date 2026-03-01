// src/client/components/common/LazyImage.jsx
import { useState } from "react";
import { FaImage, FaSpinner } from "react-icons/fa";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholderClassName = "",
  onClick,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blur, setBlur] = useState(true); // <-- ADD THIS STATE

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Loading Spinner */}
      {isLoading && !error && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-client-bg ${placeholderClassName}`}
        >
          <FaSpinner className="text-client-rose text-2xl animate-spin" />
        </div>
      )}

      {/* Error Fallback */}
      {error && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-client-bg ${placeholderClassName}`}
        >
          <FaImage className="text-client-text-secondary text-3xl opacity-30 mb-2" />
          <span className="text-xs text-client-text-secondary">
            Image unavailable
          </span>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => {
          setIsLoading(false);
          setTimeout(() => setBlur(false), 100); // <-- ADD THIS (remove blur after short delay)
        }}
        onError={() => {
          setError(true);
          setIsLoading(false);
          setBlur(false); // <-- ADD THIS
        }}
        className={`
          w-full h-full object-cover
          transition-all duration-700
          ${isLoading || error ? "opacity-0" : "opacity-100"}
          ${blur ? "blur-sm scale-105" : "blur-0 scale-100"} // <-- ADD THIS LINE
          ${className}
        `}
        onClick={onClick}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
