import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth.jsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { authSuccess, authFail } from "../../slicers/auth/auth_slice.jsx";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      console.log(response);

      dispatch(authSuccess(response));
      toast.success(response.message);

      setRole(response.user.role);

      localStorage.setItem("Token", response.token);

      console.log(response.token);

      // Use the updated role state in the callback passed to setRole
      if (response.user.role === "user") {
        navigate("/user");
      } else if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(authFail(error.response.message));
      toast.error(error.response.message);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="p-4 p-md-5">
        <div className="icon d-flex align-items-center justify-content-center">
          <span className="fa fa-user-o"></span>
        </div>
        <h3 className="text-center mb-4">Login</h3>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group my-4">
            <input
              type="text"
              className="form-control rounded-left"
              placeholder="email"
              name="email"
              required
              {...register("email")}
            />
          </div>
          <div className="form-group d-flex">
            <input
              type="password"
              className="form-control rounded-left"
              placeholder="Password"
              name="password"
              required
              {...register("password")}
            />
          </div>
          <div className="form-group d-md-flex my-3">
            <div className="w-50 text-md-right">
              <Link to="/register" className="forgot-pass">
                Register
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary rounded submit p-3 px-5 my-4 w-100"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
