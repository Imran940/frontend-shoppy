import React, { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";
import { useDispatch } from "react-redux";

function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
    setEmail(window.localStorage.getItem("email"));
  }, []);
  const roleBasedRedirect = (role) => {
    console.log("called");
    if (role !== "admin") {
      history.push("/user/history");
    } else {
      history.push("/admin/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Please Enter Email and Password");
        return;
      }
      if (password.length < 6) {
        toast.error("Password Should be greater than 6 Characters");
        return;
      }
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //remove the email from localstorage
        window.localStorage.removeItem("email");

        let user = auth.currentUser;
        user.updatePassword(password);
        const idToken = await user.getIdTokenResult();
        console.log(idToken);
        //make the api request to save the user info in our database
        createOrUpdateUser(idToken.token).then((resp) => {
          console.log(resp);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: resp.data.email,
              token: idToken.token,
              name: resp.data.name,
              role: resp.data.role,
              _id: resp.data._id,
            },
          });

          roleBasedRedirect(resp.data.role);
        });

        toast.success("register completed successfully");

        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              autoFocus
              className="form-control"
              disabled
            />
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              autoFocus
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={!email} className="btn btn-raised">
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
