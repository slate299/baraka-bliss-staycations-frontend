// src/components/MediaUploader.jsx
import { useState, useCallback } from "react";
import { FiUpload, FiX, FiImage, FiVideo, FiCheckCircle } from "react-icons/fi";

export default function MediaUploader({ files = [], onFilesChange }) {
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const generatePreviews = (newFiles) => {
    return Array.from(newFiles).map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
      name: file.name,
      size: file.size,
    }));
  };

  const handleFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    if (validFiles.length === 0) return;

    const newPreviews = generatePreviews(validFiles);
    setPreviews((prev) => [...prev, ...newPreviews]);
    onFilesChange([...files, ...validFiles]);

    // Show success animation
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 1500);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    URL.revokeObjectURL(previews[index].url);

    setPreviews(newPreviews);
    onFilesChange(newFiles);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [files],
  );

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer overflow-hidden
          ${
            isDragging
              ? "border-[#4A7C59] bg-[#4A7C59] bg-opacity-20 scale-105"
              : "border-gray-600 hover:border-[#4A7C59] hover:bg-[#2C2C2C] hover:scale-[1.02]"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("mediaInput").click()}
      >
        {/* Success animation overlay */}
        {uploadSuccess && (
          <div className="absolute inset-0 bg-[#4A7C59] bg-opacity-20 flex items-center justify-center animate-pulse">
            <FiCheckCircle className="text-[#4A7C59] text-5xl animate-bounce" />
          </div>
        )}

        <FiUpload
          className={`mx-auto text-5xl mb-4 transition-all duration-300 ${
            isDragging
              ? "text-[#4A7C59] transform -translate-y-2"
              : "text-gray-400"
          }`}
        />

        <p className="text-white font-medium text-lg">
          {isDragging ? "Release to upload" : "Drag & drop or click to upload"}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Supports images and videos (max 10 files)
        </p>

        <input
          id="mediaInput"
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative group animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Preview with hover effects */}
                <div className="aspect-square bg-[#2C2C2C] rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  {preview.type.startsWith("image/") ? (
                    <img
                      src={preview.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <video
                      src={preview.url}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Hover overlay with info */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-xl transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium truncate">
                      {preview.name}
                    </p>
                    <p className="text-gray-300 text-xs">
                      {formatFileSize(preview.size)}
                    </p>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 hover:rotate-90 shadow-lg"
                >
                  <FiX className="text-white text-sm" />
                </button>

                {/* File type badge */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-60 rounded-full px-2 py-1 backdrop-blur-sm">
                  {preview.type.startsWith("image/") ? (
                    <FiImage className="text-white text-xs" />
                  ) : (
                    <FiVideo className="text-white text-xs" />
                  )}
                </div>

                {/* Index number */}
                <div className="absolute top-2 right-2 bg-[#4A7C59] rounded-full w-5 h-5 flex items-center justify-center text-xs text-white font-medium">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* File count summary */}
          <div className="flex justify-between items-center bg-[#2C2C2C] rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#4A7C59] rounded-full animate-pulse"></div>
              <span className="text-gray-300">
                <span className="text-white font-medium">
                  {previews.length}
                </span>{" "}
                file(s) selected
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  previews.forEach((p) => URL.revokeObjectURL(p.url));
                  setPreviews([]);
                  onFilesChange([]);
                }}
                className="text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-105 flex items-center gap-1"
              >
                <FiX className="text-sm" />
                Remove all
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
