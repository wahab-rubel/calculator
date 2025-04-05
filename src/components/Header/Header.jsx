import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Home,
  List,
  UserRound,
} from "lucide-react";
import { FaQrcode } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import {
  BsPersonPlusFill,
  BsPersonFill,
  BsCoin,
  BsEnvelope,
  BsCreditCard,
  BsHeart,
  BsTicket,
} from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import {
  RiShareForward2Line,
  RiBriefcaseLine,
  RiShieldUserLine,
  RiQuestionLine,
  RiErrorWarningLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  setLogOut,
  setActiveState,
} from "../../Features/userSlice";
import { auth, googleProvider } from "../../firebase/firebase.Config";

import { FaHome, FaUserTie, FaTshirt, FaList } from "react-icons/fa";

const moreMenuItems = [
  { label: "Profile", to: "/profile" },
  { label: "Settings", to: "/settings" },
  { label: "Help", to: "/help" },
  { label: "Home & Garden", to: "/home-garden" },
  { label: "Hair Extensions & Wigs", to: "/hair-extensions" },
  { label: "Men's Clothing", to: "/mens-clothing" },
  { label: "Accessories", to: "/accessories" },
  { label: "Top Brands", to: "/top-brands" },
  { label: "Weekly deals", to: "/weekly-deals" },
  { label: "Spotlight Trends", to: "/spotlight-trends" },
  { label: "Bundle deals", to: "/bundle-deals" },
  { label: "Choice", to: "/choice" },
];

