import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Search() {
  const { search } = useSelector((state) => ({ ...state }));
  let text = search.text;
  let dispatch = useDispatch();
  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };
  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };
  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={handleChange}
        placeholder="Search"
        type="search"
        className="form-control mr-sm-2"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
}

export default Search;
