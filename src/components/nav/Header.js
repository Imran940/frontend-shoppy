import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "../form/Search";
import { useDispatch } from "react-redux";
const { SubMenu, Item } = Menu;
function Header() {
  const [current, setCurrent] = useState("home");
  const { user, cart } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  console.log(user);
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  let history = useHistory();
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        toast.success("user logout successfully");
        window.localStorage.removeItem("from");
        window.localStorage.removeItem("cart");
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: [],
        });
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDashboardClick = () => {
    if (user && user.role == "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ position: "relative" }}
    >
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/"> Home</Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop"> Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!user && (
        <div
          style={{
            display: "flex",
            color: "black",
            position: "absolute",
            right: "0px",
          }}
        >
          <Search />
          <Item
            key="register"
            icon={<UserAddOutlined style={{ color: "black" }} />}
          >
            <Link to="/register"> Register</Link>
          </Item>
          <Item key="login" icon={<UserOutlined style={{ color: "black" }} />}>
            <Link to="/login"> Login</Link>
          </Item>
        </div>
      )}

      {user && (
        <div
          style={{
            display: "flex",
            color: "black",
            position: "absolute",
            right: "0px",
          }}
        >
          <Search />
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={user.email.split("@")[0]} //immoshaikh91@gmail.com-> ['immoshaikh91','gmail.com']
            style={{ color: "black" }}
          >
            <Item key="setting:1" onClick={handleDashboardClick}>
              Dashboard
            </Item>
            <Item key="setting:2" icon={<LogoutOutlined />} onClick={logout}>
              Log Out
            </Item>
          </SubMenu>
        </div>
      )}
    </Menu>
  );
}

export default Header;
