// src/client/components/apartments/ApartmentDetailSkeleton.jsx
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const ApartmentDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-client-bg flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button Skeleton */}
        <div className="mb-6 w-16 h-6 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Skeleton */}
            <div className="bg-client-card rounded-lg overflow-hidden">
              <div className="h-96 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>
              <div className="flex gap-2 p-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-gray-200 rounded-lg relative overflow-hidden"
                  >
                    <div className="absolute inset-0 animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Skeleton */}
            <div className="bg-client-card rounded-lg p-6 border border-client-border space-y-6">
              <div>
                <div className="h-8 w-3/4 bg-gray-200 rounded mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 animate-shimmer"></div>
                </div>
                <div className="h-4 w-1/2 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 animate-shimmer"></div>
                </div>
              </div>

              <div className="h-16 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-200 rounded-lg relative overflow-hidden"
                  >
                    <div className="absolute inset-0 animate-shimmer"></div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-full bg-gray-200 rounded relative overflow-hidden"
                  >
                    <div className="absolute inset-0 animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Inquiry Form Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-client-card rounded-xl border border-client-border p-6 sticky top-24 space-y-4">
              <div className="h-8 w-32 bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer"></div>
                  </div>
                  <div className="h-10 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer"></div>
                  </div>
                </div>
              ))}
              <div className="h-12 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApartmentDetailSkeleton;
