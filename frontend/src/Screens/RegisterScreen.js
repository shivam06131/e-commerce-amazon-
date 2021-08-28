import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Actions/userActions";
import LoadingBox from "../Component/LoadingBox";
import MessageBox from "../Component/MessageBox";

const RegisterScreen = (props) => {
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and ConfrimPassword didn't matched");
    } else {
      dispatch(register(name, email, password));
    }
  };
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className="div">
          <label className="name" htmlFor="name">
            Email address
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="div">
          <label className="label" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            id="eamil"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="div">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="div">
          <label className="label" htmlFor="confirmPassword">
            confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div className="div">
          <label className="label" />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div className="div">
          <label className="label" />
          <div>
            Already have an account?
            <Link to={`/signin?redirect=${redirect}`}>Sign-in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
