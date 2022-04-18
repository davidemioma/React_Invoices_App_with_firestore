import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../firebase";
import { useNavigate } from "react-router";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const onSignInHandler = () => {
    signInWithGoogle()
      .then((user) => navigate("/", { replace: true }))
      .catch((err) => alert(err.message));
  };

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.form}>
          <FcGoogle className={classes.icon} />

          <h2>Sign in with google</h2>

          <button onClick={onSignInHandler}>Sign In</button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
