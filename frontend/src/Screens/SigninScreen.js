import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../Actions/userActions";
import LoadingBox from "../Component/LoadingBox";
import MessageBox from "../Component/MessageBox";

const SigninScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>SignIn</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
          <label className="label" />
          <button className="primary" type="submit">
            SignIn
          </button>
        </div>
        <div className="div">
          <label className="label" />
          <div>
            New Customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create Your Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
