import React, { useEffect, useState } from "react";
import { getAllCategories } from "../functions/category";
import { Link } from "react-router-dom";
import { getAllSubs } from "../functions/sub";
function ShowCategoriesAndSubsList({ check }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (check == "category") {
      getAllCategories()
        .then((resp) => {
          console.log(resp);
          setList(resp.data);
        })
        .catch((err) => console.log(err));
    } else {
      getAllSubs()
        .then((resp) => {
          console.log(resp);
          setList(resp.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="row">
      {list?.map((c, i) => (
        <div
          className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
          key={i}
        >
          <Link
            to={
              check == "category"
                ? `/category/${c.slug}`
                : `/sub-category/${c.slug}`
            }
          >
            {" "}
            {c.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ShowCategoriesAndSubsList;
