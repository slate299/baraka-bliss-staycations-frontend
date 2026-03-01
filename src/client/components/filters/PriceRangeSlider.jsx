// src/client/components/filters/PriceRangeSlider.jsx
import { useState, useEffect } from "react";

const PriceRangeSlider = ({ min, max, value, onChange }) => {
  // Add safety checks for all props
  const safeMin = min ?? 0;
  const safeMax = max ?? 10000;
  const safeValue = value ?? { min: safeMin, max: safeMax };

  const [localMin, setLocalMin] = useState(safeValue.min ?? safeMin);
  const [localMax, setLocalMax] = useState(safeValue.max ?? safeMax);

  // Update local state when props change
  useEffect(() => {
    if (value) {
      setLocalMin(value.min ?? safeMin);
      setLocalMax(value.max ?? safeMax);
    }
  }, [value?.min, value?.max, safeMin, safeMax]);

  // Format price for display
  const formatPrice = (price) => {
    return `KSh ${price?.toLocaleString() ?? 0}`;
  };

  // Handle min input change
  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), localMax - 1);
    setLocalMin(newMin);
    onChange({ min: newMin, max: localMax });
  };

  // Handle max input change
  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), localMin + 1);
    setLocalMax(newMax);
    onChange({ min: localMin, max: newMax });
  };

  // Handle slider change (both thumbs)
  const handleSliderChange = (e) => {
    const isMin = e.target.name === "min";
    const newValue = Number(e.target.value);

    if (isMin) {
      if (newValue <= localMax - 1) {
        setLocalMin(newValue);
        onChange({ min: newValue, max: localMax });
      }
    } else {
      if (newValue >= localMin + 1) {
        setLocalMax(newValue);
        onChange({ min: localMin, max: newValue });
      }
    }
  };

  // Calculate percentage for slider backgrounds - with bounds checking
  const getMinPercent = () => {
    const totalRange = safeMax - safeMin;
    if (totalRange <= 0) return 0;

    // Clamp the value between min and max
    const clampedMin = Math.max(safeMin, Math.min(safeMax, localMin));
    const percent = ((clampedMin - safeMin) / totalRange) * 100;

    // Ensure percent is between 0 and 100
    return Math.max(0, Math.min(100, percent));
  };

  const getMaxPercent = () => {
    const totalRange = safeMax - safeMin;
    if (totalRange <= 0) return 100;

    // Clamp the value between min and max
    const clampedMax = Math.max(safeMin, Math.min(safeMax, localMax));
    const percent = ((clampedMax - safeMin) / totalRange) * 100;

    // Ensure percent is between 0 and 100
    return Math.max(0, Math.min(100, percent));
  };

  const minPercent = getMinPercent();
  const maxPercent = getMaxPercent();
  const rangeWidth = maxPercent - minPercent;

  return (
    <div className="w-full space-y-4">
      {/* Price Display */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-client-text-secondary">Min</span>
        <span className="font-medium text-client-text-primary">
          {formatPrice(localMin)}
        </span>
        <span className="text-client-text-secondary">Max</span>
        <span className="font-medium text-client-text-primary">
          {formatPrice(localMax)}
        </span>
      </div>

      {/* Dual Range Slider */}
      <div className="relative h-2 mx-6 group">
        {/* Track Background */}
        <div className="absolute inset-x-0 h-2 bg-client-border rounded-full" />

        {/* Selected Range Highlight */}
        <div
          className="absolute h-2 bg-client-rose rounded-full transition-all duration-200"
          style={{
            left: `${minPercent}%`,
            width: `${rangeWidth}%`,
          }}
        />

        {/* Min Slider Thumb - Hidden by default, visible on hover */}
        <input
          type="range"
          name="min"
          min={safeMin}
          max={safeMax}
          value={localMin}
          onChange={handleSliderChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-client-card
                     [&::-webkit-slider-thumb]:border-2
                     [&::-webkit-slider-thumb]:border-gray-300
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:pointer-events-auto
                     [&::-webkit-slider-thumb]:shadow-sm
                     [&::-webkit-slider-thumb]:opacity-0
                     [&::-webkit-slider-thumb]:group-hover:opacity-100
                     [&::-webkit-slider-thumb]:group-hover:border-client-rose
                     [&::-webkit-slider-thumb]:transition-all
                     [&::-webkit-slider-thumb]:duration-200
                     [&::-webkit-slider-thumb]:hover:scale-110
                     [&::-webkit-slider-thumb]:hover:border-client-rose
                     [&::-moz-range-thumb]:appearance-none
                     [&::-moz-range-thumb]:w-4
                     [&::-moz-range-thumb]:h-4
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-client-card
                     [&::-moz-range-thumb]:border-2
                     [&::-moz-range-thumb]:border-gray-300
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:pointer-events-auto
                     [&::-moz-range-thumb]:shadow-sm
                     [&::-moz-range-thumb]:opacity-0
                     [&::-moz-range-thumb]:group-hover:opacity-100
                     [&::-moz-range-thumb]:group-hover:border-client-rose
                     [&::-moz-range-thumb]:transition-all
                     [&::-moz-range-thumb]:duration-200
                     [&::-moz-range-thumb]:hover:scale-110
                     [&::-moz-range-thumb]:hover:border-client-rose"
        />

        {/* Max Slider Thumb - Hidden by default, visible on hover */}
        <input
          type="range"
          name="max"
          min={safeMin}
          max={safeMax}
          value={localMax}
          onChange={handleSliderChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-client-card
                     [&::-webkit-slider-thumb]:border-2
                     [&::-webkit-slider-thumb]:border-gray-300
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:pointer-events-auto
                     [&::-webkit-slider-thumb]:shadow-sm
                     [&::-webkit-slider-thumb]:opacity-0
                     [&::-webkit-slider-thumb]:group-hover:opacity-100
                     [&::-webkit-slider-thumb]:group-hover:border-client-rose
                     [&::-webkit-slider-thumb]:transition-all
                     [&::-webkit-slider-thumb]:duration-200
                     [&::-webkit-slider-thumb]:hover:scale-110
                     [&::-webkit-slider-thumb]:hover:border-client-rose
                     [&::-moz-range-thumb]:appearance-none
                     [&::-moz-range-thumb]:w-4
                     [&::-moz-range-thumb]:h-4
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-client-card
                     [&::-moz-range-thumb]:border-2
                     [&::-moz-range-thumb]:border-gray-300
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:pointer-events-auto
                     [&::-moz-range-thumb]:shadow-sm
                     [&::-moz-range-thumb]:opacity-0
                     [&::-moz-range-thumb]:group-hover:opacity-100
                     [&::-moz-range-thumb]:group-hover:border-client-rose
                     [&::-moz-range-thumb]:transition-all
                     [&::-moz-range-thumb]:duration-200
                     [&::-moz-range-thumb]:hover:scale-110
                     [&::-moz-range-thumb]:hover:border-client-rose"
        />
      </div>

      {/* Input Fields */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="number"
            value={localMin}
            onChange={handleMinChange}
            min={safeMin}
            max={localMax - 1}
            className="w-full px-3 py-2 border border-client-border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-client-rose/50
                       text-client-text-primary text-sm
                       transition-all duration-200
                       hover:border-client-rose/50"
          />
        </div>
        <span className="text-client-text-secondary">—</span>
        <div className="flex-1">
          <input
            type="number"
            value={localMax}
            onChange={handleMaxChange}
            min={localMin + 1}
            max={safeMax}
            className="w-full px-3 py-2 border border-client-border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-client-rose/50
                       text-client-text-primary text-sm
                       transition-all duration-200
                       hover:border-client-rose/50"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