const categoryIcons = {
  "Home & Garden": <FaHome className="mr-2 text-cyan-500" />,
  "Hair Extensions & Wigs": <FaUserTie className="mr-2 text-indigo-500" />,
  "Men's Clothing": <FaTshirt className="mr-2 text-rose-500" />,
  Accessories: <FaList className="mr-2 text-fuchsia-500" />,
  "Top Brands": <RiBriefcaseLine className="mr-2 text-teal-500" />,
  "Weekly deals": <BsCoin className="mr-2 text-yellow-500" />,
  "Spotlight Trends": <BsHeart className="mr-2 text-red-500" />,
  "Bundle deals": <BsTicket className="mr-2 text-purple-500" />,
  Choice: <BsHeart className="mr-2 text-orange-500" />, // Example icon
  More: <MdOutlineArrowDropDown className="mr-2 text-slate-500" />, // Example icon
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useSelector(selectUserName);
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [photo, setPhoto] = useState(localStorage.getItem("photo"));
  const [countryFlag, setCountryFlag] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isWelcomeDropdownOpen, setIsWelcomeDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("name")); // Check for user name in local storage

  const [categories] = useState([
    { label: "Bundle deals", to: "/bundle-deals" },
    { label: "Spotlight Trends", to: "/spotlight-trends" },
    { label: "Weekly deals", to: "/weekly-deals" },
    { label: "Top Brands", to: "/top-brands" },
    { label: "Choice", to: "/choice" },
    { label: "Home & Garden", to: "/home-garden" },
    { label: "Hair Extensions & Wigs", to: "/hair-extensions-wigs" },
    { label: "Men's Clothing", to: "/mens-clothing" },
    { label: "Accessories", to: "/accessories" },
    { label: "More", to: "/more" },
  ]);

  const welcomeDropdownItems = [
    {
      label: "Sign in",
      to: "/signin",
      icon: <BsPersonFill className="mr-2 text-blue-500" />,
    },
    {
      label: "Register",
      to: "/register",
      icon: <BsPersonPlusFill className="mr-2 text-green-500" />,
    },
    {
      label: "My Orders",
      to: "/my-orders",
      icon: <List className="mr-2 text-yellow-500" />,
    },
    {
      label: "My Coins",
      to: "/my-coins",
      icon: <BsCoin className="mr-2 text-orange-500" />,
    },
    {
      label: "Message Center",
      to: "/message-center",
      icon: <BsEnvelope className="mr-2 text-purple-500" />,
    },
    {
      label: "Payment",
      to: "/payment",
      icon: <BsCreditCard className="mr-2 text-teal-500" />,
    },
    {
      label: "Wish List",
      to: "/wishlist",
      icon: <BsHeart className="mr-2 text-red-500" />,
    },
    {
      label: "My Coupons",
      to: "/my-coupons",
      icon: <BsTicket className="mr-2 text-lime-500" />,
    },
    {
      label: "Settings",
      to: "/settings",
      icon: <FiSettings className="mr-2 text-gray-500" />,
    },
    {
      label: "AliExpress Business",
      to: "/aliexpress-business",
      icon: <RiBriefcaseLine className="mr-2 text-indigo-500" />,
    },
    {
      label: "DS Center",
      to: "/ds-center",
      icon: <RiShieldUserLine className="mr-2 text-cyan-500" />,
    },
    {
      label: "Seller Log In",
      to: "/seller-login",
      icon: <UserRound className="mr-2 text-rose-500" />,
    },
    {
      label: "Buyer Protection",
      to: "/buyer-protection",
      icon: <RiShieldUserLine className="mr-2 text-sky-500" />,
    },
    {
      label: "Help Center",
      to: "/help-center",
      icon: <RiQuestionLine className="mr-2 text-amber-500" />,
    },
    {
      label: "Disputes & Reports",
      to: "/disputes-reports",
      icon: <RiErrorWarningLine className="mr-2 text-fuchsia-500" />, // Corrected usage
    },
    {
      label: "Report IPR infringement",
      to: "/report-ipr",
      icon: <RiEyeOffLine className="mr-2 text-slate-500" />,
    },
    {
      label: "Accessibility",
      to: "/accessibility",
      icon: <User className="mr-2 text-emerald-500" />,
    },
    {
      label: "Penalties information",
      to: "/penalties-info",
      icon: <RiErrorWarningLine className="mr-2 text-violet-500" />, // Corrected usage
    },
  ];

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        // Assuming product.json has a "countryFlag" field with the flag URL
        const response = await fetch("/product.json");
        const data = await response.json();
        if (data && data.countryFlag) {
          setCountryFlag(data.countryFlag);
        }
      } catch (error) {
        console.error("Failed to fetch country flag:", error);
      }
    };
    fetchFlag();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const { displayName, email, photoURL } = result.user;
        localStorage.setItem("name", displayName);
        localStorage.setItem("email", email);
        localStorage.setItem("photo", photoURL);
        dispatch(
          setActiveState({
            userName: displayName,
            userEmail: email,
            userPic: photoURL,
          })
        );
        setPhoto(photoURL);
        setIsAuthenticated(true); // Update authentication state
        const storedRedirect = localStorage.getItem("redirectAfterAuth");
        if (storedRedirect) {
          localStorage.removeItem("redirectAfterAuth");
          navigate(storedRedirect);
        } else {
          navigate("/"); // Redirect to home after successful login
        }
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhoto(user.photoURL);
        dispatch(
          setActiveState({
            userName: user.displayName,
            userEmail: user.email,
            userPic: user.photoURL,
          })
        );
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("photo");
        dispatch(setLogOut());
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    // Check authentication on component mount and route changes
    setIsAuthenticated(!!localStorage.getItem("name"));
  }, [location]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setLogOut());
        setPhoto(null);
        setIsAuthenticated(false);
        navigate("/signin"); // Redirect to signin after logout
      })
      .catch((err) => alert(err.message));
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleWelcomeDropdown = () => {
    setIsWelcomeDropdownOpen(!isWelcomeDropdownOpen);
  };

  const handleNavLinkClick = (to) => {
    if (!isAuthenticated && to !== "/" && to !== "/signin" && to !== "/register") {
      localStorage.setItem("redirectAfterAuth", to);
      navigate("/signin");
      return false; // Prevent default navigation
    }
    return true; // Allow default navigation
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 z-50">
      {/* Top AliExpress Header */}
      <div className="py-2 px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <h1
            className="text-2xl text-gray-900 cursor-pointer font-extrabold"
            onClick={() => navigate("/")}
          >
            <span className="text-red-500"> Wahab</span>
            <span className="text-emerald-500">Express</span>
          </h1>
          <div className="relative w-[400px] flex items-center">
            <input
              type="text"
              placeholder="iphone 15 pro max"
              className="w-full p-2 pl-4 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
              <Search size={20} />
            </button>

            <div className="absolute right-[calc(-100%-8px)] top-1/2 transform -translate-y-1/2 flex gap-4">
              <Link
                to="https://www.facebook.com"
                target="_blank"
                className="text-blue-500 hover:text-blue-700"
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                className="text-blue-400 hover:text-blue-600"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                to="https://www.instagram.com"
                target="_blank"
                className="text-pink-500 hover:text-pink-700"
              >
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <NavLink className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-black">
            <FaQrcode size={18} />
            <NavLink to="/">Download App</NavLink>
          </NavLink>
          <div className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-black">
            {countryFlag && (
              <img
                src={countryFlag}
                alt="Country Flag"
                className="w-5 h-5 rounded-sm"
              />
            )}
            <span>BDT</span>
            <MdOutlineArrowDropDown size={20} />
          </div>
          <div className="relative">
            <button
              onClick={toggleWelcomeDropdown}
              className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-black focus:outline-none"
            >
              <span className="text-orange-500 font-bold">Welcome</span>
              <User size={18} />
              <MdOutlineArrowDropDown size={20} />
            </button>
            {isWelcomeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg z-50">
                {!userName && (
                  <button
                    onClick={handleGoogleSignIn}
                    className=" w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 flex items-center"
                  >
                    <BsPersonFill className="mr-2 text-blue-500" /> Sign in with
                    Google
                  </button>
                )}
                {welcomeDropdownItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className=" px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => handleNavLinkClick(item.to)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
                {userName && (
                  <>
                    <hr className="my-2" />
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                      onClick={() => handleNavLinkClick("/profile")}
                    >
                      <BsPersonFill className="mr-2 text-indigo-500" /> Profile
                    </Link>
                    <button
                      onClick={logOut}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center"
                    >
                      Logout
                      <RiShareForward2Line className="ml-2 text-red-500" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="relative cursor-pointer text-gray-700 hover:text-black">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              0
            </span>
          </div>
        </div>
      </div>
      <nav className="flex items-center space-x-6 ml-96">
      <NavLink
          to="/"
          className={`text-gray-700 hover:text-black flex items-center ${
            open && "text-black"
          }`}
          onClick={() => handleNavLinkClick("/")}
        >
          <Home className="mr-1 text-blue-500" size={18} /> Home
        </NavLink>
        <NavLink
          to="/my-products"
          className={`text-gray-700 hover:text-black flex items-center ${
            open && "text-black"
          }`}
          onClick={() => handleNavLinkClick("/my-products")}
        >
          <List className="mr-1 text-green-500" size={18} /> My Products
        </NavLink>
        <NavLink
          to="/profile"
          className={`text-gray-700 hover:text-black flex items-center ${
            open && "text-black"
          }`}
          onClick={() => handleNavLinkClick("/profile")}
        >
          <UserRound className="mr-1 text-orange-500" size={18} /> Profile
        </NavLink>
        <NavLink
          to="/products2"
          className={`text-gray-700 hover:text-black flex items-center ${
            open && "text-black"
          }`}
          onClick={() => handleNavLinkClick("/products2")}
        >
          <UserRound className="mr-1 text-orange-500" size={18} /> products2
        </NavLink>
      </nav>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white shadow-sm w-full">
        <div className="container mx-auto flex items-center py-2 px-6 justify-start">
          {/* All Categories with Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleCategoryDropdown}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-black focus:outline-none bg-slate-300 shadow-md rounded-lg"
            >
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              All Categories
              <MdOutlineArrowDropDown size={20} />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg z-50">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.to}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => handleNavLinkClick(category.to)}
                  >
                    {/* categoryIcons */}
                    {categoryIcons[category.label] && (
                      <span className="mr-2">
                        {categoryIcons[category.label]}
                      </span>
                    )}
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Your Original Navigation Links with Icons */}
          <div className="flex items-center space-x-4 ml-6">
            <NavLink
              to="/home-garden"
              className="text-gray-700 hover:text-black flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleNavLinkClick("/home-garden")}
            >
              <List className="mr-1 text-cyan-500" size={18} /> Home & Garden
            </NavLink>

            <NavLink
              to="/hair-extensions-wigs"
              className="text-gray-700 hover:text-black flex items-center"
              onClick={() => handleNavLinkClick("/hair-extensions-wigs")}
            >
              <User className="mr-1 text-indigo-500" size={18} /> Hair
              Extensions & Wigs
            </NavLink>
            <NavLink
              to="/mens-clothing"
              className="text-gray-700 hover:text-black flex items-center"
              onClick={() => handleNavLinkClick("/mens-clothing")}
            >
              <User className="mr-1 text-rose-500" size={18} /> Men's Clothing
            </NavLink>
            <NavLink
              to="/accessories"
              className="text-gray-700 hover:text-black flex items-center"
              onClick={() => handleNavLinkClick("/accessories")}
            >
              <List className="mr-1 text-fuchsia-500" size={18} /> Accessories
            </NavLink>

            <NavLink
              to="/products2"
              className="text-gray-700 hover:text-black flex items-center"
              onClick={() => handleNavLinkClick("/products2")}
            >
              <RiBriefcaseLine className="mr-1 text-teal-500" size={18} /> Top
              Brands
            </NavLink>

            <NavLink
              to="/weekly-deals"
              className="text-gray-700 hover:text-black flex items-center"
              onClick={() => handleNavLinkClick("/weekly-deals")}
            >
              <BsCoin className="mr-1 text-yellow-500" size={18} /> Weekly deals
            </NavLink>

            <NavLink
              to="/spotlight-trends"
              className="text-gray-700 hover:text-black flex items-center"
              onClick={() => handleNavLinkClick("/spotlight-trends")}
            >
              <BsHeart className="mr-1 text-red-500" size={18} /> Spotlight
              Trends
            </NavLink>

            <NavLink
              to="/bundle-deals"
              className="text-gray-700 hover:text-black flex items-center"
              onClick={() => handleNavLinkClick("/bundle-deals")}
            >
              <BsTicket className="mr-1 text-purple-500" size={18} /> Bundle
              deals
            </NavLink>

            <div>
              <nav className="relative bg-white shadow-md p-4 flex justify-between">
                {/* Categories Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-gray-700 hover:text-black flex items-center"
                  >
                    {categoryIcons["More"]} More
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg z-50">
                      {moreMenuItems.map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.to}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleNavLinkClick(item.to);
                          }}
                        >
                          {categoryIcons[item.label] || (
                            <FaList className="mr-2" />
                          )}
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;