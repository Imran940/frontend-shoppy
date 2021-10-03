import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminProductCard from "../components/Cards/AdminProductCard";
import { fetchProductsByFilter, getProductByCount } from "../functions/product";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { getAllCategories } from "../functions/category";
import Star from "../components/form/Star";
import { getAllSubs } from "../functions/sub";
import { useDispatch } from "react-redux";
const { SubMenu } = Menu;
function Shop() {
  let dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [priceOk, setPriceOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "Asus",
    "Roadster",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "White",
    "Brown",
    "Silver",
    "Blue",
  ]);
  const [star, setStar] = useState("");
  const [sub, setSub] = useState({});
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const { user, search } = useSelector((state) => ({ ...state }));
  let queryText = search.text;
  useEffect(() => {
    setLoading(true);
    getAllCategories().then((resp) => {
      setCategories(resp.data);
    });
    getAllSubs().then((resp) => setSubs(resp.data));

    if (queryText == "") {
      loadAllProducts();
    }
  }, [queryText]);

  const loadAllProducts = () => {
    getProductByCount(30)
      .then((resp) => {
        setLoading(false);
        setProducts(resp.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  //for query text
  useEffect(() => {
    resetOtherFilterOptions("text");
    setLoading(true);
    console.log(queryText);
    const delayed = setTimeout(() => {
      if (queryText) {
        fetchproductsBasedOnQuery({ query: queryText });
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [queryText]);

  // For price filter
  useEffect(() => {
    fetchproductsBasedOnQuery({ price });
  }, [priceOk]);
  const handlePriceChange = (value) => {
    resetOtherFilterOptions("price");
    setPrice(value);
    setTimeout(() => {
      setPriceOk(!priceOk);
    }, 300);
  };

  //for category
  useEffect(() => {
    if (categoryIds.length > 0) {
      fetchproductsBasedOnQuery({ category: categoryIds });
    }
  }, [categoryIds]);
  const handleCategoryChange = (e) => {
    resetOtherFilterOptions("category");
    let categoryArray = [...categoryIds];
    let justChecked = e.target.value;
    let foundInPrevCategories = categoryArray.indexOf(justChecked);
    console.log(foundInPrevCategories);
    if (foundInPrevCategories == -1) {
      categoryArray.push(justChecked);
    } else {
      categoryArray.splice(foundInPrevCategories, 1);
    }
    console.log(categoryArray);
    if (categoryArray.length == 0) {
      loadAllProducts();
    }
    setCategoryIds(categoryArray);
  };

  const resetOtherFilterOptions = (currentOption) => {
    currentOption != "text" &&
      dispatch({
        type: "SEARCH_QUERY",
        payload: {
          text: "",
        },
      });
    currentOption != "price" && setPrice([0, 0]);
    currentOption != "category" && setCategoryIds([]);
    currentOption != "star" && setStar("");
    currentOption != "brand" && setBrand("");
    currentOption != "color" && setColor("");
    currentOption != "shipping" && setShipping("");
    currentOption != "subs" && setSub({});
  };
  //for stars
  const handleStarClick = (num) => {
    resetOtherFilterOptions("star");
    setStar(num);
    fetchproductsBasedOnQuery({ stars: num });
  };

  //for subs
  const handleSubClick = (sub) => {
    resetOtherFilterOptions("subs");
    setSub(sub);
    fetchproductsBasedOnQuery({ subs: sub });
  };

  //for brand
  const handleBrandChnage = (e) => {
    resetOtherFilterOptions("brand");
    setBrand(e.target.value);
    fetchproductsBasedOnQuery({ brand: e.target.value });
  };

  //for colors
  const handleColorChange = (e) => {
    resetOtherFilterOptions("color");
    setColor(e.target.value);
    fetchproductsBasedOnQuery({ color: e.target.value });
  };
  const handleShippingChange = (e) => {
    resetOtherFilterOptions("shipping");
    setShipping(e.target.value);
    fetchproductsBasedOnQuery({ shipping: e.target.value });
  };
  const fetchproductsBasedOnQuery = (query) => {
    fetchProductsByFilter(query)
      .then((resp) => {
        setLoading(false);
        setProducts(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4>Search/Filter</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span>
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `₹${v}`}
                  range
                  value={price}
                  onChange={handlePriceChange}
                  max="200000"
                />
              </div>
            </SubMenu>
            <SubMenu
              key="2"
              title={
                <span>
                  <DownSquareOutlined /> Category
                </span>
              }
            >
              {categories?.map((c) => (
                <div key={c._id}>
                  <Checkbox
                    value={c._id}
                    className="pb-2 pl-4 pr-4"
                    name="category"
                    onChange={handleCategoryChange}
                    checked={categoryIds.includes(c._id)}
                  >
                    {c.name}
                  </Checkbox>
                </div>
              ))}
            </SubMenu>
            <SubMenu
              key="3"
              title={
                <span>
                  <StarOutlined /> Stars
                </span>
              }
            >
              <div className="pr-4 pl-4 pb-2">
                <Star starClick={handleStarClick} numberOfStars={5} />
                <Star starClick={handleStarClick} numberOfStars={4} />
                <Star starClick={handleStarClick} numberOfStars={3} />
                <Star starClick={handleStarClick} numberOfStars={2} />
                <Star starClick={handleStarClick} numberOfStars={1} />
              </div>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span>
                  <TagOutlined /> Sub Category
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pl-4 pr-5">
                {subs.map((s, i) => (
                  <div
                    onClick={() => handleSubClick(s)}
                    style={{ cursor: "pointer" }}
                    key={i}
                    className="p-1 m-1 badge badge-secondary"
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span>
                  <TagOutlined /> Brands
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pl-4 pr-5">
                {brands.map((b, i) => (
                  <div>
                    <Radio
                      value={b}
                      name={b}
                      checked={b === brand}
                      onChange={handleBrandChnage}
                    >
                      {b}
                    </Radio>
                  </div>
                ))}
              </div>
            </SubMenu>
            <SubMenu
              key="5"
              title={
                <span>
                  <TagOutlined /> Colors
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pl-4 pr-5">
                {colors.map((c, i) => (
                  <div>
                    <Radio
                      value={c}
                      name={c}
                      checked={c === color}
                      onChange={handleColorChange}
                      className="pb-1 pl-1 pr-4"
                    >
                      {c}
                    </Radio>
                  </div>
                ))}
              </div>
            </SubMenu>
            <SubMenu
              key="6"
              title={
                <span>
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div className="pb-2">
                <Radio
                  value={"Yes"}
                  className="pb-2 pl-4 pr-4"
                  name="category"
                  onChange={handleShippingChange}
                  checked={shipping == "Yes" && true}
                >
                  Yes
                </Radio>
                <Radio
                  value={"No"}
                  className="pb-2 pl-4 pr-4"
                  name="category"
                  onChange={handleShippingChange}
                  checked={shipping == "No" && true}
                >
                  No
                </Radio>
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length < 1 && <h3>No Products Found</h3>}
          <div className="row pb-5">
            {products.map((p, i) => (
              <div key={i} className="col-md-4 mt-3">
                <AdminProductCard
                  product={p}
                  check={user?.role == "admin" ? "admin" : "subscriber"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
