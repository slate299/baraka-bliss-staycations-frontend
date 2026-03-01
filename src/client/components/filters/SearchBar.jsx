// src/client/components/filters/SearchBar.jsx
import { useState, useEffect, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { debounce } from "../../utils/filterUtils";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search apartments by name, city, or area...",
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Update local state when prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      onChange(searchTerm);
    }, 500),
    [onChange],
  );

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedSearch(newValue);
  };

  // Handle clear button
  const handleClear = () => {
    setInputValue("");
    onChange("");
  };

  // Handle keyboard Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onChange(inputValue); // Immediate search on Enter
    }
  };

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch
          className="text-client-text-secondary text-sm"
          aria-hidden="true"
        />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-14 py-3 border border-client-border rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-client-rose/50 
                   bg-client-card text-client-text-primary placeholder-client-text-secondary/50
                   transition-shadow duration-200 min-h-[44px]"
        aria-label="Search apartments"
      />

      {/* Clear Button (only show when there's text) */}
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center 
                     text-client-text-secondary hover:text-client-text-primary 
                     transition-all duration-200 hover:scale-110 active:scale-95
                     min-h-[44px] min-w-[44px] justify-center"
          aria-label="Clear search"
        >
          <FaTimes className="text-sm" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
