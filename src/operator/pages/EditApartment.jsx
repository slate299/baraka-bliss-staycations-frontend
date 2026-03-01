// src/operator/pages/EditApartment.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApartmentById, updateApartment } from "../../services/api";
import { FaSpinner, FaSave, FaTimes, FaUpload, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

// Import our new components
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import FormCheckbox from "../components/FormCheckbox";
import MediaGallery from "../components/MediaGallery";
import ConfirmationModal from "../../shared/components/ConfirmationModal";
import AmenitiesSelector from "../components/AmenitiesSelector";

const EditApartment = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mediaToRemove, setMediaToRemove] = useState([]); // Track media to delete
  const [newMediaFiles, setNewMediaFiles] = useState([]); // Track new files to upload
  const [newMediaPreviews, setNewMediaPreviews] = useState([]); // Preview URLs for new files
  const [selectedNewFiles, setSelectedNewFiles] = useState([]); // Track which new files are selected for upload
  const navigate = useNavigate(); // Add this for redirect
  const [saving, setSaving] = useState(false); // Track save loading state
  const [mediaOperationLoading, setMediaOperationLoading] = useState(false);
  const [saveError, setSaveError] = useState(null); // Track save errors
  const [showMediaDeleteModal, setShowMediaDeleteModal] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    area: "",
    price: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    contact: "",
    amenities: [],
    isAvailable: true,
  });

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true);
        const data = await getApartmentById(id);
        setApartment(data);

        // 👇 ADD THIS CONSOLE.LOG RIGHT HERE
        console.log("📸 Media files structure:", data.mediaFiles);
        // Log first item to see its structure
        if (data.mediaFiles && data.mediaFiles.length > 0) {
          console.log("📸 First media item:", data.mediaFiles[0]);
        }
        // 👆 END OF ADDED CODE

        setFormData({
          name: data.name || "",
          city: data.city || "",
          area: data.area || "",
          price: data.price || "",
          description: data.description || "",
          bedrooms: data.bedrooms || "",
          bathrooms: data.bathrooms || "",
          maxGuests: data.maxGuests || "",
          contact: data.contact || "",
          amenities: data.amenities || [],
          isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching apartment:", err);
        setError("Failed to load apartment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApartment();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenitiesChange = (e) => {
    const amenitiesString = e.target.value;
    const amenitiesArray = amenitiesString
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    setFormData((prev) => ({
      ...prev,
      amenities: amenitiesArray,
    }));
  };

  // Handle media removal - UPDATED WITH LOADING STATE
  const handleRemoveMedia = (index, mediaItem) => {
    setMediaToDelete({ index, mediaItem });
    setShowMediaDeleteModal(true);
  };

  const confirmRemoveMedia = async () => {
    if (!mediaToDelete) return;

    try {
      setMediaOperationLoading(true);

      const { index, mediaItem } = mediaToDelete;

      console.log("🗑️ Removing media at index:", index, "item:", mediaItem);

      let removalIdentifier;

      if (typeof mediaItem === "string") {
        removalIdentifier = mediaItem;
      } else if (mediaItem._id) {
        removalIdentifier = {
          id: mediaItem._id,
          path: mediaItem.url || mediaItem.path,
        };
      } else {
        removalIdentifier = mediaItem;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      setMediaToRemove((prev) => [...prev, removalIdentifier]);

      setApartment((prev) => ({
        ...prev,
        mediaFiles: prev.mediaFiles.filter((_, i) => i !== index),
      }));

      setShowMediaDeleteModal(false);
      setMediaToDelete(null);
      toast.success("Media file removed successfully");
    } finally {
      setMediaOperationLoading(false);
    }
  };

  // Handle toggling new file selection
  const handleToggleNewFile = (index) => {
    setSelectedNewFiles((prev) => {
      if (prev.includes(index)) {
        // If already selected, remove it
        return prev.filter((i) => i !== index);
      } else {
        // If not selected, add it
        return [...prev, index];
      }
    });
  };

  // Handle new media selection - UPDATE THIS FUNCTION
  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files);
    const currentLength = newMediaFiles.length;

    setNewMediaFiles((prev) => [...prev, ...files]);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewMediaPreviews((prev) => [...prev, ...previews]);

    // Auto-select the new files by default
    const newIndices = files.map((_, i) => currentLength + i);
    setSelectedNewFiles((prev) => [...prev, ...newIndices]);
  };

  // Handle removing a preview before upload - UPDATE THIS FUNCTION
  const handleRemovePreview = (indexToRemove) => {
    // Revoke the object URL to prevent memory leak
    URL.revokeObjectURL(newMediaPreviews[indexToRemove]);

    // Remove from previews
    setNewMediaPreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );

    // Remove from files
    setNewMediaFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );

    // Remove from selected files
    setSelectedNewFiles(
      (prev) =>
        prev
          .filter((i) => i !== indexToRemove) // Remove the deleted index
          .map((i) => (i > indexToRemove ? i - 1 : i)), // Shift indices after the deleted one
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setSaveError(null);

      // Create FormData object
      const submitData = new FormData();

      // Append all form fields
      submitData.append("name", formData.name);
      submitData.append("city", formData.city);
      submitData.append("area", formData.area);
      submitData.append("price", formData.price);
      submitData.append("description", formData.description);
      submitData.append("bedrooms", formData.bedrooms);
      submitData.append("bathrooms", formData.bathrooms);
      submitData.append("maxGuests", formData.maxGuests);
      submitData.append("contact", formData.contact);
      submitData.append("isAvailable", formData.isAvailable);

      // Handle amenities array
      if (formData.amenities && formData.amenities.length > 0) {
        formData.amenities.forEach((amenity, index) => {
          submitData.append(`amenities[${index}]`, amenity);
        });
      }

      // Handle media to remove - send as JSON string
      if (mediaToRemove.length > 0) {
        // If media files have IDs or URLs, send them to backend for deletion
        submitData.append("mediaToRemove", JSON.stringify(mediaToRemove));
      }

      // Handle new media files
      // Handle new media files - only upload selected ones
      if (selectedNewFiles.length > 0) {
        selectedNewFiles.forEach((fileIndex) => {
          submitData.append("mediaFiles", newMediaFiles[fileIndex]);
        });
      }

      // Debug: Log FormData contents
      console.log("Submitting FormData:");
      for (let pair of submitData.entries()) {
        if (pair[0] === "mediaFiles") {
          console.log(`  - ${pair[0]}: [File: ${pair[1].name}]`);
        } else {
          console.log(`  - ${pair[0]}: ${pair[1]}`);
        }
      }

      // Send update request
      const updatedApartment = await updateApartment(id, submitData);
      console.log("Update successful:", updatedApartment);
      toast.success("Apartment updated successfully!");

      // Redirect to dashboard on success
      navigate("/");
    } catch (err) {
      console.error("Failed to update apartment:", err);
      setSaveError(
        err.response?.data?.message ||
          "Failed to update apartment. Please try again.",
      );
      toast.error(err.response?.data?.message || "Failed to update apartment");
    } finally {
      setSaving(false);
    }
  };

  // Warn user if they try to leave with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (newMediaFiles.length > 0 || mediaToRemove.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [newMediaFiles.length, mediaToRemove.length]);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      newMediaPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newMediaPreviews]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark p-5 flex justify-center items-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#4A7C59] mx-auto mb-4" />
          <p className="text-text-secondary">Loading apartment details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-primary-dark p-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#383838] text-red-400 p-5 rounded-lg text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (!apartment) {
    return (
      <div className="min-h-screen bg-primary-dark p-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#383838] text-text-secondary p-5 rounded-lg text-center">
            Apartment not found
          </div>
        </div>
      </div>
    );
  }

  // Success state - EDIT FORM with components
  return (
    <div className="min-h-screen bg-primary-dark p-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-5">Edit Apartment</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#383838] rounded-lg p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <FormInput
                label="Apartment Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Ocean View Suite"
                required
              />

              <FormInput
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g., Mombasa"
                required
              />

              <FormInput
                label="Area/Location"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="e.g., Nyali, Diani"
                required
              />

              <FormInput
                label="Price per Night (KES)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 5000"
                min="0"
                required
              />

              <FormInput
                label="Contact Number"
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="e.g., 0712345678"
                required
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <FormInput
                label="Bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleInputChange}
                placeholder="e.g., 3"
                min="0"
                required
              />

              <FormInput
                label="Bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleInputChange}
                placeholder="e.g., 2"
                min="0"
                step="0.5"
                required
              />

              <FormInput
                label="Maximum Guests"
                name="maxGuests"
                type="number"
                value={formData.maxGuests}
                onChange={handleInputChange}
                placeholder="e.g., 6"
                min="1"
                required
              />

              {/* Amenities Selector */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Amenities
                </label>
                <AmenitiesSelector
                  selected={formData.amenities || []}
                  onChange={(value) =>
                    setFormData({ ...formData, amenities: value })
                  }
                />
              </div>

              <FormCheckbox
                label="Available for booking"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Description Field - Full Width */}
          <FormTextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the apartment, its features, nearby attractions, etc."
            required
            rows={4}
          />

          {/* Media Gallery Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Media Files</h2>

            {/* Existing Media */}
            <div>
              <h3 className="text-white text-sm font-medium mb-3">
                Current Media
              </h3>
              <MediaGallery
                mediaFiles={apartment.mediaFiles || []}
                onRemove={handleRemoveMedia}
                isLoading={mediaOperationLoading}
              />
            </div>

            {/* New Media Upload */}
            <div>
              <h3 className="text-white text-sm font-medium mb-3">
                Add New Media
              </h3>
              <div className="bg-[#2C2C2C] rounded-lg p-6">
                {/* File Input - UPDATED WITH LOADING STATE */}
                <div className="flex items-center justify-center w-full">
                  <label
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      mediaOperationLoading
                        ? "border-gray-600 bg-gray-800 cursor-not-allowed"
                        : "border-gray-600 hover:border-[#4A7C59]"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {mediaOperationLoading ? (
                        <>
                          <FaSpinner className="animate-spin text-2xl text-text-secondary mb-2" />
                          <p className="text-sm text-text-secondary">
                            Processing...
                          </p>
                        </>
                      ) : (
                        <>
                          <FaUpload className="text-2xl text-text-secondary mb-2" />
                          <p className="text-sm text-text-secondary">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            PNG, JPG, MP4 (Max 5 files)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleMediaSelect}
                      disabled={mediaOperationLoading}
                    />
                  </label>
                </div>

                {/* New Media Previews with checkboxes - FIND AND REPLACE THIS SECTION */}
                {newMediaPreviews.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-white text-sm font-medium mb-2 flex items-center justify-between">
                      <span>
                        Select files to upload ({selectedNewFiles.length} of{" "}
                        {newMediaFiles.length} selected)
                      </span>
                      {newMediaFiles.length > 0 && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (
                                selectedNewFiles.length === newMediaFiles.length
                              ) {
                                setSelectedNewFiles([]); // Deselect all
                              } else {
                                setSelectedNewFiles(
                                  newMediaFiles.map((_, i) => i),
                                ); // Select all
                              }
                            }}
                            className="text-xs text-[#4A7C59] hover:text-[#5d9b6f] transition-colors"
                          >
                            {selectedNewFiles.length === newMediaFiles.length
                              ? "Deselect All"
                              : "Select All"}
                          </button>
                        </div>
                      )}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {newMediaPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="bg-[#2C2C2C] rounded-lg overflow-hidden aspect-square">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Checkbox to select/unselect - UPDATED WITH DISABLED STATE */}
                          <div className="absolute top-2 left-2">
                            <input
                              type="checkbox"
                              checked={selectedNewFiles.includes(index)}
                              onChange={() => handleToggleNewFile(index)}
                              disabled={mediaOperationLoading}
                              className="w-4 h-4 text-[#4A7C59] bg-[#2C2C2C] border-gray-600 rounded focus:ring-[#4A7C59] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </div>

                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => handleRemovePreview(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            title="Remove from upload list"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Debug info - remove later */}
            <div className="text-xs text-text-secondary">
              <p>Media to remove: {mediaToRemove.length} items</p>
              <p>
                New media: {newMediaFiles.length} files (
                {selectedNewFiles.length} selected for upload)
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#2C2C2C]">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-[#2C2C2C] text-white rounded-lg hover:bg-opacity-80 transition-colors flex items-center gap-2"
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#4A7C59] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
          {/* Save Error Message */}
          {saveError && (
            <div className="mt-4 p-3 bg-red-600 bg-opacity-20 border border-red-600 rounded-lg">
              <p className="text-red-400 text-sm">{saveError}</p>
            </div>
          )}

          {/* Global loading overlay - ADD THIS HERE */}
          {mediaOperationLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 pointer-events-none">
              <div className="bg-[#383838] rounded-lg p-4 flex items-center gap-3 pointer-events-auto">
                <FaSpinner className="animate-spin text-[#4A7C59] text-xl" />
                <span className="text-white">Processing media...</span>
              </div>
            </div>
          )}
        </form>

        {/* TODO: Remove debug section before production */}
        <div className="mt-6 p-4 bg-[#2C2C2C] rounded-lg">
          <h3 className="text-white font-medium mb-2">Form Data Debug:</h3>
          <pre className="text-text-secondary text-sm overflow-auto max-h-60">
            {JSON.stringify(
              {
                ...formData,
                mediaToRemove,
                newMediaFiles: newMediaFiles.length,
              },
              null,
              2,
            )}
          </pre>
        </div>
      </div>

      {/* Media Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showMediaDeleteModal}
        onClose={() => {
          setShowMediaDeleteModal(false);
          setMediaToDelete(null);
        }}
        onConfirm={confirmRemoveMedia}
        title="Delete Media"
        message="Are you sure you want to remove this media file? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default EditApartment;
