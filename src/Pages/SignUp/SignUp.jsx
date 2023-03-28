import { Link, redirect, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { number, object, string } from "yup";
import notify from "../../hook/useNotification";
import axios from "axios";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.firstName;
    setErrors(newErrors);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.lastName;
    setErrors(newErrors);
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
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.confirmPassword;
    setErrors(newErrors);
  };
  const onChangeAge = (e) => {
    setAge(+e.target.value);
    const newErrors = { ...errors };
    delete newErrors.age;
    setErrors(newErrors);
  };

  const SignUpSchema = object({
    firstName: string()
      .min(3, "name must not be less than 3 characters")
      .required("first name is required"),
    lastName: string()
      .min(3, "name must not be less than 3 characters")
      .required("last name is required"),
    email: string()
      .email("must be in email format")
      .required("email is required"),
    password: string()
      .min(6, "password must not be less than 6 characters")
      .required("password is required"),
    confirmPassword: string()
      .test("password-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      })
      .required("confirm password is required"),
    age: number("age must be number")
      .min(16, "age must not be less than 16")
      .required("age is required")
      .positive()
      .integer(),
  });

  const API_URL = "http://localhost:3000";

  // Function to add a new user to the database
  const signUp = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error(error);
      notify(error.response.data, "error");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await SignUpSchema.validate(
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          age,
        },
        { abortEarly: false }
      );
      console.log(result);
      const response = await signUp({
        firstName,
        lastName,
        email,
        password,
        age,
      });
      console.log(response);

      if (response.accessToken) {
        localStorage.setItem("access_token", response.accessToken);
        notify("Your account Created Successfully", "success");
        setTimeout(() => {
          navigate("/");
        }, 3000);
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

  // useEffect(() => {});

  // const addNewUser = async () => {
  //   const { data } = await axios.post("http://localhost:3000/users/signup", {
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     confirmPassword,
  //     age,
  //   });
  // };

  return (
    <>
      <ToastContainer theme="colored" />
      <div className="w-full m-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={onSubmit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Create New Account
          </h5>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                value={firstName}
                onChange={onChangeFirstName}
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                value={lastName}
                onChange={onChangeLastName}
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={email}
              onChange={onChangeEmail}
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={password}
              onChange={onChangePassword}
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={age}
              onChange={onChangeAge}
              type="number"
              name="floating_age"
              id="floating_age"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_age"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Age
            </label>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
          <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
            Already Have Account?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
