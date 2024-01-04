import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import React from "react";
const Login = () => {
  const { SingInWithEmailPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const LogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    SingInWithEmailPassword(email, password)
      .then((res) => {
        toast("Sign in succesfully");
        form.reset();
        console.log(res);
        navigate(from, { replace: true });
        const user_email = res.user.email;
        const data = {
          email: user_email,
        };
        axios.post("http://localhost:3000/jwt", data).then((res) => {
          localStorage.setItem("token", res.data);
          axios
            .post("http://localhost:3000/user-data-post", data)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        console.log(err);
        toast(`${err.message} \r\r check email and password`);
      });
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={LogIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <Link
                    to="/register"
                    className="label-text-alt link link-hover"
                  >
                    Dont have an account ? create now
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type="submit" className="btn btn-primary"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
