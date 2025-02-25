import { Link, NavLink } from "react-router-dom";
import logoImage from "../assets/artifacts-5968600-4998913.webp"
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const {user, signOut}= useContext(AuthContext)
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogOut = () => {
    signOut()
    .then(() => {
      toast.success("Logout successful", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light"
      });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light"
      });
    })
  }

  const Links = <>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/AllArtifacts"}>All Artifacts</NavLink></li>
    <li><NavLink to={"/AddArtifacts"}>Add Artifacts</NavLink></li>
  </>

  return (
    <div className="navbar bg-base-100 w-11/12 mx-auto ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {Links}
          </ul>
        </div>
          <div className="flex items-center justify-center gap-1 btn btn-ghost ">
          <img className="w-10 h-10 object-cover" src={logoImage} alt="" />
          <Link to={"/"} className=" text-lg font-semibold hidden lg:block">Historical Artifacts</Link>
          </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {Links}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="relative">
              <div 
                className="cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-emerald-500">
                    <img 
                      src={user.photoURL || "https://i.ibb.co/G2jbP4K/default-avatar.png"}
                      alt="User profile"
                      title={user.displayName || "User"}
                    />
                  </div>
                </div>
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-semibold">{user.displayName || "User"}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/my-artifacts"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Artifacts
                  </Link>
                  <Link
                    to="/liked-artifacts"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Liked Artifacts
                  </Link>
                </div>
              )}
            </div>
            <button className="btn px-4 py-3 text-white bg-gradient-to-t from-emerald-300 to-emerald-300" onClick={handleLogOut}>
              LogOut
            </button>
          </div>
        ) : (
          <button className="btn px-4 py-3 text-white bg-gradient-to-t from-emerald-300 to-emerald-300">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
      <ToastContainer limit={1} />
    </div>
  );
};

export default Navbar;