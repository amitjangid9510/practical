import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser } from "../utils/auth";
import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(40, "Username must be at most 40 characters")
    .matches(/^\S*$/, "Username cannot contain spaces"),
  
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function Signup() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const usernameExists = users.some(
        (user) => user.username === data.username
      );
      const emailExists = users.some((user) => user.email === data.email);

      if (usernameExists) {
        setError("username", {
          type: "manual",
          message: "Username already exists",
        });
        return;
      }

      if (emailExists) {
        setError("email", { type: "manual", message: "Email already exists" });
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      reset();
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setServerError(
        "An error occurred during registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:p-4 relative overflow-hidden">
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        <img
          src="/images/bg.avif"
          alt="Futuristic e-commerce background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </motion.div>

      <motion.div
        className="w-full max-w-md relative z-10 mx-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {showSuccess ? (
          <motion.div
            className="bg-white/10 rounded-xl shadow-2xl border-2 border-white/20 overflow-hidden backdrop-blur-lg p-8 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <FiCheckCircle className="text-green-400 text-6xl" />
            </motion.div>
            <motion.h2
              className="text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Account Created Successfully!
            </motion.h2>
            <motion.p
              className="text-white/80 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your account has been successfully created. You'll be redirected
              to the login page shortly.
            </motion.p>
            <motion.div
              className="w-full bg-white/10 h-1 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            >
              <div className="h-full bg-green-400"></div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="bg-white/10 rounded-xl shadow-2xl border-2 border-white/20 overflow-hidden backdrop-blur-lg">
            <div className="p-4 sm:p-6 border-b border-white/20">
              <motion.h1
                className="text-2xl sm:text-4xl font-bold text-white text-center tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                CREATE ACCOUNT
              </motion.h1>
              <motion.p
                className="text-center text-white/80 mt-2 sm:mt-3 text-base sm:text-lg font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Please fill in your details
              </motion.p>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <AnimatePresence>
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 sm:mb-6 p-3 bg-white text-red-500 rounded-lg border border-black text-sm flex items-start"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {serverError}
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
                noValidate
              >
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-1 sm:mb-2">
                    USERNAME
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <FiUser className="text-black text-lg sm:text-xl" />
                    </div>
                    <input
                      {...register("username")}
                      type="text"
                      placeholder="Enter username"
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-base sm:text-lg text-white bg-white/5 rounded-lg sm:rounded-xl border-2 ${
                        errors.username
                          ? "border-white/50 focus:border-white"
                          : "border-white/20 focus:border-white"
                      } focus:ring-2 focus:ring-white/30 placeholder-white/50 font-medium transition-all`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.username && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-white/80 text-sm sm:text-base mt-1 sm:mt-2 flex items-start"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-1.5 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {errors.username.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-1 sm:mb-2">
                    EMAIL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <FiMail className="text-black text-lg sm:text-xl" />
                    </div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Enter email"
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-base sm:text-lg text-white bg-white/5 rounded-lg sm:rounded-xl border-2 ${
                        errors.email
                          ? "border-white/50 focus:border-white"
                          : "border-white/20 focus:border-white"
                      } focus:ring-2 focus:ring-white/30 placeholder-white/50 font-medium transition-all`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-white/80 text-sm sm:text-base mt-1 sm:mt-2 flex items-start"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-1.5 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-1 sm:mb-2">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <FiLock className="text-black text-lg sm:text-xl" />
                    </div>
                    <input
                      {...register("password")}
                      type="password"
                      placeholder="Enter password"
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-base sm:text-lg text-white bg-white/5 rounded-lg sm:rounded-xl border-2 ${
                        errors.password
                          ? "border-white/50 focus:border-white"
                          : "border-white/20 focus:border-white"
                      } focus:ring-2 focus:ring-white/30 placeholder-white/50 font-medium transition-all`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-white/80 text-sm sm:text-base mt-1 sm:mt-2 flex items-start"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-1.5 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-1 sm:mb-2">
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <FiLock className="text-black text-lg sm:text-xl" />
                    </div>
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      placeholder="Confirm password"
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-base sm:text-lg text-white bg-white/5 rounded-lg sm:rounded-xl border-2 ${
                        errors.confirmPassword
                          ? "border-white/50 focus:border-white"
                          : "border-white/20 focus:border-white"
                      } focus:ring-2 focus:ring-white/30 placeholder-white/50 font-medium transition-all`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-white/80 text-sm sm:text-base mt-1 sm:mt-2 flex items-start"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-1.5 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {errors.confirmPassword.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-lg sm:text-xl font-bold text-white bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all ${
                      isSubmitting ? "opacity-80" : ""
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin -ml-1 mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        SIGN UP{" "}
                        <FiArrowRight className="ml-2 sm:ml-3 text-lg sm:text-xl" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
            <div className="px-4 sm:px-6 py-3 sm:py-6 bg-white/5 border-t border-white/20 text-center">
              <motion.div
                className="text-white/80 text-sm sm:text-lg font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-bold text-white hover:text-white/90 focus:outline-none focus:underline underline-offset-4"
                >
                  LOGIN NOW
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
