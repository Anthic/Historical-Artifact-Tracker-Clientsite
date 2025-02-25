import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location= useLocation()
    if (loading) {
        return (
            <motion.div 
                className="min-h-screen flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
            </motion.div>
        );
    }

    if (!user) {
        return <Navigate  to="/login" state={{from: location}} replace />;
    }

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default PrivateRoute;
