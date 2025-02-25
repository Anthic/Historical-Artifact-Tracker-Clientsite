import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext/AuthContext";

const ArtifactDetails = () => {
  const artifact = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(artifact.likes || 0);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like artifacts");
      navigate("/login");
      return;
    }

    try {
      setIsLiking(true);
      const response = await fetch(
        `https://historical-artifacts-tracker-serversite.vercel.app/artifacts/${artifact._id}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.uid }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLikeCount(data.likes);
        toast.success("Artifact liked successfully!");
      } else {
        throw new Error(data.error || "Failed to like artifact");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden">
        <img
          src={artifact.image}
          alt={artifact.name}
          className="w-full h-full object-cover"
        />

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#5EE9B4]">
              {artifact.name}
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                disabled={isLiking}
                className="btn bg-[#5EE9B4] hover:bg-[#4CD89F] text-white border-none"
              >
                {isLiking ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Like"
                )}
              </button>
              <span className="text-lg font-semibold">{likeCount} likes</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Type" value={artifact.type} />
            <DetailItem label="Created At" value={artifact.createdAt} />
            <DetailItem label="Discovered At" value={artifact.discoveredAt} />
            <DetailItem label="Discovered By" value={artifact.discoveredBy} />
            <DetailItem
              label="Present Location"
              value={artifact.presentLocation}
            />
            <DetailItem label="Added By" value={artifact.addedBy?.name} />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-[#5EE9B4] mb-2">
              Historical Context
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {artifact.historicalContext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <span className="font-semibold text-[#5EE9B4]">{label}: </span>
    <span className="text-gray-600">{value}</span>
  </div>
);

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ArtifactDetails;
