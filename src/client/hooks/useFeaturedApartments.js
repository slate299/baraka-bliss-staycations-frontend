// src/client/hooks/useFeaturedApartments.js
import { useState, useEffect } from "react";
import { getPublicApartments } from "../../services/clientApi";

const useFeaturedApartments = (limit = 4) => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // Get latest apartments (you can modify this logic based on your needs)
        // For now, we'll get the most recent ones or you can add a 'featured' flag later
        const response = await getPublicApartments({
          limit,
          sort: "-createdAt", // Get newest first
        });

        if (response.success) {
          setFeatured(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching featured apartments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [limit]);

  return { featured, loading, error };
};

export default useFeaturedApartments;
