// ===========================================
// FILE: src/components/AmenitiesSelector.jsx
// PURPOSE: Multi-select checkbox grid for apartment amenities
// DEPENDS ON: FormCheckbox component
// ===========================================

import FormCheckbox from "./FormCheckbox";

// ===========================================
// CONSTANTS - Define available amenities
// ===========================================
const AMENITIES = [
  "Air Conditioning",
  "Art Studio",
  "Backyard",
  "Beach Access",
  "Concierge",
  "Courtyard",
  "Elevator",
  "Fire Pit",
  "Fireplace",
  "Game Drives",
  "Garden View",
  "Gym",
  "Hiking Trails",
  "Kitchen",
  "Lake View",
  "Laundry",
  "Mountain View",
  "Parking",
  "Playground",
  "Pool",
  "Private Beach Access",
  "Restaurant",
  "Rooftop Terrace",
  "Security",
  "Smart Home",
  "Spa",
  "Study Room",
  "TV",
  "WiFi",
  "Workspace",
];

// ===========================================
// PROPS:
// - selected: array of currently selected amenities
// - onChange: function to update selected amenities
// ===========================================
export default function AmenitiesSelector({ selected = [], onChange }) {
  // ===========================================
  // HANDLER: Toggle individual amenity
  // ===========================================
  const handleToggle = (amenity) => {
    if (selected.includes(amenity)) {
      // Remove if already selected
      onChange(selected.filter((item) => item !== amenity));
    } else {
      // Add if not selected
      onChange([...selected, amenity]);
    }
  };

  // ===========================================
  // HANDLER: Select all amenities
  // ===========================================
  const handleSelectAll = () => {
    if (selected.length === AMENITIES.length) {
      // If all selected, clear all
      onChange([]);
    } else {
      // Otherwise select all
      onChange([...AMENITIES]);
    }
  };

  // ===========================================
  // RENDER COMPONENT
  // ===========================================
  return (
    <div className="space-y-4">
      {/* Header with count and select all */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white font-medium">Amenities</h3>
          <p className="text-sm text-gray-400">
            {selected.length} of {AMENITIES.length} selected
          </p>
        </div>

        {/* Select All / Clear All button */}
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-sm text-[#4A7C59] hover:text-opacity-80 transition"
        >
          {selected.length === AMENITIES.length ? "Clear All" : "Select All"}
        </button>
      </div>

      {/* Amenities grid - responsive: 2 cols on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2 bg-[#2C2C2C] rounded-lg">
        {AMENITIES.map((amenity) => (
          <FormCheckbox
            key={amenity}
            label={amenity}
            checked={selected.includes(amenity)}
            onChange={() => handleToggle(amenity)}
            className="text-sm" // Smaller text for grid
          />
        ))}
      </div>

      {/* Optional: Search/filter (future enhancement) */}
      {/* <div className="mt-2">
        <input
          type="text"
          placeholder="Search amenities..."
          className="w-full bg-[#2C2C2C] text-white rounded-lg px-3 py-1 text-sm"
        />
      </div> */}
    </div>
  );
}
