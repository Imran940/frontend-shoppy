import React, { useEffect } from "react";
import Login from "./pages/auth/Login";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import SideDrawer from "./components/drawer/SideDrawer";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import ForgetPassword from "./pages/auth/ForgetPassword";
import { currentUser } from "./functions/auth";
import UserRoute from "./components/routes/UserRoute";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import { useSelector } from "react-redux";
import AdminNav from "./components/nav/AdminNav";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductShow from "./pages/admin/product/ProductShow";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import ShowCategoryAndSubsProducts from "./pages/ShowCategoryAndSubsProducts";
import Checkout from "./pages/Checkout";
import CouponCreate from "./pages/admin/coupon/CouponCreate";
import Payment from "./pages/Payment";
import Demo from "./Demo";
function App() {
  let dispatch = useDispatch();
  const { user, drawer } = useSelector((state) => ({ ...state }));
  let history = useHistory();
  const roleBasedRedirect = (role) => {
    console.log("called");
    if (role !== "admin") {
      history.push("/user/history");
    } else {
      history.push("/admin/dashboard");
    }
  };

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await (await user.getIdTokenResult()).token;
        currentUser(token)
          .then((resp) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: resp.data.email,
                token,
                name: resp.data.name,
                role: resp.data.role,
                _id: resp.data._id,
              },
            });
            roleBasedRedirect(resp.data.role);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        dispatch({
          type: "LOGOUT_USER",
          payload: null,
        });
      }
    });
    //cleanup
    return () => unsubsribe();
  }, []);
  return (
    <>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug">
          <ShowCategoryAndSubsProducts check={"category"} />
        </Route>
        <Route
          exact
          path="/sub-category/:slug"
          //  component={}
        >
          <ShowCategoryAndSubsProducts check={"sub-category"} />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forget/password" component={ForgetPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/coupon" component={CouponCreate} />
      </Switch>
    </>
  );
}

export default App;
