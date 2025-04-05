import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  selectUserEmail,
  selectUserName,
  selectUserPic,
  setActiveState,
} from "../../Features/userSlice";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../firebase/firebase.Config";
import { signInWithPopup } from "firebase/auth";
import AnimatePage from "../../animation/AnimatePage";

const Login = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const userName = useSelector(selectUserName); // Corrected to userName
  // eslint-disable-next-line no-unused-vars
  const userEmail = useSelector(selectUserEmail); // Corrected to userEmail
  // eslint-disable-next-line no-unused-vars
  const userPic = useSelector(selectUserPic);   // Corrected to userPic

  /* Sign in with Google */
  const handleSignInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(
        setActiveState({
          userName: result.user.displayName,
          userEmail: result.user.email,
          pic: result.user.photoURL,
        })
      );
    } catch (error) {
      console.error("Google Sign-in Error:", error.message);
    }
  };

  /* Sign in with Facebook */
  const handleSignInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      dispatch(
        setActiveState({
          userName: result.user.displayName,
          userEmail: result.user.email,
          pic: result.user.photoURL,
        })
      );
    } catch (error) {
      console.error("Facebook Sign-in Error:", error.message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-6">
      <AnimatePage>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            {("signIn")}
          </h1>

          {/* Social Sign-in Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleSignInGoogle}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 transition hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                alt="Google Logo"
                className="w-5 h-5"
              />
              <span className="text-gray-700">{("withGoogle")}</span>
            </button>

            <button
              onClick={handleSignInWithFacebook}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 transition hover:border-blue-600 focus:ring-2 focus:ring-blue-600"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                alt="Facebook Logo"
                className="w-5 h-5"
              />
              <span className="text-gray-700">{("withFacebook")}</span>
            </button>
          </div>

          <div className="my-6 border-t border-gray-300">
            <span className="absolute left-1/2 top-1/2 bg-white px-2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
              or
            </span>
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                {("yourEmail")}
              </label>
              <input
                type="email"
                id="email"
                className="w-full border-gray-300 rounded-lg p-2.5 focus:border-blue-500 focus:ring-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                {("password")}
              </label>
              <input
                type="password"
                id="password"
                className="w-full border-gray-300 rounded-lg p-2.5 focus:border-blue-500 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-500" />
                <span className="ml-2 text-gray-600">{("remember")}</span>
              </label>
              <a href="/forgot-password" className="text-blue-500 hover:underline">
                {("forget")}
              </a>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-lg py-2.5 font-medium hover:bg-blue-600 transition"
              whileHover={{ scale: 1.02 }}
            >
              {("login")}
            </motion.button>
          </form>
        </motion.div>
      </AnimatePage>
    </section>
  );
};

export default Login;