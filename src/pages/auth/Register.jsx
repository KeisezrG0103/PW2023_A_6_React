import { IoPersonCircle } from "react-icons/io5";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { User_Register } from "../../api/auth";
import {
  registerStart,
  registerSuccess,
  registerFail,
} from "../../slicers/auth/register_slice.jsx";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Education = [
    {
      id: 1,
      name: "Elementary",
    },
    {
      id: 2,
      name: "High School",
    },
    {
      id: 3,
      name: "Under Graduate",
    },
    {
      id: 4,
      name: "Post Graduate",
    },
    {
      id: 5,
      name: "Doctorate",
    },
  ];

  const CodingExperience = [
    {
      id: 1,
      name: "Beginner",
    },
    {
      id: 2,
      name: "Intermediete",
    },
    {
      id: 3,
      name: "Advance",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.username);

    dispatch(registerStart());
    User_Register(
      data.username,
      data.email,
      data.password,
      data.education,
      data.coding_experience
    )
      .then((response) => {
        dispatch(registerSuccess(response.data));
        toast.success(response.message);

        navigate("/");
        
      })
      .catch((error) => {
        dispatch(registerFail(error.response.data));
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="p-4">
        <div className="icon d-flex align-items-center justify-content-center">
          <IoPersonCircle size={100} />
        </div>
        <h3 className="text-center mb-4">Register</h3>
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label className="form-label text-light">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              id="inputUsername"
              placeholder="Username"
              {...register("username", {
                required: true,
                minLength: 4,
                maxLength: 32,
              })}
            />
            {errors.username && (
              <div id="inputUsername" className="invalid-feedback">
                {errors.username.type === "required"
                  ? "Please choose a username."
                  : errors.username.type === "maxLength"
                  ? "Username cannot exceed 32 characters."
                  : errors.username.type === "minLength"
                  ? "Username must be at least 4 characters."
                  : ""}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label text-light">Email</label>
            <input
              type="Email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="inputEmail"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <div id="inputEmail" className="invalid-feedback">
                {errors.email.type === "required"
                  ? "Please choose a email."
                  : errors.email.type === "pattern"
                  ? "Email is not valid."
                  : ""}
              </div>
            )}
          </div>
          <div className="col-12">
            <label className="form-label text-light">Password</label>
            <input
              type="Password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="Password"
              placeholder="Password"
              {...register("password", {
                required: true,
                maxLength: 40,
                minLength: 8,
              })} /* register an input */
            />
            {errors.password && (
              <div id="Password" className="invalid-feedback">
                {errors.password.type === "required"
                  ? "Please choose a password."
                  : errors.password.type === "maxLength"
                  ? "Password cannot exceed 40 characters."
                  : errors.password.type === "minLength"
                  ? "Password must be at least 8 characters."
                  : ""}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label text-light">Education</label>
            <select
              className={`form-select ${errors.education ? "is-invalid" : ""}`}
              id="inputEducation"
              {...register("education", { required: true })}
            >
              <option value="">Choose...</option>
              {Education.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <div id="inputEducation" className="invalid-feedback">
              Please choose a education.
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label text-light">Coding Experience</label>
            <select
              className={`form-select ${
                errors.coding_experience ? "is-invalid" : ""
              }`}
              id="inputExperience"
              {...register("coding_experience", { required: true })}
            >
              <option value="">Choose...</option>
              {CodingExperience.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <div id="inputExperience" className="invalid-feedback">
              Please choose a experience.
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
