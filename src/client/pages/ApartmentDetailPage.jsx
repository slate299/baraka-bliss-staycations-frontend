// src/client/pages/ApartmentDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ApartmentGallery from "../components/apartments/ApartmentGallery";
import ApartmentDetails from "../components/apartments/ApartmentDetails";
import ApartmentDetailSkeleton from "../components/apartments/ApartmentDetailSkeleton";
import InquiryForm from "../components/apartments/InquiryForm";
import { getPublicApartmentById } from "../../services/clientApi";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/errorHandler";

const ApartmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPublicApartmentById(id);
        setApartment(response.data);
      } catch (err) {
        const errorInfo = handleApiError(err, {
          notFound: "Apartment not found or no longer available",
        });
        setError(errorInfo.message);
        // Redirect to home after 3 seconds
        setTimeout(() => navigate("/"), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id, navigate]);

  const handleInquirySuccess = () => {
    toast.success("Inquiry sent successfully! We'll get back to you soon.");
  };

  if (loading) {
    return <ApartmentDetailSkeleton />;
  }

  if (error || !apartment) {
    return (
      <div className="min-h-screen bg-client-bg flex flex-col">
        <Navbar />
        <main
          id="main-content"
          className="flex-1 container mx-auto px-4 py-8"
          aria-label="Error page"
        >
          <div className="text-center py-12 animate-fadeIn">
            <p className="text-client-text-secondary mb-4">
              {error || "Apartment not found"}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-client-accent-green text-white rounded-lg 
                         transition-all duration-200
                         hover:bg-opacity-90 hover:scale-105 active:scale-95
                         inline-flex items-center gap-2 group"
              aria-label="Return to home page"
            >
              <FaArrowLeft
                className="transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-client-bg flex flex-col">
      <Navbar />

      <main
        id="main-content"
        className="flex-1 container mx-auto px-4 py-8"
        aria-label="Apartment details"
        aria-describedby={apartment ? "apartment-name" : undefined}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-client-text-secondary 
                     transition-all duration-200 hover:text-client-accent-green 
                     hover:scale-105 active:scale-95 group"
          aria-label="Go back to previous page"
        >
          <FaArrowLeft
            className="transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8 animate-fadeIn">
          {/* Left Column - Gallery and Details */}
          <div className="lg:col-span-2 space-y-8">
            <section aria-label="Apartment photo gallery">
              <ApartmentGallery
                mediaFiles={apartment.mediaFiles}
                name={apartment.name}
              />
            </section>

            <section aria-label="Apartment information">
              <ApartmentDetails apartment={apartment} />
            </section>
          </div>

          {/* Right Column - Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <section aria-label="Inquiry form">
                <InquiryForm
                  apartmentId={apartment._id}
                  onSuccess={handleInquirySuccess}
                />
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApartmentDetailPage;
