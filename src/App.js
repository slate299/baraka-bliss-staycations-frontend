// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// Admin imports
import Dashboard from "./operator/pages/Dashboard";
import EditApartment from "./operator/pages/EditApartment";
import AddApartment from "./operator/pages/AddApartment";
import Inquiries from "./operator/pages/Inquiries";
import Sidebar from "./operator/components/Sidebar";

// Client imports - FIXED
import HomePage from "./client/pages/HomePage"; // New homepage (to be created)
import ListingsPage from "./client/pages/ListingsPage"; // Renamed from HomePage
import ApartmentDetailPage from "./client/pages/ApartmentDetailPage";
import ContactPage from "./client/pages/ContactPage";
import ErrorBoundary from "./client/components/common/ErrorBoundary";
import PageTransition from "./client/components/common/PageTransition";

// Shared imports
import NotFoundPage from "./shared/pages/NotFoundPage";

// Create a wrapper component that uses useLocation
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          // Success toast - using client-green
          success: {
            duration: 4000,
            style: {
              background: "#4A7C59", // client-green
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#4A7C59",
            },
          },
          // Error toast - using client-error
          error: {
            duration: 5000,
            style: {
              background: "#ef4444", // client-error
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#ef4444",
            },
          },
          // Info toast - using blue (not in theme, but common)
          info: {
            duration: 3000,
            style: {
              background: "#3b82f6",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#3b82f6",
            },
          },
          // Default toast - using client-text-primary dark gray
          blank: {
            duration: 3000,
            style: {
              background: "#111827", // client-text-primary
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
          },
        }}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Admin routes with sidebar */}
          <Route
            path="/operator/*"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-1 md:ml-64 min-h-screen bg-primary-dark">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add" element={<AddApartment />} />
                    <Route path="/edit/:id" element={<EditApartment />} />
                    <Route path="/inquiries" element={<Inquiries />} />
                    {/* Operator 404 - uses shared NotFound with operator theme */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </div>
              </div>
            }
          />

          {/* Client routes with page transitions - FIXED */}
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <PageTransition>
                  <HomePage /> {/* New marketing homepage */}
                </PageTransition>
              </ErrorBoundary>
            }
          />
          <Route
            path="/contact"
            element={
              <ErrorBoundary>
                <PageTransition>
                  <ContactPage /> {/* New contact page */}
                </PageTransition>
              </ErrorBoundary>
            }
          />
          <Route
            path="/apartments"
            element={
              <ErrorBoundary>
                <PageTransition>
                  <ListingsPage /> {/* Listings page with filters */}
                </PageTransition>
              </ErrorBoundary>
            }
          />
          <Route
            path="/apartment/:id"
            element={
              <ErrorBoundary>
                <PageTransition>
                  <ApartmentDetailPage />
                </PageTransition>
              </ErrorBoundary>
            }
          />

          {/* 404 route - catches all non-operator paths */}
          <Route
            path="*"
            element={
              <ErrorBoundary>
                <PageTransition>
                  <NotFoundPage />
                </PageTransition>
              </ErrorBoundary>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
