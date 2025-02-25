import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Slide from "../components/Slide";

const Home = () => {
  const [topArtifacts, setTopArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopArtifacts = async () => {
      try {
        const response = await fetch(
          "https://historical-artifacts-tracker-serversite.vercel.app/artifacts/top-liked"
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch top artifacts");
        }

        setTopArtifacts(data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch top artifacts");
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtifacts();
  }, []);

  // Categories data
  const categories = [
    {
      name: "Tools",
      icon: "🛠️",
      description: "Ancient tools that shaped civilizations",
      color: "bg-blue-100",
    },
    {
      name: "Weapons",
      icon: "⚔️",
      description: "Historical weapons and warfare artifacts",
      color: "bg-red-100",
    },
    {
      name: "Documents",
      icon: "📜",
      description: "Ancient scrolls and important papers",
      color: "bg-yellow-100",
    },
    {
      name: "Writings",
      icon: "✍️",
      description: "Historical texts and inscriptions",
      color: "bg-green-100",
    },
  ];

  // Timeline data
  const timelineEvents = [
    {
      era: "Ancient Era",
      period: "3000 BC - 500 BC",
      description: "The rise of early civilizations and empires",
      image: "https://i.ibb.co.com/zWg1K5F1/images-6.jpg",
    },
    {
      era: "Classical Era",
      period: "500 BC - 500 AD",
      description: "Greek and Roman civilizations flourished",
      image: "https://i.ibb.co.com/p6GxCVvh/images-7.jpg",
    },
    {
      era: "Medieval Era",
      period: "500 AD - 1500 AD",
      description: "The age of kingdoms and castles",
      image: "https://i.ibb.co.com/hR9R99kH/Getty-Images-113636392-e04b686.jpg",
    },
  ];

  return (
    <div>
      {/* Slider Section */}
      <Slide />

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore by <span className="text-[#5EE9B4]">Categories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`${category.color} p-6 h-full`}>
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#5EE9B4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Artifacts Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[#5EE9B4] mb-8">
            Most Popular Artifacts
          </h2>

          {loading ? (
            <div className="min-h-[40vh] flex justify-center items-center">
              <span className="loading loading-spinner loading-lg text-[#5EE9B4]"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topArtifacts.map((artifact) => (
                <div
                  key={artifact._id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <figure className="relative pt-[60%]">
                    <img
                      src={artifact.image}
                      alt={artifact.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-xl font-bold">
                      {artifact.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {artifact.historicalContext}
                    </p>
                    <div className="flex items-center gap-2 text-[#5EE9B4]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span className="font-semibold">{artifact.likes}</span>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/artifacts/${artifact._id}`}
                        className="btn bg-[#5EE9B4] hover:bg-[#4CD89F] text-white border-none"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* See All Button */}
          <div className="flex justify-center mt-8">
            <Link
              to="/AllArtifacts"
              className="btn btn-lg bg-[#5EE9B4] hover:bg-[#4CD89F] text-white border-none"
            >
              See All Artifacts
            </Link>
          </div>
        </div>
      </div>

      {/* Historical Timeline Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Journey Through <span className="text-[#5EE9B4]">Time</span>
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#5EE9B4] opacity-20"></div>

            {/* Timeline events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.era}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } gap-8`}
                >
                  <div className="w-1/2">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                      <img
                        src={event.image}
                        alt={event.era}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{event.era}</h3>
                        <div className="text-sm text-[#5EE9B4] font-semibold mb-3">
                          {event.period}
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 relative">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#5EE9B4] rounded-full shadow-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* See All Button  */}
      <div className="flex justify-center py-8">
        <Link
          to="/AllArtifacts"
          className="btn btn-lg bg-[#5EE9B4] hover:bg-[#4CD89F] text-white border-none"
        >
          Explore All Artifacts
        </Link>
      </div>
    </div>
  );
};

export default Home;
