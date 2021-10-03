import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { auth, googleAuthProvider } from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { createOrUpdateUser } from "../../functions/auth";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("forgetEmail"));
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);
  const roleBasedRedirect = (role) => {
    let intend = window.localStorage.getItem("from");
    if (intend) {
      history.push(intend);
    } else {
      if (role !== "admin") {
        history.push("/user/history");
      } else {
        history.push("/admin/dashboard");
      }
    }
  };

  const handleEmailLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const result = await auth.signInWithEmailAndPassword(email, password);
      const idToken = await await (await result).user.getIdTokenResult();
      createOrUpdateUser(idToken.token)
        .then((resp) => {
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
        })
        .catch((err) => {
          console.log(err);
        });
      //

      window.localStorage.removeItem("forgetEmail");
      //push to home
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleGoogleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await auth.signInWithPopup(googleAuthProvider);
      const idToken = await await (await result).user.getIdTokenResult();
      createOrUpdateUser(idToken.token)
        .then((resp) => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4 className="text-danger">Loading</h4> : <h4>Login</h4>}
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              autoFocus
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
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
            <br />
            <Button
              type="primary"
              className="mb-3"
              block
              shape="round"
              size="large"
              icon={<MailOutlined />}
              disabled={!email || password.length < 6}
              onClick={handleEmailLoginSubmit}
            >
              Login with Email&password
            </Button>
            <br />
            <Button
              type="danger"
              className="mb-3"
              block
              shape="round"
              size="large"
              icon={<GoogleOutlined />}
              onClick={handleGoogleLoginSubmit}
            >
              Login with Google
            </Button>
            <Link to="/forget/password" className="text-danger float-right">
              Forget Password
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
