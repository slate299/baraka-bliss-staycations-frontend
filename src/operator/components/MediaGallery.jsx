// src/operator/components/MediaGallery.jsx
import { FaImage, FaVideo, FaTrash, FaPlay, FaSpinner } from "react-icons/fa";
import { useState } from "react";

const MediaGallery = ({ mediaFiles = [], onRemove, isLoading = false }) => {
  const [videoErrors, setVideoErrors] = useState({});

  // UPDATED: Helper to safely get URL from different formats
  const getMediaUrl = (media) => {
    if (!media) return null;

    // If it's an object with url property (Cloudinary format)
    if (typeof media === "object" && media.url) {
      return media.url;
    }

    // If it's a string
    if (typeof media === "string") {
      // If it's already a full URL
      if (media.startsWith("http")) {
        return media;
      }
      // If it's a local path
      const cleanPath = media.replace(/\\/g, "/");
      return `${process.env.REACT_APP_API_BASE_URL}/${cleanPath}`;
    }

    return null;
  };

  // UPDATED: Helper to determine if file is video
  const isVideo = (media) => {
    const url = getMediaUrl(media);
    if (!url) return false;

    const videoExtensions = [
      ".mp4",
      ".mov",
      ".avi",
      ".webm",
      ".mkv",
      ".m4v",
      ".3gp",
    ];
    return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
  };

  // Handle video error
  const handleVideoError = (index) => {
    setVideoErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Extract filename for display
  const getFileName = (media) => {
    const url = getMediaUrl(media);
    if (!url) return "Media file";
    return url.split("/").pop() || "Media file";
  };

  if (!mediaFiles || mediaFiles.length === 0) {
    return (
      <div className="bg-[#2C2C2C] rounded-lg p-8 text-center">
        <FaImage className="text-4xl text-text-secondary mx-auto mb-2 opacity-30" />
        <p className="text-text-secondary">No media files yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mediaFiles.map((file, index) => {
        const fileUrl = getMediaUrl(file);
        const fileName = getFileName(file);
        const isVideoFile = isVideo(file);
        const hasVideoError = videoErrors[index];

        return (
          <div key={index} className="relative group">
            {/* Media Thumbnail */}
            <div className="bg-[#2C2C2C] rounded-lg overflow-hidden aspect-square">
              {isVideoFile ? (
                <div className="relative w-full h-full">
                  {!hasVideoError ? (
                    <>
                      <video
                        src={fileUrl}
                        className="w-full h-full object-cover"
                        muted
                        onError={() => handleVideoError(index)}
                      />
                      {/* Video duration indicator */}
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        <FaPlay className="inline mr-1" size={8} />
                        Video
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#2C2C2C]">
                      <FaVideo className="text-3xl text-text-secondary mb-2 opacity-30" />
                      <span className="text-xs text-text-secondary">
                        Video unavailable
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-60 p-1 rounded">
                    <FaVideo className="text-white text-xs" />
                  </div>
                </div>
              ) : (
                <img
                  src={fileUrl}
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150?text=Error";
                  }}
                />
              )}
            </div>

            {/* Remove Button - appears on hover, shows spinner when loading */}
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(index, file)}
                disabled={isLoading}
                className={`absolute top-2 right-2 text-white p-2 rounded-full transition-all ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed opacity-100"
                    : "bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100"
                }`}
                title={isLoading ? "Removing..." : "Remove media"}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" size={12} />
                ) : (
                  <FaTrash size={12} />
                )}
              </button>
            )}

            {/* Optional: Dim the image when loading */}
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <FaSpinner className="animate-spin text-white text-xl" />
              </div>
            )}

            {/* File name tooltip on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
              {fileName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MediaGallery;
