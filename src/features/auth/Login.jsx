import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../../app/store";
import { userApiSlice } from "../users/usersApiSlice";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const errClass = errMsg ? "errmsg" : "offscreen";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. when username vs pwd ready ==> call api get token
      const { accessToken } = await login({ username, password }).unwrap();
      // 2. set token to reducer
      dispatch(setCredentials({ accessToken }));
      setUserName("");
      setPassword("");
      navigate("/dash");
    } catch (error) {
      if (!error.status) {
        setErrMsg("no server response");
      } else if (error.status === 400) {
        setErrMsg("missing username or password");
      } else if (error.status === 401) {
        setErrMsg("unauthorized");
      } else {
        setErrMsg(error.data?.message);
      }

      errRef.current.focus();
    }
  };
  const handleUserInput = (e) => setUserName(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  if (isLoading) return <p>Loading</p>;
  const content = (
    <section className="public">
      <header>
        <h1>employe login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="username">username:</label>
          <input type="text" id="username" ref={userRef} value={username} onChange={handleUserInput} autoComplete="off" required />
          <label htmlFor="pwd">password:</label>
          <input type="password" id="pwd" value={password} onChange={handlePwdInput} required />
          <button className="form__submit-button">Sign in</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to home</Link>
      </footer>
    </section>
  );
  return content;
}
