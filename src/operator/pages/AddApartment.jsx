// src/operator/pages/AddApartment.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import FormCheckbox from "../components/FormCheckbox";
import MediaUploader from "../components/MediaUploader";
import { createApartment } from "../../services/api";
import ConfirmationModal from "../../shared/components/ConfirmationModal";

export default function AddApartment() {
  const navigate = useNavigate();

  const AMENITIES = [
    "Air Conditioning",
    "Art Studio",
    "Backyard",
    "Beach Access",
    "Concierge",
    "Courtyard",
    "Elevator",
    "Fire Pit",
    "Fireplace",
    "Game Drives",
    "Garden View",
    "Gym",
    "Hiking Trails",
    "Kitchen",
    "Lake View",
    "Laundry",
    "Mountain View",
    "Parking",
    "Playground",
    "Pool",
    "Private Beach Access",
    "Restaurant",
    "Rooftop Terrace",
    "Security",
    "Smart Home",
    "Spa",
    "Study Room",
    "TV",
    "WiFi",
    "Workspace",
  ];

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    area: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    description: "",
    contact: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // 👇 NEW: State for cancel modal
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    const isFormEmpty =
      Object.values(formData).every((val) => val === "") &&
      selectedAmenities.length === 0 &&
      mediaFiles.length === 0;
    setHasUnsavedChanges(!isFormEmpty);
  }, [formData, selectedAmenities, mediaFiles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Apartment name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.maxGuests) newErrors.maxGuests = "Max guests is required";

    if (formData.price && parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (formData.maxGuests && parseInt(formData.maxGuests) < 1) {
      newErrors.maxGuests = "Max guests must be at least 1";
    }
    if (formData.bedrooms && parseInt(formData.bedrooms) < 0) {
      newErrors.bedrooms = "Bedrooms cannot be negative";
    }
    if (formData.bathrooms && parseFloat(formData.bathrooms) < 0) {
      newErrors.bathrooms = "Bathrooms cannot be negative";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting");
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementsByName(firstErrorField)[0]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      submitData.append("amenities", JSON.stringify(selectedAmenities));

      mediaFiles.forEach((file) => {
        submitData.append("mediaFiles", file); // Match your schema field name
      });

      //Debug Code
      console.log("📤 SENDING DATA TO BACKEND:");
      for (let pair of submitData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await createApartment(submitData);

      toast.success("Apartment added successfully!");
      setHasUnsavedChanges(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add apartment");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated - navigate to dashboard
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowCancelModal(true);
    } else {
      navigate("/");
    }
  };

  // 👇 NEW: Confirm leave
  const handleConfirmLeave = () => {
    setShowCancelModal(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#2C2C2C] p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Simplified header - no back button */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Add New Apartment
          </h1>
          {hasUnsavedChanges && (
            <span className="inline-flex mt-2 text-yellow-500 text-sm bg-yellow-500 bg-opacity-10 px-3 py-2 rounded-lg animate-pulse items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Unsaved changes
            </span>
          )}
        </div>

        <div className="bg-[#383838] rounded-lg shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormInput
                  label="Apartment Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Luxury Beach View"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <FormInput
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Dubai"
                  required
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <FormInput
                label="Area/District"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g., Jumeirah"
              />

              <div>
                <FormInput
                  label="Price per Night ($)"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <FormInput
                  label="Bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="0"
                />
                {errors.bedrooms && (
                  <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>
                )}
              </div>

              <div>
                <FormInput
                  label="Bathrooms"
                  name="bathrooms"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="0"
                />
                {errors.bathrooms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bathrooms}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormInput
                  label="Max Guests"
                  name="maxGuests"
                  type="number"
                  min="1"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  placeholder="1"
                  required
                />
                {errors.maxGuests && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.maxGuests}
                  </p>
                )}
              </div>
              <div className="hidden md:block"></div>
            </div>

            {/* Add this after the Max Guests field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormInput
                  label="Contact Number"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="e.g., +254 123 456 789"
                  required
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
              </div>
              <div className="hidden md:block"></div>
            </div>

            <div className="pt-2">
              <FormTextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the apartment..."
                rows="4"
              />
            </div>

            <div className="border-t border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">Amenities</h3>
                <span className="text-sm text-gray-400">
                  {selectedAmenities.length} selected
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {AMENITIES.map((amenity) => (
                  <FormCheckbox
                    key={amenity}
                    label={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-white font-medium mb-4">Photos & Videos</h3>
              <MediaUploader files={mediaFiles} onFilesChange={setMediaFiles} />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg transition-all duration-300 hover:bg-gray-700 hover:scale-105 active:scale-95 hover:shadow-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-[#4A7C59] text-white rounded-lg transition-all duration-300 ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-opacity-80 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-[#4A7C59]/20"
                } flex items-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  "Add Apartment"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmLeave}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave? All changes will be lost."
        confirmText="Leave"
        cancelText="Stay"
        type="warning"
      />
    </div>
  );
}
