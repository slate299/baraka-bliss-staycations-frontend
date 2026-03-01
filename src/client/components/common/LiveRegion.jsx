// src/client/components/common/LiveRegion.jsx
import { useEffect, useRef } from "react";

const LiveRegion = ({ message, assertive = false }) => {
  const regionRef = useRef(null);

  useEffect(() => {
    if (message && regionRef.current) {
      regionRef.current.textContent = message;

      // Clear after announcement (optional)
      const timer = setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = "";
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      ref={regionRef}
      role="status"
      aria-live={assertive ? "assertive" : "polite"}
      aria-atomic="true"
      className="sr-only" // Visually hidden but available to screen readers
    />
  );
};

export default LiveRegion;
