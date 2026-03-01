// src/operator/components/ApartmentCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBed,
  FaUser,
  FaDollarSign,
  FaEdit,
  FaTrash,
  FaPowerOff,
  FaVideo,
  FaImage,
  FaSpinner,
  FaPlay,
  FaEye, // 👈 Add this import
} from "react-icons/fa";
import { updateApartment, deleteApartment } from "../../services/api";
import toast from "react-hot-toast";
import ApartmentPreviewModal from "./ApartmentPreviewModal"; // 👈 Import the preview modal

const ApartmentCard = ({ apartment, onToggle, onDelete, inquiryCount = 0 }) => {
  const navigate = useNavigate();

  // Toggle states
  const [isToggling, setIsToggling] = useState(false);
  const [showAvailability, setShowAvailability] = useState(
    apartment.isAvailable,
  );

  // Delete states
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Preview state 👈 NEW
  const [showPreview, setShowPreview] = useState(false);

  // Media states
  const [imageError, setImageError] = useState(false);

  const {
    _id,
    name = "Unnamed Apartment",
    city = "Unknown City",
    area = "Unknown Area",
    price = 0,
    bedrooms = 0,
    maxGuests = 0,
    mediaFiles = [],
    isAvailable = true,
  } = apartment;

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/operator/edit/${_id}`);
  };

  // Helper function to determine media type from file path
  const getMediaType = (mediaPath) => {
    if (!mediaPath) return null;

    const videoExtensions = [".mp4", ".mov", ".avi", ".webm", ".mkv"];
    const isVideo = videoExtensions.some((ext) =>
      mediaPath.toLowerCase().includes(ext),
    );

    return isVideo ? "video" : "image";
  };

  // Get first media item and construct full URL
  const firstMedia = mediaFiles && mediaFiles.length > 0 ? mediaFiles[0] : null;

  // Construct full URL using API base URL
  const getFullMediaUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    // Replace backslashes with forward slashes and construct full URL
    const cleanPath = path.replace(/\\/g, "/");
    return `${process.env.REACT_APP_API_BASE_URL}/${cleanPath}`;
  };

  const mediaUrl = firstMedia ? getFullMediaUrl(firstMedia) : null;
  const mediaType = firstMedia ? getMediaType(firstMedia) : null;

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  // Handle toggle availability
  const handleToggleAvailability = async (e) => {
    e.stopPropagation();

    try {
      setIsToggling(true);

      const newAvailability = !showAvailability;
      setShowAvailability(newAvailability);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("city", city);
      formData.append("area", area);
      formData.append("price", price);
      formData.append("description", apartment.description || "");
      formData.append("bedrooms", bedrooms);
      formData.append("bathrooms", apartment.bathrooms || 1);
      formData.append("maxGuests", maxGuests);
      formData.append("contact", apartment.contact || "");

      if (apartment.amenities) {
        if (Array.isArray(apartment.amenities)) {
          apartment.amenities.forEach((amenity, index) => {
            formData.append(`amenities[${index}]`, amenity);
          });
        } else if (typeof apartment.amenities === "string") {
          const amenitiesArray = apartment.amenities
            .split(",")
            .map((item) => item.trim());
          amenitiesArray.forEach((amenity, index) => {
            formData.append(`amenities[${index}]`, amenity);
          });
        }
      }

      formData.append("isAvailable", newAvailability);

      await updateApartment(_id, formData);

      if (onToggle) {
        onToggle(_id, newAvailability);
      }
    } catch (error) {
      setShowAvailability(showAvailability);
      console.error("Failed to toggle availability:", error);
      toast.error("Failed to update availability. Please try again.");
    } finally {
      setIsToggling(false);
    }
  };

  // Handle delete click
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteApartment(_id);

      setShowDeleteModal(false);

      if (onDelete) {
        onDelete(_id);
      }
    } catch (error) {
      console.error("Failed to delete apartment:", error);
      toast.error("Failed to delete apartment. Please try again.");
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  // Render media content
  const renderMedia = () => {
    if (!mediaUrl || imageError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#2C2C2C] text-text-secondary">
          <FaImage className="text-3xl mb-2 opacity-50" />
          <span className="text-sm">No Image</span>
        </div>
      );
    }

    if (mediaType === "video") {
      return (
        <div className="relative w-full h-full bg-black">
          <video
            src={mediaUrl}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            poster="/video-placeholder.jpg"
            onError={(e) => {
              console.log("Video failed to load:", mediaUrl);
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `
            <div class="w-full h-full flex flex-col items-center justify-center bg-[#2C2C2C]">
              <FaVideo class="text-3xl text-text-secondary mb-2 opacity-30" />
              <span class="text-xs text-text-secondary">Video unavailable</span>
            </div>
          `;
            }}
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 p-1.5 rounded-full">
            <FaVideo className="text-white text-xs" />
          </div>
          {/* Add play button indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-black bg-opacity-50 rounded-full p-3">
              <FaPlay className="text-white text-lg" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <img
        src={mediaUrl}
        alt={name}
        className="w-full h-full object-cover"
        onError={handleImageError}
        loading="lazy"
      />
    );
  };

  // Count different media types
  const mediaCount = {
    images: mediaFiles.filter((m) => {
      const videoExts = [".mp4", ".mov", ".avi", ".webm", ".mkv"];
      return !videoExts.some((ext) => m.toLowerCase().includes(ext));
    }).length,
    videos: mediaFiles.filter((m) => {
      const videoExts = [".mp4", ".mov", ".avi", ".webm", ".mkv"];
      return videoExts.some((ext) => m.toLowerCase().includes(ext));
    }).length,
  };

  return (
    <>
      <div className="bg-[#383838] rounded-xl overflow-hidden shadow-lg card-hover h-full flex flex-col">
        {/* Image Section */}
        <div className="h-44 bg-[#2C2C2C] relative overflow-hidden">
          {renderMedia()}

          {/* Media count badge */}
          {mediaFiles.length > 0 && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1.5">
              {mediaCount.images > 0 && (
                <span className="flex items-center gap-1">
                  <FaImage size={10} /> {mediaCount.images}
                </span>
              )}
              {mediaCount.videos > 0 && (
                <span className="flex items-center gap-1 ml-1 pl-1 border-l border-white/30">
                  <FaVideo size={10} /> {mediaCount.videos}
                </span>
              )}
            </div>
          )}

          {/* Availability Badge */}
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${
              showAvailability ? "bg-[#4A7C59]" : "bg-red-600"
            } text-white`}
          >
            {showAvailability ? "Available" : "Unavailable"}
          </div>

          {/* Inquiries Badge */}
          {inquiryCount > 0 && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
              <span>📋</span>
              {inquiryCount} {inquiryCount === 1 ? "inquiry" : "inquiries"}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col">
          <h3
            className="text-lg font-bold text-white mb-1 line-clamp-1"
            title={name}
          >
            {name}
          </h3>

          <p
            className="text-sm text-text-secondary mb-3 line-clamp-1"
            title={`${city}, ${area}`}
          >
            {city}, {area}
          </p>

          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-1 text-sm">
              <FaDollarSign className="text-[#4A7C59]" />
              <span className="font-bold text-[#4A7C59]">{price}</span>
              <span className="text-text-secondary">/night</span>
            </div>

            <div className="flex items-center gap-1 text-text-secondary text-sm">
              <FaBed />
              <span>
                {bedrooms} {bedrooms === 1 ? "bed" : "beds"}
              </span>
            </div>

            <div className="flex items-center gap-1 text-text-secondary text-sm">
              <FaUser />
              <span>Max {maxGuests}</span>
            </div>
          </div>

          {/* Action Buttons - UPDATED with Preview button */}
          <div className="grid grid-cols-4 gap-2 mt-auto border-t border-[#2C2C2C] pt-4">
            {/* Preview Button - NEW */}
            <button
              className="flex items-center justify-center px-2 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setShowPreview(true)}
              disabled={isToggling || isDeleting}
              title="Preview Apartment"
            >
              <FaEye />
            </button>

            {/* Edit Button */}
            <button
              className="flex items-center justify-center px-2 py-2 bg-[#4A7C59] text-white rounded-md text-sm hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleEditClick}
              disabled={isToggling || isDeleting}
              title="Edit Apartment"
            >
              <FaEdit />
            </button>

            {/* Delete Button */}
            <button
              className="flex items-center justify-center px-2 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDeleteClick}
              disabled={isToggling || isDeleting}
              title="Delete Apartment"
            >
              <FaTrash />
            </button>

            {/* Toggle Availability Button */}
            <button
              className={`flex items-center justify-center px-2 py-2 rounded-md text-sm transition-colors ${
                showAvailability
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#4A7C59] hover:bg-opacity-90"
              } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleToggleAvailability}
              disabled={isToggling || isDeleting}
              title={
                showAvailability ? "Mark as Unavailable" : "Mark as Available"
              }
            >
              {isToggling ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPowerOff />
              )}
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCancelDelete}
          >
            <div
              className="bg-[#383838] rounded-lg p-6 max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-white mb-4">
                Confirm Delete
              </h3>
              <p className="text-text-secondary mb-6">
                Are you sure you want to delete "{name}"? This action cannot be
                undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  className="px-4 py-2 bg-[#4A7C59] text-white rounded-md hover:bg-opacity-90 transition-colors"
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash />
                  )}
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <ApartmentPreviewModal
          apartment={apartment}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export default ApartmentCard;
