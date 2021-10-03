import React, { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function Register({ history }) {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // I need to send registration link to the specified email
      // I need to configure the redirection link.
      const config = {
        url: process.env.REACT_APP_REGISTER_COMPLETE_URL,
        handleCodeInApp: true,
      };
      console.log({ auth, config });
      await auth.sendSignInLinkToEmail(email, config);
      toast.success(
        `Email is sent to ${email}, please click the link to complete your registration`
      );
      //save the user email in localstorage
      window.localStorage.setItem("email", email);
      //clear the email field
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
