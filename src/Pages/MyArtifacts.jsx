import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Player } from "@lottiefiles/react-lottie-player";
import noDataAnimation from "../assets/Animation - nodata.json";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext/AuthContext";

const MyArtifacts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const artifactTypes = [
    "Tools",
    "Weapons",
    "Documents",
    "Writings",
    "Artwork",
    "Ceremonial Objects",
    "Architecture",
    "Coins",
    "Clothing",
  ];

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        if (!user?.uid) {
          return;
        }

        const response = await fetch(
          `https://historical-artifacts-tracker-serversite.vercel.app/my-artifacts/${user.uid}`
        );
        const data = await response.json();

        if (response.ok) {
          setArtifacts(Array.isArray(data) ? data : []);
        } else {
          throw new Error(data.error || "Failed to fetch artifacts");
        }
      } catch (error) {
        console.error("Error fetching artifacts:", error);
        toast.error("Failed to fetch your artifacts");
        setArtifacts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchArtifacts();
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData(e.target);
      const updateData = Object.fromEntries(formData.entries());

      const response = await fetch(
        `https://historical-artifacts-tracker-serversite.vercel.app/artifacts/${selectedArtifact._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...updateData, userId: user.uid }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setArtifacts(
          artifacts.map((art) =>
            art._id === selectedArtifact._id ? data : art
          )
        );
        document.getElementById("update-modal").close();
        toast.success("Artifact updated successfully!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (artifactId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5EE9B4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://historical-artifacts-tracker-serversite.vercel.app/artifacts/${artifactId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.uid }),
          }
        );

        if (response.ok) {
          setArtifacts(artifacts.filter((art) => art._id !== artifactId));
          toast.success("Artifact deleted successfully!");
          navigate("/AllArtifacts");
        } else {
          const data = await response.json();
          throw new Error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#5EE9B4]"></span>
      </div>
    );
  }

  if (artifacts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4">
        <Player autoplay loop src={noDataAnimation} className="h-64 w-64" />
        <h2 className="text-2xl font-bold text-[#5EE9B4] text-center">
          No Artifacts Added Yet!
        </h2>
        <p className="text-gray-600 text-center max-w-md">
          Start adding your artifacts to build your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-[#5EE9B4] mb-8">
        My Artifacts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifacts.map((artifact) => (
          <div key={artifact._id} className="card bg-base-100 shadow-xl">
            <figure className="px-4 pt-4">
              <img
                src={artifact.image}
                alt={artifact.name}
                className="rounded-xl h-64 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-[#5EE9B4]">{artifact.name}</h2>
              <p className="text-gray-500 font-medium">Type: {artifact.type}</p>
              <p className="text-gray-600 line-clamp-2">
                {artifact.historicalContext}
              </p>
              <div className="card-actions justify-end mt-4 gap-2">
                <button
                  onClick={() => {
                    setSelectedArtifact(artifact);
                    document.getElementById("update-modal").showModal();
                  }}
                  className="btn bg-[#5EE9B4] hover:bg-[#4CD89F] text-white border-none"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(artifact._id)}
                  className="btn bg-red-500 hover:bg-red-600 text-white border-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      <dialog id="update-modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {selectedArtifact && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <h3 className="font-bold text-lg text-[#5EE9B4] mb-4">
                Update Artifact
              </h3>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Artifact Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedArtifact.name}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Image URL</span>
                </label>
                <input
                  type="url"
                  name="image"
                  defaultValue={selectedArtifact.image}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Type</span>
                </label>
                <select
                  name="type"
                  defaultValue={selectedArtifact.type}
                  className="select select-bordered"
                  required
                >
                  {artifactTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Historical Context
                  </span>
                </label>
                <textarea
                  name="historicalContext"
                  defaultValue={selectedArtifact.historicalContext}
                  className="textarea textarea-bordered h-24"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Created At</span>
                  </label>
                  <input
                    type="text"
                    name="createdAt"
                    defaultValue={selectedArtifact.createdAt}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Discovered At
                    </span>
                  </label>
                  <input
                    type="text"
                    name="discoveredAt"
                    defaultValue={selectedArtifact.discoveredAt}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Discovered By
                    </span>
                  </label>
                  <input
                    type="text"
                    name="discoveredBy"
                    defaultValue={selectedArtifact.discoveredBy}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Present Location
                    </span>
                  </label>
                  <input
                    type="text"
                    name="presentLocation"
                    defaultValue={selectedArtifact.presentLocation}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <div className="modal-action">
                <button
                  type="submit"
                  className="btn bg-[#5EE9B4] hover:bg-[#4CD89F] text-white border-none"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Update Artifact"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyArtifacts;
