import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllArifactCard = ({ artifact }) => {
  const { _id, name, image, type, historicalContext } = artifact;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-4 pt-4">
        <img
          src={image}
          alt={name}
          className="rounded-xl h-64 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[#5EE9B4]">{name}</h2>
        <p className="text-gray-500 font-medium">Type: {type}</p>
        <p className="text-gray-600 line-clamp-2">{historicalContext}</p>
        <div className="card-actions justify-end mt-4">
          <Link to={`/artifact/${_id}`}>
            <button className="btn bg-[#5EE9B4] hover:bg-[#4CD89F] text-white border-none">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

AllArifactCard.propTypes = {
  artifact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    historicalContext: PropTypes.string.isRequired,
  }).isRequired,
};

export default AllArifactCard;
