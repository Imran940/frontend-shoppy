import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function LoadingRedirect({ check }) {
  const [count, setCount] = useState(5);
  let dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((oldCount) => --oldCount);
    }, 1000);
    if (check == "payment" && count === 0) {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: [],
      });
      localStorage.removeItem("cart");
      localStorage.removeItem("amountInfo");
      history.push("/user/history");
    } else {
      count === 0 && history.push("/");
    }

    console.log(interval);
    //cleanup
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="container p-5 text-center">
      <p className="text-danger"> Redirecting you in {count} seconds</p>
    </div>
  );
}

export default LoadingRedirect;
