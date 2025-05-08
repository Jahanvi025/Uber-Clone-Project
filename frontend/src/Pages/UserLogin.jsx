import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import carimg from '../assets/uber2.webp';
import api from '../utils/api';
import { toast } from 'react-hot-toast';
import "../toast.css";
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../utils/api';
import { motion } from "framer-motion";  // Import motion

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    try {
      if (response && response.code) {
        const result = await googleAuth(response.code);
        const { email, firstname, lastname } = result.data.user;
        const token = result.data.token;
        const obj = { token, email, firstname, lastname };
        localStorage.setItem('user', JSON.stringify(obj));
        window.dispatchEvent(new Event("userUpdated"));
        navigate("/");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.", {
        className: "toast-purple"
      });
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const res = await api.post(`/users/login`, data);

      if (res.data.token && res.data.user) {
        const { token, user } = res.data;

        localStorage.setItem("user", JSON.stringify({
          token,
          firstname: user.fullname?.firstname,
          lastname: user.fullname?.lastname,
          email: user.email,
        }));

        window.dispatchEvent(new Event("userUpdated"));
        toast.success("Login successful!", {
          className: "toast-purple"
        });
        
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setServerError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_#4A4062_0%,_#2C2B3D_40%,_#1B1B28_100%)]">
      <motion.div 
        className="flex flex-col md:flex-row bg-black shadow-lg rounded-lg overflow-hidden w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div 
          className="md:w-1/2 hidden md:block"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <img src={carimg} alt="Car" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div 
          className="w-full md:w-1/2 p-8"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-neutral-400 mb-6">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-neutral-400">Email</label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border text-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && <p className='text-[#F7374F] mt-1 text-xs'>{errors.email.message}</p>}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-neutral-400">Password</label>
              <div className="relative">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full mt-1 px-4 py-2 border border-neutral-400 text-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-sm text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className='text-[#F7374F] mt-1 text-xs'>{errors.password.message}</p>}
            </motion.div>

            {serverError && <p className='text-[#F7374F] text-sm mt-2'>{serverError}</p>}

            <motion.button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Sign In
            </motion.button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-2 text-sm text-gray-400">or continue with</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <motion.button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-500 text-white py-2 rounded-md hover:bg-gray-800 transition"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/usersignup" className="text-purple-600 hover:text-purple-300">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserLogin;
