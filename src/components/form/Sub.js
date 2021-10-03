import React from "react";
import { Select } from "antd";
function SubForm({
  handleSubmit,
  name,
  setName,
  check,
  handleFilterChange,
  categories,
  setParentId,
  parentId,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Select
            value={parentId}
            placeholder="please select the category"
            onChange={(e) => setParentId(e)}
          >
            {categories.map((c, i) => (
              <Select.Option key={i} value={c._id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
          <br />
          <br />
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Sub Name"
            value={name}
            autoFocus
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <button disabled={!name} className="btn btn-raised">
            Save
          </button>
          <br />
          {check && (
            <input
              type="text"
              placeholder="Filter Sub"
              autoFocus
              className="form-control"
              onChange={handleFilterChange}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default SubForm;
