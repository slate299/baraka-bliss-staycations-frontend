// src/components/ExportButtonWithOptions.jsx
import React, { useState } from "react";
import {
  FaDownload,
  FaSpinner,
  FaFileCsv,
  FaCheckCircle,
  FaCog,
} from "react-icons/fa";
import toast from "react-hot-toast";

const ExportButtonWithOptions = ({
  allInquiries,
  filteredInquiries,
  apartments,
  apartmentMap,
}) => {
  const [exporting, setExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [exportType, setExportType] = useState("filtered"); // "filtered" or "all"
  const [showSuccess, setShowSuccess] = useState(false);

  const getApartmentDetails = (inquiry) => {
    if (!inquiry.apartmentId)
      return { name: "Unknown", city: "", area: "", price: "" };

    if (typeof inquiry.apartmentId === "object") {
      return {
        name: inquiry.apartmentId.name || "Unknown",
        city: inquiry.apartmentId.city || "",
        area: inquiry.apartmentId.area || "",
        price: inquiry.apartmentId.price || "",
      };
    }

    const apartment = apartmentMap[inquiry.apartmentId];
    return {
      name: apartment?.name || "Unknown",
      city: apartment?.city || "",
      area: apartment?.area || "",
      price: apartment?.price || "",
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(",", "");
  };

  const convertToCSV = (data) => {
    const headers = [
      "ID",
      "Guest Name",
      "Email",
      "Message",
      "Apartment ID",
      "Apartment Name",
      "Apartment City",
      "Apartment Area",
      "Apartment Price",
      "Received Date",
      "Last Updated",
    ];

    const rows = data.map((inquiry) => {
      const aptDetails = getApartmentDetails(inquiry);
      return [
        `"${inquiry._id || ""}"`,
        `"${inquiry.name || ""}"`,
        `"${inquiry.email || ""}"`,
        `"${(inquiry.message || "").replace(/"/g, '""')}"`,
        `"${typeof inquiry.apartmentId === "object" ? inquiry.apartmentId._id : inquiry.apartmentId || ""}"`,
        `"${aptDetails.name}"`,
        `"${aptDetails.city}"`,
        `"${aptDetails.area}"`,
        `"${aptDetails.price}"`,
        `"${formatDate(inquiry.createdAt)}"`,
        `"${formatDate(inquiry.updatedAt)}"`,
      ].join(",");
    });

    return [headers.join(","), ...rows].join("\n");
  };

  const handleExport = () => {
    try {
      setExporting(true);
      setShowOptions(false);

      const dataToExport =
        exportType === "filtered" ? filteredInquiries : allInquiries;
      const count = dataToExport.length;

      if (count === 0) {
        toast.error("No inquiries to export");
        setExporting(false);
        return;
      }

      const csvContent = convertToCSV(dataToExport);

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      const date = new Date().toISOString().split("T")[0];
      const typeLabel = exportType === "filtered" ? "filtered" : "all";
      link.setAttribute("href", url);
      link.setAttribute("download", `inquiries_${typeLabel}_${date}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowSuccess(true);
      toast.success(`Exported ${count} inquiries successfully!`);

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export inquiries");
    } finally {
      setExporting(false);
    }
  };

  const hasData =
    exportType === "filtered"
      ? filteredInquiries.length > 0
      : allInquiries.length > 0;

  return (
    <div className="relative">
      <div className="flex">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="px-3 py-2 bg-[#383838] text-white rounded-l-lg hover:bg-[#404040] transition-colors border-r border-[#2C2C2C]"
          title="Export options"
          disabled={exporting}
        >
          <FaCog className={exporting ? "animate-spin" : ""} />
        </button>

        <button
          onClick={handleExport}
          disabled={exporting || !hasData}
          className={`px-4 py-2 rounded-r-lg transition-all duration-300 flex items-center gap-2 ${
            !hasData
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : showSuccess
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#4A7C59] hover:bg-opacity-80"
          } text-white`}
        >
          {exporting ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Exporting...</span>
            </>
          ) : showSuccess ? (
            <>
              <FaCheckCircle />
              <span>Exported!</span>
            </>
          ) : (
            <>
              <FaDownload />
              <span className="hidden sm:inline">
                Export {exportType === "filtered" ? "Filtered" : "All"}
              </span>
              <FaFileCsv className="sm:hidden" />
            </>
          )}
        </button>
      </div>

      {/* Options dropdown */}
      {showOptions && (
        <div className="absolute right-0 mt-2 w-56 bg-[#383838] rounded-lg shadow-xl z-10 border border-[#2C2C2C]">
          <div className="p-2">
            <button
              onClick={() => {
                setExportType("filtered");
                setShowOptions(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center ${
                exportType === "filtered"
                  ? "bg-[#4A7C59] text-white"
                  : "text-text-secondary hover:bg-[#2C2C2C] hover:text-white"
              }`}
            >
              <span>Filtered Results</span>
              <span className="text-sm bg-black bg-opacity-20 px-2 py-1 rounded">
                {filteredInquiries.length}
              </span>
            </button>
            <button
              onClick={() => {
                setExportType("all");
                setShowOptions(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center mt-1 ${
                exportType === "all"
                  ? "bg-[#4A7C59] text-white"
                  : "text-text-secondary hover:bg-[#2C2C2C] hover:text-white"
              }`}
            >
              <span>All Inquiries</span>
              <span className="text-sm bg-black bg-opacity-20 px-2 py-1 rounded">
                {allInquiries.length}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButtonWithOptions;
