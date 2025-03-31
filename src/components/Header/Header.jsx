import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { BsPersonPlusFill, BsPersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { RiShareForward2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setLogOut } from "../../Features/userSlice";
import Logo from "../../assets/logo.png";
import { auth, googleProvider } from "../../firebase/firebase.Config"; // Assuming these are set up correctly for Firebase

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.allCart || { cart: [] });
  const userName = useSelector(selectUserName);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);

  // Google Sign-In Function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setPhoto(user.photoURL);
      localStorage.setItem("name", user.displayName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("photo", user.photoURL);
      console.log("Signed in user:", user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhoto(user.photoURL);
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("photo", user.photoURL);
      } else {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("photo");
      }
    });

    return () => unsubscribe();
  }, []);

  // Toggle dropdown
  const handleOpen = () => setOpen(!open);

  // Logout function
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setLogOut());
        navigate("/"); // Navigate to home after logout
      })
      .catch((err) => alert(err.message));
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo" className="h-12" />
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-700"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-700"}>
              Contact Us
            </NavLink>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* User Profile */}
          <div className="relative">
            <button onClick={handleOpen} className="focus:outline-none">
              {userName ? (
                <img src={photo} alt="User" className="w-10 h-10 rounded-full" />
              ) : (
                <BsPersonPlusFill size={30} className="text-gray-700" />
              )}
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                {userName ? (
                  <Link to="/account" className="block px-4 py-2 text-gray-700">
                    Hi, {userName}
                  </Link>
                ) : (
                  <Link to="/login" className="block px-4 py-2 text-gray-700">
                    Login
                  </Link>
                )}
                <hr className="my-2" />
                <Link to="/account" className="px-4 py-2 text-gray-700 flex items-center">
                  <BsPersonFill className="mr-2" /> Profile
                </Link>
                <Link to="/settings" className="px-4 py-2 text-gray-700 flex items-center">
                  <FiSettings className="mr-2" /> Settings
                </Link>
                <hr className="my-2" />
                <button onClick={logOut} className="w-full text-left px-4 py-2 text-gray-700 flex items-center">
                  Logout <RiShareForward2Line className="ml-2" />
                </button>
              </div>
            )}
          </div>

          {/* Google Sign-In Button */}
          {!userName && (
            <button
              onClick={handleGoogleSignIn}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Sign In with Google
            </button>
          )}

          {/* Cart */}
          <NavLink to="/cart" className="relative">
            <svg
              className="h-8 w-8 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 5h13l-1.5-5M10 21a1 1 0 102 0M17 21a1 1 0 102 0" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
