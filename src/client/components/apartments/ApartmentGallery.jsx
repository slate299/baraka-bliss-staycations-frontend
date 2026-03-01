// src/client/components/apartments/ApartmentGallery.jsx
import { useState } from "react";
import {
  FaImage,
  FaVideo,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import LazyImage from "../common/LazyImage";

const ApartmentGallery = ({ mediaFiles = [], name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const getFullMediaUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const cleanPath = path.replace(/\\/g, "/");
    return `${process.env.REACT_APP_API_BASE_URL}/${cleanPath}`;
  };

  const isVideo = (path) => {
    const videoExtensions = [".mp4", ".mov", ".avi", ".webm", ".mkv"];
    return videoExtensions.some((ext) => path?.toLowerCase().includes(ext));
  };

  const mediaUrls = mediaFiles.map(getFullMediaUrl).filter(Boolean);
  const hasMedia = mediaUrls.length > 0;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? mediaUrls.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === mediaUrls.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  if (!hasMedia) {
    return (
      <div className="bg-client-bg rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <FaImage className="text-6xl text-client-text-secondary mx-auto mb-4 opacity-30" />
          <p className="text-client-text-secondary">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="bg-client-card rounded-lg overflow-hidden">
        {/* Main Image */}
        <div className="relative h-96 bg-client-bg">
          {!imageErrors[currentIndex] && mediaUrls[currentIndex] ? (
            isVideo(mediaFiles[currentIndex]) ? (
              <video
                src={mediaUrls[currentIndex]}
                className="w-full h-full object-contain transition-opacity duration-300"
                controls
                playsInline
              />
            ) : (
              <LazyImage
                src={mediaUrls[currentIndex]}
                alt={`${name} - Image ${currentIndex + 1}`}
                className="object-contain cursor-pointer transition-all duration-500 hover:scale-105"
                placeholderClassName="bg-client-bg"
                onClick={() => setShowFullscreen(true)}
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center animate-fadeIn">
              <FaImage className="text-6xl text-client-text-secondary opacity-30" />
            </div>
          )}

          {/* Navigation Arrows */}
          {mediaUrls.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 
                 bg-black bg-opacity-50 text-white p-2 rounded-full 
                 transition-all duration-200 hover:bg-opacity-70 
                 hover:scale-110 active:scale-95"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 
                 bg-black bg-opacity-50 text-white p-2 rounded-full 
                 transition-all duration-200 hover:bg-opacity-70 
                 hover:scale-110 active:scale-95"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {mediaUrls.length}
          </div>
        </div>

        {/* Thumbnails */}
        {mediaUrls.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {mediaUrls.map((url, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 
                    transition-all duration-200 hover:scale-105 hover:shadow-md
                    ${
                      currentIndex === index
                        ? "border-client-accent-green scale-105 shadow-md"
                        : "border-transparent hover:border-client-text-secondary"
                    }`}
              >
                {!imageErrors[index] && url ? (
                  isVideo(mediaFiles[index]) ? (
                    <div className="relative w-full h-full bg-client-bg">
                      <video
                        src={url}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <FaVideo className="text-white text-lg" />
                      </div>
                    </div>
                  ) : (
                    <LazyImage
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover"
                      placeholderClassName="bg-client-bg"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-client-bg flex items-center justify-center">
                    <FaImage className="text-client-text-secondary opacity-30" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setShowFullscreen(false)}
        >
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 text-white text-2xl p-2 
                 hover:bg-white hover:bg-opacity-20 rounded-full
                 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <FaTimes />
          </button>

          <div className="relative max-w-6xl max-h-[90vh] w-full mx-4">
            {!imageErrors[currentIndex] && mediaUrls[currentIndex] ? (
              isVideo(mediaFiles[currentIndex]) ? (
                <video
                  src={mediaUrls[currentIndex]}
                  className="w-full h-full max-h-[90vh] object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <LazyImage
                  src={mediaUrls[currentIndex]}
                  alt={`${name} - Fullscreen`}
                  className="object-contain"
                  placeholderClassName="bg-transparent"
                />
              )
            ) : (
              <div className="text-center text-white">
                <FaImage className="text-6xl mx-auto mb-4" />
                <p>Image unavailable</p>
              </div>
            )}

            {mediaUrls.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApartmentGallery;
