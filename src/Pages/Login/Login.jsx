import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { number, object, string } from "yup";
import notify from "../../hook/useNotification";
import axios from "axios";

import background from "../../assets/images/assassins-creed-valhalla-4k-game-ul.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.email;
    setErrors(newErrors);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.password;
    setErrors(newErrors);
  };

  const LoginSchema = object({
    email: string()
      .email("must be in email format")
      .required("Email is required "),
    password: string()
      .min(6, "password must not be less than 6 characters")
      .required("password is required"),
  });

  const API_URL = "http://localhost:3000";

  const login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      console.error(error);
      notify(error.response.data, "error");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await LoginSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      console.log(result);
      const response = await login({
        email,
        password,
      });
      console.log(response);

      if (response.accessToken) {
        localStorage.setItem("access_token", response.accessToken);
        localStorage.setItem("user_data", JSON.stringify(response.user));
        notify("Login Successfully", "success");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
      }
    } catch (error) {
      let errors = [];
      if (error.errors) {
        errors = error.errors.map((err) => err);
      }
      errors.forEach((err) => notify(err, "error"));
      console.dir(errors);
    }
  };
  return (
    <>
      <div className="h-screen" style={styles}>
        <ToastContainer theme="dark" />
        <div className="text-center mx-auto">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-white m-10 text-xl "
          >
            GameFrenzy
          </Link>
        </div>
        <div className="w-full m-auto max-w-sm p-4  rounded-lg shadow sm:p-6 md:p-8 bg-sky-600 bg-opacity-60">
          <form className="space-y-6" onSubmit={onSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Sign in to our platform
            </h5>
            <div className="relative z-0 w-full mb-6 group">
              <input
                value={email}
                onChange={onChangeEmail}
                type="text"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-200 focus:outline-none focus:ring-0 focus:border-green-200 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-200 peer-focus:dark:text-green-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                value={password}
                onChange={onChangePassword}
                type={showPassword ? "text" : "password"}
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-200 focus:outline-none focus:ring-0 focus:border-green-200 peer"
                placeholder=" "
              />
              <div
                className="password-icon absolute inset-y-0 right-0 flex items-center pr-2"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                  </svg>
                )}
              </div>
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-200 peer-focus:dark:text-green-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-green-200 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-200 dark:hover:bg-green-200 dark:focus:ring-green-200 bg-gradient-to-r from-cyan-500 to-blue-500"
            >
              Login
            </button>
            <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                to="/signup"
                className="text-green-300 hover:underline dark:text-green-200"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
