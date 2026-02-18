// src/pages/Dashboard.js

import { useEffect, useState } from "react";
import { getApartments } from "../services/api"; // import API function

// Dashboard Page (Phase 2: test API, Phase 3: full UI later)
function Dashboard() {
  // State to store apartments data
  const [apartments, setApartments] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);

  // Fetch apartments on page load
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await getApartments(); // call API
        console.log("Apartments fetched:", data); // debug in console
        setApartments(data); // store data in state
      } catch (error) {
        console.error("Failed to fetch apartments:", error);
      } finally {
        setLoading(false); // stop loading indicator
      }
    };

    fetchApartments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#FFFFFF" }}>Dashboard</h1>

      {/* Step 7: Basic UI / loading state */}
      {loading ? (
        <p style={{ color: "#B0B0B0" }}>Loading apartments...</p>
      ) : (
        apartments.map((apt) => (
          <div
            key={apt._id}
            style={{
              background: "#383838",
              color: "#FFFFFF",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "6px",
            }}
          >
            {apt.name} - {apt.city} ({apt.area})
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
