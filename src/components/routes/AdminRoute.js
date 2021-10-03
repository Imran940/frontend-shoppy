import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingRedirect from "./LoadingRedirect";
import { currentAdmin } from "../../functions/auth";
function AdminRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((resp) => {
          console.log("admin resp->", resp);
          setOk(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return ok ? <Route {...rest} render={() => children} /> : <LoadingRedirect />;
}

export default AdminRoute;
