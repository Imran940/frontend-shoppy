import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebaseConfig";
import { useSelector } from "react-redux";

function ForgetPassword({ history }) {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    auth
      .sendPasswordResetEmail(email, config)
      .then((resp) => {
        console.log(resp);
        window.localStorage.setItem("forgetEmail", email);
        setEmail("");
        toast.success("Reset password link sent to your email");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Forget Password</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              autoFocus
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button disabled={!email} className="btn btn-raised">
              Get Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
