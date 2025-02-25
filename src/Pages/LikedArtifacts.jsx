import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import AllArifactCard from "../components/AllArifactCard";
import { Player } from "@lottiefiles/react-lottie-player";
import noDataAnimation from "../assets/Animation - nodata.json";
import { toast } from "react-toastify";

const LikedArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      try {
        if (!user?.uid) {
          return;
        }

        const response = await fetch(
          `https://historical-artifacts-tracker-serversite.vercel.app/liked-artifacts/${user.uid}`
        );
        const data = await response.json();

        if (response.ok) {
          setLikedArtifacts(Array.isArray(data) ? data : []);
        } else {
          throw new Error(data.error || "Failed to fetch liked artifacts");
        }
      } catch (error) {
        console.error("Error fetching liked artifacts:", error);
        toast.error("Failed to fetch your liked artifacts");
        setLikedArtifacts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchLikedArtifacts();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#5EE9B4]"></span>
      </div>
    );
  }

  if (!Array.isArray(likedArtifacts) || likedArtifacts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4">
        <Player autoplay loop src={noDataAnimation} className="h-64 w-64" />
        <h2 className="text-2xl font-bold text-[#5EE9B4] text-center">
          No Liked Artifacts Yet!
        </h2>
        <p className="text-gray-600 text-center max-w-md">
          Explore our collection and like the artifacts that interest you. They
          will appear here for easy access.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-[#5EE9B4] mb-8">
        Your Liked Artifacts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedArtifacts.map((artifact) => (
          <AllArifactCard key={artifact._id} artifact={artifact} />
        ))}
      </div>
    </div>
  );
};

export default LikedArtifacts;
