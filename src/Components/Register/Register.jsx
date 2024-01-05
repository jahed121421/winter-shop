import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
const Register = () => {
  const { SingUpWithEmailPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const RegisterUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    SingUpWithEmailPassword(email, password)
      .then((res) => {
        toast("Create Account Successfully");
        console.log(res);
        navigate("/");
        form.reset();
        const data = {
          email: email,
        };
        axios
          .post("http://localhost:3000/user-data-post", data)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        toast(`${err.message}`);
        console.log(err);
      });
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
            <form className="card-body" onSubmit={RegisterUser}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
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
                  <Link to="/login" className="link-hover link label-text-alt">
                    Already have an account
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

export default Register;
