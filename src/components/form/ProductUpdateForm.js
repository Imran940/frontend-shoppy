import React, { useEffect, useState } from "react";
import { Select } from "antd";
const { Option } = Select;
function ProductUpdateForm({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
}) {
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
    selectedSubs,
  } = formData;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Shipping</label>
          <input
            type="text"
            name="shipping"
            className="form-control"
            value={shipping}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Colors</label>
          <select
            name="color"
            onChange={handleChange}
            className="form-control"
            value={color}
          >
            {colors.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Brands</label>
          <select
            name="brand"
            onChange={handleChange}
            className="form-control"
            value={brand}
          >
            {brands.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <select
            name="category"
            onChange={handleChange}
            className="form-control"
            value={category._id}
          >
            {categories &&
              categories.map((c, i) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        {(subs.length > 0 || selectedSubs.length > 0) && (
          <div className="form-group">
            <label>Sub-Categories</label>
            <Select
              mode="multiple"
              onChange={(e) => {
                console.log(e);
                setFormData((oldData) => ({
                  ...oldData,
                  selectedSubs: e,
                }));
              }}
              className="form-control"
              value={selectedSubs}
            >
              {subs &&
                subs.length > 0 &&
                subs.map((c, i) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}
        <button className="btn btn-raised">Update Product</button>
      </form>
    </div>
  );
}

export default ProductUpdateForm;
