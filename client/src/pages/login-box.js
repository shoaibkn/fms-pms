import React from "react";
import { setUserSession } from "./utils/common";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  json,
} from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/authProvider";
import Dashboard from "./dashboard";
import axios from "../api/axios";
const LOGIN_URL = "/auth";

export default function LoginBox(props) {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {};
  const postCreds = () => {
    const username = document.getElementById("uName").value;
    const password = document.getElementById("uPass").value;
    console.log(username + " : " + password);
    try {
      //axios.get("http://localhost:3500");
      axios
        .post("http://localhost:3500/signin", {
          username: username.value,
          password: password.value,
        })
        .then((response) => {
          setUserSession(response.data.token, response.data.user);
          props.history.push("/dashboard");
        });
    } catch (error) {}
    //implement post function here
  };

  return (
    <>
      {success ? (
        <Dashboard />
      ) : (
        <div className="login-screen">
          <div className="login-box">
            <div className="avatar-login">
              <svg
                width="84"
                height="84"
                viewBox="0 0 84 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M42 80C53.4671 80 63.7479 74.9208 70.7152 66.8893C67.2278 62.8657 62.9313 59.6172 58.1023 57.3581C53.004 54.973 47.4396 53.7503 41.8111 53.7783C36.1827 53.8062 30.6307 55.0842 25.5564 57.5198C20.8638 59.7723 16.6881 62.9627 13.2847 66.8893C20.2521 74.9208 30.5329 80 42 80ZM59.7972 53.7349C64.8955 56.12 69.4568 59.5029 73.2147 63.6772C77.4922 57.5291 80 50.0574 80 42C80 21.0132 62.9868 4 42 4C21.0132 4 4 21.0132 4 42C4 50.0574 6.50775 57.5291 10.7853 63.6772C14.4484 59.6081 18.8769 56.289 23.8255 53.9137C29.4339 51.2217 35.5703 49.8092 41.7913 49.7783C48.0122 49.7474 54.1623 51.0988 59.7972 53.7349ZM42 84C65.196 84 84 65.196 84 42C84 18.804 65.196 0 42 0C18.804 0 0 18.804 0 42C0 65.196 18.804 84 42 84ZM53.5555 31.1111C53.5555 37.493 48.3819 42.6666 41.9999 42.6666C35.6179 42.6666 30.4443 37.493 30.4443 31.1111C30.4443 24.7291 35.6179 19.5555 41.9999 19.5555C48.3819 19.5555 53.5555 24.7291 53.5555 31.1111ZM57.5555 31.1111C57.5555 39.7022 50.591 46.6666 41.9999 46.6666C33.4088 46.6666 26.4443 39.7022 26.4443 31.1111C26.4443 22.52 33.4088 15.5555 41.9999 15.5555C50.591 15.5555 57.5555 22.52 57.5555 31.1111Z"
                  fill="black"
                />
              </svg>
            </div>
            <form>
              <div className="">
                <label className="">Username</label>
                <br></br>
                <input
                  className=""
                  type="text"
                  placeholder="Enter Username"
                  id="uName"
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                ></input>
              </div>
              <div className="">
                <label className="">Password</label>
                <input
                  id="uPass"
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                ></input>
              </div>

              <div id="loginBtn">
                <button type="button" id="loginBtn" onClick={postCreds}>
                  Login
                </button>
              </div>
            </form>
            <p
              ref={errRef}
              className={errMsg ? "errMsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </div>
          <div className="login-banner"></div>
        </div>
      )}
    </>
  );
}
