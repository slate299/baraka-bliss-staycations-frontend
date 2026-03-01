// src/operator/components/ApartmentPreviewModal.jsx
import { useState } from "react";
import {
  FaTimes,
  FaBed,
  FaBath,
  FaUsers,
  FaWifi,
  FaParking,
  FaTv,
  FaSnowflake,
  FaFire,
  FaDumbbell,
  FaSwimmer,
  FaShieldAlt,
  FaCoffee,
  FaUtensils,
  FaArrowLeft,
  FaArrowRight,
  FaImage,
  FaVideo,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Amenity icons mapping
const amenityIcons = {
  WiFi: <FaWifi />,
  Parking: <FaParking />,
  TV: <FaTv />,
  "Air Conditioning": <FaSnowflake />,
  "Air Conditioning": <FaSnowflake />,
  Fireplace: <FaFire />,
  Gym: <FaDumbbell />,
  Pool: <FaSwimmer />,
  Security: <FaShieldAlt />,
  "Coffee Maker": <FaCoffee />,
  Kitchen: <FaUtensils />,
};

const ApartmentPreviewModal = ({ apartment, onClose }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!apartment) return null;

  const {
    name,
    city,
    area,
    price,
    description,
    bedrooms,
    bathrooms,
    maxGuests,
    amenities = [],
    mediaFiles = [],
    isAvailable,
  } = apartment;

  // Get full media URL
  const getFullMediaUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const cleanPath = path.replace(/\\/g, "/");
    return `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}/${cleanPath}`;
  };

  // Check if media is video
  const isVideo = (path) => {
    const videoExtensions = [".mp4", ".mov", ".avi", ".webm", ".mkv"];
    return videoExtensions.some((ext) => path?.toLowerCase().includes(ext));
  };

  const currentMedia = mediaFiles[currentMediaIndex];
  const currentMediaUrl = currentMedia ? getFullMediaUrl(currentMedia) : null;
  const isCurrentVideo = currentMedia ? isVideo(currentMedia) : false;

  // Count media types
  const mediaCount = {
    images: mediaFiles.filter((m) => !isVideo(m)).length,
    videos: mediaFiles.filter((m) => isVideo(m)).length,
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? mediaFiles.length - 1 : prev - 1,
    );
    setIsVideoPlaying(false);
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === mediaFiles.length - 1 ? 0 : prev + 1,
    );
    setIsVideoPlaying(false);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-primary-dark rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <p className="text-text-secondary">
              {city}, {area}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
            aria-label="Close preview"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Media Gallery */}
          <div className="relative bg-black h-[400px]">
            {mediaFiles.length > 0 ? (
              <>
                {/* Media Display */}
                <div className="relative h-full flex items-center justify-center">
                  {isCurrentVideo ? (
                    <video
                      src={currentMediaUrl}
                      className="max-h-full max-w-full object-contain"
                      controls
                      autoPlay={isVideoPlaying}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                    />
                  ) : (
                    <img
                      src={currentMediaUrl}
                      alt={`${name} - ${currentMediaIndex + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>

                {/* Navigation Arrows */}
                {mediaFiles.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevMedia}
                      className="absolute left-4 top-1/2 -translate-y-1/2
                                 bg-black/50 hover:bg-black/75 text-white
                                 p-3 rounded-full transition-all
                                 hover:scale-110"
                      aria-label="Previous media"
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      onClick={handleNextMedia}
                      className="absolute right-4 top-1/2 -translate-y-1/2
                                 bg-black/50 hover:bg-black/75 text-white
                                 p-3 rounded-full transition-all
                                 hover:scale-110"
                      aria-label="Next media"
                    >
                      <FaArrowRight />
                    </button>
                  </>
                )}

                {/* Media Counter */}
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2
                                bg-black/75 text-white px-4 py-2 rounded-full
                                text-sm flex items-center gap-3"
                >
                  <span className="flex items-center gap-1">
                    <FaImage />
                    {mediaCount.images}
                  </span>
                  {mediaCount.videos > 0 && (
                    <>
                      <span className="text-gray-500">|</span>
                      <span className="flex items-center gap-1">
                        <FaVideo />
                        {mediaCount.videos}
                      </span>
                    </>
                  )}
                  <span className="text-gray-500">|</span>
                  <span>
                    {currentMediaIndex + 1} / {mediaFiles.length}
                  </span>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-text-secondary">
                <FaImage className="text-6xl mb-4 opacity-30" />
                <p>No media files uploaded</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    isAvailable
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
              >
                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Price */}
            <div>
              <span className="text-3xl font-bold text-white">
                KES {price.toLocaleString()}
              </span>
              <span className="text-text-secondary ml-2">/night</span>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="text-center">
                <FaBed className="text-client-rose text-xl mx-auto mb-2" />
                <p className="text-text-secondary text-sm">Bedrooms</p>
                <p className="text-white font-semibold">{bedrooms}</p>
              </div>
              <div className="text-center">
                <FaBath className="text-client-green text-xl mx-auto mb-2" />
                <p className="text-text-secondary text-sm">Bathrooms</p>
                <p className="text-white font-semibold">{bathrooms}</p>
              </div>
              <div className="text-center">
                <FaUsers className="text-client-gold text-xl mx-auto mb-2" />
                <p className="text-text-secondary text-sm">Max Guests</p>
                <p className="text-white font-semibold">{maxGuests}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Description
              </h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg"
                    >
                      <span className="text-client-rose">
                        {amenityIcons[amenity] || <FaWifi />}
                      </span>
                      <span className="text-text-secondary text-sm">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApartmentPreviewModal;
