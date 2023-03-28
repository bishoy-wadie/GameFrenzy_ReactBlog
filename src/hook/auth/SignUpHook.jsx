import { useState } from "react";
import { number, object, string } from "yup";
import notify from "../useNotification";

const SignUpHook = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

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
    setAge(e.target.value);
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
      .email("must be an email format")
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
    } catch (error) {
      console.log(error);
    }
  };

  return [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    age,
    loading,
    onChangeFirstName,
    onChangeLastName,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmPassword,
    onChangeAge,
    onSubmit,
  ];
};

export default SignUpHook;
