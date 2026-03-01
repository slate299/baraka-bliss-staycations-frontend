// src/client/components/common/ErrorBoundary.jsx
import { Component } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-client-bg flex items-center justify-center p-4">
          <div className="text-center animate-fadeIn">
            <FaExclamationTriangle className="text-5xl text-red-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-client-text-primary mb-2">
              Something went wrong
            </h2>
            <p className="text-client-text-secondary mb-4">
              Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-client-accent-green text-white rounded-lg 
                         transition-all duration-200
                         hover:bg-opacity-90 hover:scale-105 active:scale-95"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
