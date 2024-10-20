import { useState } from "react";
import validator from "validator";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(e);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { userName, email, password } = formData;
    const errors = {
      username: "",
      email: "",
      password: "",
    };

    // Username validation
    if (userName.length < 8) {
      errors.username = "Username must be at least 8 characters.";
    }

    // Email validation
    if (!validator.isEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Set error messages or proceed with form submission
    if (errors.username || errors.email || errors.password) {
      setErrorMessages(errors);
    } else {
      // Proceed with form submission or any other action
      console.log("Form submitted successfully:", formData);
      // Clear form data if needed
      setFormData({ userName: "", email: "", password: "" });
      setErrorMessages({ username: "", email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username Input */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm text-gray-600 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {/* {errorMessages.username && (
                <div className="text-red-500">{errorMessages.username}</div>
              )} */}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {/* {errorMessages.email && (
                <div className="text-red-500">{errorMessages.email}</div>
              )} */}
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm text-gray-600 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {/* {errorMessages.password && (
                <div className="text-red-500">{errorMessages.password}</div>
              )} */}

              {errorMessages.username ? (
                <div className="text-red-500 mt-3">
                  {errorMessages.username}
                </div>
              ) : errorMessages.email ? (
                <div className="text-red-500 mt-3">{errorMessages.email}</div>
              ) : errorMessages.password ? (
                <div className="text-red-500 mt-3">
                  {errorMessages.password}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2C3544] text-white py-2 px-4 rounded-md hover:bg-[#1f2632] transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
