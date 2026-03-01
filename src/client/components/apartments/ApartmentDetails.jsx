// src/client/components/apartments/ApartmentDetails.jsx
import {
  FaBed,
  FaBath,
  FaUser,
  FaDollarSign,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ApartmentDetails = ({ apartment }) => {
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
  } = apartment;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-bold text-client-text-primary mb-2">
          {name}
        </h1>
        <div className="flex items-center gap-2 text-client-text-secondary">
          <FaMapMarkerAlt className="text-client-accent-green transition-transform hover:scale-110" />
          <span>
            {city}, {area}
          </span>
        </div>
      </div>

      {/* Price Card */}
      <div
        className="bg-client-accent-green/10 rounded-lg p-4 border border-client-accent-green/20
              animate-slideIn hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <span className="text-client-text-secondary">Price per night</span>
          <div className="flex items-center gap-1 group">
            <FaDollarSign
              className="text-client-accent-green text-xl 
                             transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="text-3xl font-bold text-client-accent-green
                     transition-all duration-300 group-hover:text-client-rose"
            >
              {price?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Key Details Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="bg-client-card rounded-lg p-4 text-center border border-client-border
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-md
                  hover:border-client-accent-green/50 group"
        >
          <FaBed
            className="text-2xl text-client-accent-green mx-auto mb-2
                     transition-transform duration-300 group-hover:scale-110"
          />
          <div className="font-semibold text-client-text-primary">
            {bedrooms} {bedrooms === 1 ? "Bedroom" : "Bedrooms"}
          </div>
        </div>

        <div
          className="bg-client-card rounded-lg p-4 text-center border border-client-border
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-md
                  hover:border-client-accent-green/50 group"
        >
          <FaBath
            className="text-2xl text-client-accent-green mx-auto mb-2
                      transition-transform duration-300 group-hover:scale-110"
          />
          <div className="font-semibold text-client-text-primary">
            {bathrooms} {bathrooms === 1 ? "Bathroom" : "Bathrooms"}
          </div>
        </div>

        <div
          className="bg-client-card rounded-lg p-4 text-center border border-client-border
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-md
                  hover:border-client-accent-green/50 group"
        >
          <FaUser
            className="text-2xl text-client-accent-green mx-auto mb-2
                      transition-transform duration-300 group-hover:scale-110"
          />
          <div className="font-semibold text-client-text-primary">
            Max {maxGuests} {maxGuests === 1 ? "Guest" : "Guests"}
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div
          className="bg-client-card rounded-lg p-6 border border-client-border
                  animate-fadeIn transition-all duration-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-client-text-primary mb-4">
            About this stay
          </h2>
          <p className="text-client-text-secondary leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        </div>
      )}

      {/* Amenities */}
      {amenities.length > 0 && (
        <div
          className="bg-client-card rounded-lg p-6 border border-client-border
                  animate-slideIn"
        >
          <h2 className="text-xl font-semibold text-client-text-primary mb-4">
            Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-client-text-secondary
                     transition-all duration-200 hover:translate-x-1
                     hover:text-client-text-primary group"
              >
                <span
                  className="w-2 h-2 bg-client-accent-green rounded-full
                         transition-transform duration-300 group-hover:scale-125"
                ></span>
                {amenity}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentDetails;
