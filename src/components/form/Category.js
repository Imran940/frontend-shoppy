import React from "react";

function CategoryForm({
  handleSubmit,
  name,
  setName,
  check,
  handleFilterChange,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Category Name"
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
              placeholder="Filter Category"
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

export default CategoryForm;
