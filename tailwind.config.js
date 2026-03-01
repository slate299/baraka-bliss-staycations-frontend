// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Client theme - mix of grays and original accents
        client: {
          bg: "#f9fafb", // gray-50
          card: "#ffffff", // white
          border: "#e5e7eb", // gray-200
          text: {
            primary: "#111827", // gray-900
            secondary: "#6b7280", // gray-500
            tertiary: "#9ca3af", // gray-400
          },
          // Rose with contrast variants
          rose: {
            light: "#E9AFAF", // Original soft rose (for backgrounds)
            DEFAULT: "#C27C7C", // Darker rose for text (4.6:1 contrast)
            dark: "#9B5E5E", // Even darker for hover states
          },
          // Green with contrast variants
          green: {
            light: "#4A7C59", // Original leafy green
            DEFAULT: "#3A6245", // Darker green for better contrast
            dark: "#2A4832", // Even darker for hover
          },
          // Gold with contrast variants
          gold: {
            light: "#D4AF37", // Original soft gold
            DEFAULT: "#B88C1F", // Darker gold for text
            dark: "#8C6817", // Even darker for hover
          },
          // Keep these for compatibility
          accent: {
            light: "#f3f4f6",
            DEFAULT: "#9ca3af",
            dark: "#4b5563",
          },
          success: "#10b981",
          error: "#ef4444",
          warning: "#f59e0b",
        },
        // Keep admin theme as is
        primary: {
          dark: "#1a1a1a",
          green: "#4a7c59",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b0b0b0",
        },
      },
    },
  },
  plugins: [],
};
