import { useState } from "react";
import AllArifactCard from "../components/AllArifactCard";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const AllArtifacts = () => {
  const initialArtifacts = useLoaderData();
  const [artifacts, setArtifacts] = useState(initialArtifacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Search function
  const handleSearch = async () => {
    try {
      setLoading(true);

      // If search is empty, reset to initial artifacts
      if (!searchTerm.trim()) {
        setArtifacts(initialArtifacts);
        return;
      }

      // Encode the search term to handle special characters
      const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
      console.log("Searching for:", encodedSearchTerm);

      const response = await fetch(
        `http://localhost:20112/artifacts/search?name=${encodedSearchTerm}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to search artifacts");
      }

      console.log("Search results:", data);
      setArtifacts(data);

      if (data.length === 0) {
        toast.info("No artifacts found matching your search.");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error.message || "Failed to search artifacts");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Add a reset function
  const handleReset = () => {
    setSearchTerm("");
    setArtifacts(initialArtifacts);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Search Section */}
      <div className="mb-12">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-[#5EE9B4]">
            {searchTerm ? "Search Results" : "All Artifacts"}
          </h1>
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="join flex-1">
                <input
                  type="text"
                  placeholder="Search artifacts by name..."
                  className="input input-bordered join-item w-full focus:outline-none focus:border-[#5EE9B4]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="btn join-item bg-[#5EE9B4] hover:bg-[#4CD89F] text-white border-none px-6"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {searchTerm && (
                <button
                  className="btn bg-gray-500 hover:bg-gray-600 text-white border-none px-6"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifacts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No artifacts found matching your search.
          </div>
        ) : (
          artifacts.map((artifact) => (
            <AllArifactCard key={artifact._id} artifact={artifact} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllArtifacts;
