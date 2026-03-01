// src/client/components/apartments/ApartmentCard.jsx

import { Link } from "react-router-dom";
import {
  FaBed,
  FaUser,
  FaDollarSign,
  FaImage,
  FaVideo,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";
import LazyImage from "../common/LazyImage";
import toast from "react-hot-toast";

const ApartmentCard = ({ apartment }) => {
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
  } = apartment;

  // Get first media item
  const firstMedia = mediaFiles?.length > 0 ? mediaFiles[0] : null;

  // Construct full URL
  const getFullMediaUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const cleanPath = path.replace(/\\/g, "/");
    return `${process.env.REACT_APP_API_BASE_URL}/${cleanPath}`;
  };

  // Check if media is video
  const isVideo = (path) => {
    const videoExtensions = [".mp4", ".mov", ".avi", ".webm", ".mkv"];
    return videoExtensions.some((ext) => path?.toLowerCase().includes(ext));
  };

  const mediaUrl = firstMedia ? getFullMediaUrl(firstMedia) : null;
  const isVideoFile = firstMedia ? isVideo(firstMedia) : false;

  // Count media types
  const mediaCount = {
    images: mediaFiles.filter((m) => !isVideo(m)).length,
    videos: mediaFiles.filter((m) => isVideo(m)).length,
  };

  return (
    <Link
      to={`/apartment/${_id}`}
      className="block group"
      aria-label={`View details for ${name} in ${city}, ${area}. Price: KSh ${price.toLocaleString()} per night`}
    >
      <div
        className="bg-client-card rounded-xl overflow-hidden shadow-sm 
                    transition-all duration-300 ease-out
                    group-hover:shadow-xl group-hover:-translate-y-1
                    border border-client-border"
      >
        {/* Image Section */}
        <div className="relative h-48 bg-client-bg overflow-hidden">
          {/* Favorite/Wishlist Button */}
          <button
            className="absolute top-2 left-2 z-10 p-2 bg-white/80 backdrop-blur-sm
               rounded-full shadow-md opacity-0 group-hover:opacity-100
               transition-all duration-200 hover:scale-110 hover:bg-white
               focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
               text-gray-600 hover:text-client-rose-DEFAULT"
            aria-label={`Add ${name} to wishlist`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast.success("❤️ Wishlist coming soon!", {
                icon: "❤️",
                duration: 2000,
                style: {
                  background: "#4A7C59",
                  color: "#fff",
                },
              });
            }}
          >
            <FaHeart className="text-lg" aria-hidden="true" />
          </button>

          {!mediaUrl ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-client-bg">
              <FaImage
                className="text-4xl text-client-text-secondary opacity-30 mb-2"
                aria-hidden="true"
              />
              <span className="text-sm text-client-text-secondary">
                No image
              </span>
            </div>
          ) : isVideoFile ? (
            <div className="relative w-full h-full">
              <video
                src={mediaUrl}
                className="w-full h-full object-cover
                   transition-transform duration-500 ease-out
                   group-hover:scale-105"
                muted
                loop
                playsInline
                aria-label={`Video of ${name}`}
              />
              <div
                className="absolute top-2 left-2 bg-black bg-opacity-60 p-1.5 rounded-full
                    transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <FaVideo className="text-white text-xs" aria-hidden="true" />
              </div>
            </div>
          ) : (
            <LazyImage
              src={mediaUrl}
              alt={`Photo of ${name}`}
              className="group-hover:scale-105 transition-transform duration-500"
              placeholderClassName="bg-client-bg"
            />
          )}

          {/* Quick View Button */}
          <button
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10
               bg-black/70 text-white px-4 py-2 rounded-lg
               opacity-0 group-hover:opacity-100
               transition-all duration-200 hover:bg-black/80
               transform hover:scale-105 active:scale-95
               text-sm font-medium whitespace-nowrap
               focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast("Quick view coming soon!", {
                icon: "👀",
                duration: 2000,
                style: {
                  background: "#6b7280",
                  color: "#fff",
                },
              });
            }}
            aria-label={`Quick view of ${name}`}
          >
            Quick View
          </button>

          {/* Media count badge */}
          {mediaFiles.length > 0 && (
            <div
              className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white 
                  text-xs px-2 py-1 rounded-full flex items-center gap-1.5
                  transition-all duration-300 group-hover:bg-opacity-90
                  group-hover:scale-105"
              aria-label={`${mediaCount.images} images, ${mediaCount.videos} videos`}
            >
              {mediaCount.images > 0 && (
                <span className="flex items-center gap-1">
                  <FaImage size={10} aria-hidden="true" />
                  <span aria-hidden="true">{mediaCount.images}</span>
                  <span className="sr-only">{mediaCount.images} images</span>
                </span>
              )}
              {mediaCount.videos > 0 && (
                <span className="flex items-center gap-1 ml-1 pl-1 border-l border-white/30">
                  <FaVideo size={10} aria-hidden="true" />
                  <span aria-hidden="true">{mediaCount.videos}</span>
                  <span className="sr-only">{mediaCount.videos} videos</span>
                </span>
              )}
            </div>
          )}

          {/* Availability Badge */}
          <div
            className="absolute top-2 right-2 bg-client-green-DEFAULT text-white text-xs 
                px-2 py-1 rounded-full flex items-center gap-1
                transition-all duration-300 group-hover:scale-105
                group-hover:shadow-lg"
            aria-label="Available now"
          >
            <span
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              aria-hidden="true"
            ></span>
            Available
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3
            className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1
                       transition-colors duration-300
                       group-hover:text-client-rose-DEFAULT"
          >
            {name}
          </h3>

          <p
            className="text-sm text-gray-500 mb-3 line-clamp-1
                      transition-colors duration-300
                      group-hover:text-gray-700"
          >
            {city}, {area}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <FaDollarSign
                className="text-client-green-DEFAULT 
                             transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <span
                className="font-bold text-client-green-DEFAULT text-lg
                             transition-all duration-300
                             group-hover:text-client-rose-DEFAULT"
                aria-label={`Price: KSh ${price.toLocaleString()} per night`}
              >
                {price.toLocaleString()}
              </span>
              <span
                className="text-gray-500 text-sm
                             transition-colors duration-300
                             group-hover:text-gray-700"
                aria-hidden="true"
              >
                /night
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <div
                className="flex items-center gap-1 text-sm
                            transition-all duration-300
                            group-hover:text-client-rose-DEFAULT group-hover:scale-105"
                aria-label={`${bedrooms} bedroom${bedrooms !== 1 ? "s" : ""}`}
              >
                <FaBed
                  className="transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span aria-hidden="true">{bedrooms}</span>
              </div>
              <div
                className="flex items-center gap-1 text-sm
                            transition-all duration-300
                            group-hover:text-client-rose-DEFAULT group-hover:scale-105"
                aria-label={`Up to ${maxGuests} guest${maxGuests !== 1 ? "s" : ""}`}
              >
                <FaUser
                  className="transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span aria-hidden="true">{maxGuests}</span>
              </div>
            </div>
          </div>

          {/* View Details indicator - appears on hover */}
          <div className="mt-3 text-right">
            <span
              className="text-client-rose-DEFAULT text-xs font-medium
                           opacity-0 -translate-x-2
                           transition-all duration-300
                           group-hover:opacity-100 group-hover:translate-x-0
                           inline-flex items-center gap-1"
              aria-hidden="true"
            >
              View Details
              <span className="text-lg leading-none">→</span>
            </span>
            <span className="sr-only">Click to view full details</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
