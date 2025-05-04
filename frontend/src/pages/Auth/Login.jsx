import { useState } from "react";
import { AuthLayout } from "../../components/layouts/AuthLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Inputs/Input.jsx";
import { validateEmail, validatePassword } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";

export const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const callLoginAPI = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.reponse.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginForm;
    console.log(email, password);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    } else {
      setError(validatePassword(password));
      if (error) return;
    }

    // Login API Call
    callLoginAPI();
  };

  return (
    <AuthLayout>
      <div className="lg:w-(70%) h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin} className="mt-5">
          <Input
            value={loginForm.email}
            onChange={({ target }) => setLoginForm({ ...loginForm, email: target.value })}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={loginForm.password}
            onChange={({ target }) => setLoginForm({ ...loginForm, password: target.value })}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          { error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p>
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};
