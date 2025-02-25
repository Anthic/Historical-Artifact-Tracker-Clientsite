import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
    if (formData.photoURL && !urlPattern.test(formData.photoURL)) newErrors.photoURL = 'Invalid URL';
    
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!hasUpperCase) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!hasLowerCase) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createUser(formData.email, formData.password)
        .then(() => {
          toast.success('Registration successful!', {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light"
          });
          
          setFormData({
            name: '',
            email: '',
            photoURL: '',
            password: '',
            confirmPassword: ''
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
    } else {
      // Show first validation error as toast
      const firstError = Object.values(errors)[0];
      toast.error(firstError, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light"
      });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success('Google Sign-in Successful!', {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-green-100 to-emerald-200 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${errors.photoURL ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
            />
            {errors.photoURL && <p className="text-red-500 text-xs mt-1">{errors.photoURL}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-t from-emerald-300 to-emerald-300 hover:from-emerald-400 hover:to-emerald-400 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-50 transition duration-300 flex items-center justify-center"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-500 hover:text-emerald-600">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
};

export default Register;