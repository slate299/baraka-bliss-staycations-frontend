// src/client/components/filters/MobileFilterDrawer.jsx
import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaFilter, FaTimes } from "react-icons/fa";
import FiltersPanel from "./FiltersPanel";

const MobileFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearAll,
  activeFilterCount,
}) => {
  const closeButtonRef = useRef(null);

  // Focus trap when drawer opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50 lg:hidden">
        {/* Background overlay */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Drawer panel */}
        <Transition.Child
          as={Fragment}
          enter="transition-transform ease-out duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform ease-in duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <Dialog.Panel className="fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto bg-client-card rounded-t-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-client-card border-b border-client-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaFilter
                  className="text-client-text-secondary"
                  aria-hidden="true"
                />
                <Dialog.Title className="font-semibold text-client-text-primary">
                  Filters
                </Dialog.Title>
                {activeFilterCount > 0 && (
                  <span
                    className="bg-client-rose-DEFAULT text-white text-xs px-2 py-1 rounded-full"
                    aria-label={`${activeFilterCount} filters active`}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-3 hover:bg-client-bg rounded-lg transition-colors
                           min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close filters panel"
              >
                <FaTimes
                  className="text-client-text-secondary"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Filters Content */}
            <div className="p-4">
              <FiltersPanel
                filters={filters}
                onFilterChange={onFilterChange}
                onClearAll={onClearAll}
                activeFilterCount={activeFilterCount}
                isMobile={true}
              />
            </div>

            {/* Apply Button */}
            <div className="sticky bottom-0 bg-client-card border-t border-client-border p-4">
              <button
                onClick={onClose}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClose();
                  }
                }}
                className="w-full bg-client-rose-DEFAULT text-white rounded-lg
                           font-medium transition-all duration-200
                           hover:bg-client-rose-dark 
                           focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-client-rose-DEFAULT
                           min-h-[48px] px-4 py-3"
                aria-label="Apply filters and close"
              >
                Apply Filters
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MobileFilterDrawer;
