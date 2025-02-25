import { Link, useLocation, useNavigate } from "react-router-dom";
import HistoricImage from "../assets/ancient-artifact-display-stockcake.jpg"
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    
    const handleFormData = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        signIn(data.email, data.password)
        .then(() => {
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light"
            });
            form.reset();
            navigate(from, { replace: true });
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
        });
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(() => {
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light"
            });
            navigate(from, { replace: true });
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
        });
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gradient-to-t from-green-100 to-emerald-200"
        >
            <motion.div 
                className="flex flex-col items-center justify-center py-5"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <motion.h1 
                    className="text-5xl font-bold"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    Login now!
                </motion.h1>
                <motion.p 
                    className="text-lg font-semibold text-gray-500 my-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Welcome to Historical Artifact Tracker. Please login to continue.
                </motion.p>
            </motion.div>
            <div className="hero w-11/12 mx-auto">
                <div className="hero-content flex-col lg:flex-row">
                    <motion.div 
                        className="card bg-base-100 w-full max-w-sm"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="card-body">
                            <form className="fieldset" onSubmit={handleFormData}>
                                <motion.div
                                    whileFocus={{ scale: 1.02 }}
                                    className="mb-4"
                                >
                                    <label className="fieldset-label text-md font-semibold">Email</label>
                                    <motion.input 
                                        whileFocus={{ scale: 1.02 }}
                                        type="email" 
                                        className="input" 
                                        placeholder="Email" 
                                        name="email"
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    whileFocus={{ scale: 1.02 }}
                                    className="mb-4"
                                >
                                    <label className="fieldset-label font-semibold text-md">Password</label>
                                    <motion.input 
                                        whileFocus={{ scale: 1.02 }}
                                        type="password" 
                                        className="input" 
                                        placeholder="Password" 
                                        name="password"
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <motion.a 
                                        className="link link-hover"
                                        whileHover={{ color: "#10B981" }}
                                    >
                                        Forgot password?
                                    </motion.a>
                                </motion.div>
                                <motion.button 
                                    className="btn text-lg font-semibold mt-4 bg-gradient-to-t from-emerald-300 to-emerald-300 hover:from-emerald-400 hover:to-emerald-400"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                >
                                    Login
                                </motion.button>
                            </form>
                            <motion.button
                                onClick={handleGoogleSignIn}
                                className="btn w-full bg-gradient-to-t from-emerald-300 to-emerald-300 hover:from-emerald-400 hover:to-emerald-400"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FcGoogle />
                                Sign in with Google
                            </motion.button>
                            <motion.p 
                                className="text-md font-semibold text-gray-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Don&apos;t have an account? 
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Link to="/register" className="link link-hover text-blue-500 text-lg">
                                        Register
                                    </Link>
                                </motion.span>
                            </motion.p>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="text-center lg:text-left"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <img className="" src={HistoricImage} alt="Historic Image" />
                    </motion.div>
                </div>
            </div>
            <ToastContainer limit={1} />
        </motion.div>
    );
};

export default Login;