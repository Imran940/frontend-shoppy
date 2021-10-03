import React from "react";
import Typewriter from "typewriter-effect";
import NewArrivals from "../components/Home/NewArrivals";
import BestSeller from "../components/Home/BestSeller";
import ShowCategoriesAndSubsList from "./ShowCategoriesAndSubsList";
function Home() {
  return (
    <>
      <div className="jumbotron text-center">
        <h4 className="h1 text-danger font-weight-bold">
          <Typewriter
            options={{
              strings: ["Best seller", "New Arrival"],
              autoStart: true,
              loop: true,
            }}
          />
        </h4>
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />
      <br />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSeller />
      <br />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Category List
      </h4>
      <ShowCategoriesAndSubsList check="category" />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub-Category List
      </h4>
      <ShowCategoriesAndSubsList check="sub-category" />
    </>
  );
}

export default Home;
