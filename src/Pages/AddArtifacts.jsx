import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Animation-one.json";
import AuthContext from "../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const AddArtifacts = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (formData) => {
    if (!user) {
      toast.error("Login required");
      return;
    }

    setIsSubmitting(true);
    try {
      const artifactData = {
        ...formData,
        addedBy: {
          name: user.displayName || "Anonymous",
          email: user.email,
          uid: user.uid,
        },
      };

      const response = await fetch("http://localhost:20112/artifacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artifactData),
      });

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        throw new Error(text.slice(0, 100));
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add artifact");
      }

      toast.success("Artifact added!");
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.message.includes("<!DOCTYPE")
          ? "Server error: Received invalid response"
          : error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-lg p-6 md:p-8 lg:p-10">
          <div className="mb-8 flex flex-col items-center lg:flex-row justify-center gap-3">
            <h1 className="text-3xl font-bold text-[#5EE9B4]">
              Add New Artifact
            </h1>
            <Player
              autoplay
              loop
              src={animationData}
              className="h-20 md:h-36 mt-4"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="form-control">
                <label className="label pl-0 mb-1">
                  <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                    Artifact Name*
                  </span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                />
                {errors.name && (
                  <span className="text-error text-sm mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Image URL Field */}
              <div className="form-control">
                <label className="label pl-0 mb-1">
                  <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                    Image URL*
                  </span>
                </label>
                <input
                  type="url"
                  {...register("image", {
                    required: "Image URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message:
                        "Must be a valid URL starting with http:// or https://",
                    },
                  })}
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                />
                {errors.image && (
                  <span className="text-error text-sm mt-1 block">
                    {errors.image.message}
                  </span>
                )}
              </div>
            </div>

            {/* Type Select Field */}
            <div className="form-control">
              <label className="label pl-0 mb-1">
                <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                  Artifact Type*
                </span>
              </label>
              <select
                {...register("type", { required: "Type is required" })}
                className="select select-bordered w-full focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Type</option>
                {artifactTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <span className="text-error text-sm mt-1 block">
                  {errors.type.message}
                </span>
              )}
            </div>

            {/* Historical Context Field */}
            <div className="form-control">
              <label className="label pl-0 mb-1">
                <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                  Historical Context*
                </span>
              </label>
              <textarea
                {...register("historicalContext", {
                  required: "Historical context is required",
                })}
                className="textarea textarea-bordered h-32 focus:ring-2 focus:ring-primary"
                placeholder="Describe the historical significance and background..."
              ></textarea>
              {errors.historicalContext && (
                <span className="text-error text-sm mt-1 block">
                  {errors.historicalContext.message}
                </span>
              )}
            </div>

            {/* Created At & Discovered At */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label pl-0 mb-1">
                  <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                    Created At*
                  </span>
                </label>
                <input
                  type="text"
                  {...register("createdAt", {
                    required: "Creation date is required",
                  })}
                  placeholder="e.g., 100 BC"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                />
                {errors.createdAt && (
                  <span className="text-error text-sm mt-1 block">
                    {errors.createdAt.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label pl-0 mb-1">
                  <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                    Discovered At*
                  </span>
                </label>
                <input
                  type="text"
                  {...register("discoveredAt", {
                    required: "Discovery date is required",
                  })}
                  placeholder="e.g., 1799"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                />
                {errors.discoveredAt && (
                  <span className="text-error text-sm mt-1 block">
                    {errors.discoveredAt.message}
                  </span>
                )}
              </div>
            </div>

            {/* Discovered By & Present Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label pl-0 mb-1">
                  <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                    Discovered By*
                  </span>
                </label>
                <input
                  type="text"
                  {...register("discoveredBy", {
                    required: "Discoverer is required",
                  })}
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                />
                {errors.discoveredBy && (
                  <span className="text-error text-sm mt-1 block">
                    {errors.discoveredBy.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label pl-0 mb-1">
                  <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                    Present Location*
                  </span>
                </label>
                <input
                  type="text"
                  {...register("presentLocation", {
                    required: "Location is required",
                  })}
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                />
                {errors.presentLocation && (
                  <span className="text-error text-sm mt-1 block">
                    {errors.presentLocation.message}
                  </span>
                )}
              </div>
            </div>

            {/* Added By & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label pl-0 mb-1">
                  <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                    Added By
                  </span>
                </label>
                <input
                  type="text"
                  value={user?.displayName || "Anonymous"}
                  readOnly
                  className="input input-bordered bg-base-200 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label pl-0 mb-1">
                  <span className="label-text text-lg font-semibold text-[#5EE9B4]">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered bg-base-200 w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10">
              <button
                type="submit"
                className="btn w-full text-lg h-14 bg-[#5EE9B4] hover:bg-[#4CD89F] text-white border-none transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Adding...
                  </>
                ) : (
                  "Add Artifact"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArtifacts;
