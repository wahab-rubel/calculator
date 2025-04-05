import { config } from "localforage";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    const handleCallback = (response) => {
      console.log("Google Sign-In Response:", response);
      if (response && response.credential) {
        // Send the Google ID token to your backend for verification and registration/login
        fetch(`${config.baseUrl}/user/google-register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: response.credential }),
        })
          .then((res) => res.json())
          .then((data) => {
            const hasError = "error" in data && data.error != null;
            setMessage({
              data: hasError ? data.error : "Registered/Logged in successfully with Google",
              type: hasError ? "alert-danger" : "alert-success",
            });
            if (!hasError && data.token) {
              localStorage.setItem("authToken", data.token); // Store the token
              navigate("/"); // Redirect to homepage or dashboard
            }
          })
          .catch((error) => {
            console.error("Error during Google registration/login:", error);
            setMessage({
              data: "Failed to register/login with Google.",
              type: "alert-danger",
            });
          });
      }
    };

    if (window.google) {
      google.accounts.id.initialize({
        client_id: config.googleClientId, // Replace with your Google Client ID from config
        callback: handleCallback,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // Auto prompt for one tap login
    }

    // Load Google Sign-In script if not already present
    if (!document.getElementById('google-signin-script')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.id = 'google-signin-script';
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup if needed
    };
  }, [navigate]);

  const onSubmit = (data, e) => {
    setMessage({
      data: "Registration is in progress...",
      type: "alert-warning",
    });
    fetch(`${config.baseUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        const hasError = "error" in data && data.error != null;
        setMessage({
          data: hasError ? data.error : "Registered successfully",
          type: hasError ? "alert-danger" : "alert-success",
        });
        !hasError && e.target.reset();
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        setMessage({
          data: "Registration failed. Please try again.",
          type: "alert-danger",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          {message && (
            <div className={`mb-4 rounded-md p-4 ${message.type === 'alert-success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} flex items-center justify-between`}>
              <span>{message.data}</span>
              <button type="button" className="ml-2 focus:outline-none" onClick={() => setMessage(null)}>
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email address<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter email address"
                {...register("email", {
                  required: "Please enter your email address",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a valid email address",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Your Name<span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Please enter your name",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Please enter password",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
              <Link to="/login" className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800 ml-4">
                Cancel
              </Link>
            </div>
          </form>
          <hr className="my-6 border-t" />
          <div className="mt-4">
            <div id="googleSignInDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;