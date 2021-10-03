import React, { useState } from "react";
import { Button } from "antd";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";
function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    console.log("Called");
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then((resp) => {
        setLoading(false);
        setPassword("");
        console.log(resp);
        toast.success("Password updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          <form>
            <div className="form-group">
              <lable>Your Password</lable>
              <input
                type="password"
                placeholder="Enter your new password"
                value={password}
                autoFocus
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <br />
              <Button
                disabled={!password || loading || password.length < 6}
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                update password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;
