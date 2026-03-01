// src/shared/pages/NotFoundPage.jsx
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  const location = useLocation();
  const isOperatorRoute = location.pathname.startsWith("/operator");

  // Operator theme (dark)
  if (isOperatorRoute) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center p-4">
        <div className="text-center max-w-md animate-fadeIn">
          <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/operator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-green 
                       text-white rounded-lg transition-all duration-200
                       hover:bg-opacity-90 hover:scale-105 active:scale-95
                       shadow-sm hover:shadow-md group"
          >
            <FaArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Client theme (light)
  return (
    <div className="min-h-screen bg-client-bg flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center max-w-md animate-fadeIn">
          <FaExclamationTriangle className="text-6xl text-client-rose mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl font-bold text-client-accent-green mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-client-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-client-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-client-accent-green 
                       text-white rounded-lg transition-all duration-200
                       hover:bg-opacity-90 hover:scale-105 active:scale-95
                       shadow-sm hover:shadow-md group"
          >
            <FaHome className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
