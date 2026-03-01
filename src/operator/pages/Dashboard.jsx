// src/operator/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { getApartments, getInquiries } from "../../services/api";
import ApartmentCard from "../components/ApartmentCard";
import DashboardSkeleton from "../components/DashboardSkeleton";

const Dashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inquiries, setInquiries] = useState([]);

  // SINGLE useEffect to fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both apartments and inquiries in parallel
        const [apartmentsData, inquiriesData] = await Promise.all([
          getApartments(),
          getInquiries(),
        ]);

        console.log("🔍 Apartments:", apartmentsData);
        console.log("🔍 Inquiries:", inquiriesData);

        setApartments(apartmentsData);
        setInquiries(inquiriesData);
        setError(null);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error("❌ Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array

  // Handle toggle availability
  const handleToggleAvailability = (id, newAvailability) => {
    setApartments((prevApartments) =>
      prevApartments.map((apt) =>
        apt._id === id ? { ...apt, isAvailable: newAvailability } : apt,
      ),
    );
  };

  // Handle delete apartment
  const handleDeleteApartment = (id) => {
    setApartments((prevApartments) =>
      prevApartments.filter((apartment) => apartment._id !== id),
    );
  };

  // Helper function to count inquiries per apartment
  const getInquiryCount = (apartmentId) => {
    return inquiries.filter((inquiry) => inquiry.apartmentId === apartmentId)
      .length;
  };

  return (
    <div className="min-h-screen bg-primary-dark p-5">
      {/* Simplified header - removed "Back to Dashboard" button */}
      <h1 className="text-2xl font-bold text-white mb-5">Apartment Listings</h1>

      {/* Loading State - Skeleton */}
      {loading && <DashboardSkeleton />}

      {/* Error State */}
      {error && (
        <div className="bg-[#383838] text-red-400 p-5 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Empty State - No Apartments */}
      {!loading && !error && apartments.length === 0 && (
        <div className="bg-[#383838] text-text-secondary p-10 rounded-lg text-center">
          No apartments found. Add your first apartment!
        </div>
      )}

      {/* Success State - Apartments Grid */}
      {!loading && !error && apartments.length > 0 && (
        <>
          <p className="text-text-secondary mb-5">
            Found {apartments.length}{" "}
            {apartments.length === 1 ? "apartment" : "apartments"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {apartments.map((apartment) => (
              <ApartmentCard
                key={apartment._id}
                apartment={apartment}
                onToggle={handleToggleAvailability}
                onDelete={handleDeleteApartment}
                inquiryCount={getInquiryCount(apartment._id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
