import React from "react";
import StarRating from "react-star-ratings";
function ShowAverageRating({ ratings }) {
  let averageRating;
  if (Array.isArray(ratings)) {
    let sumStar = 0;
    let starLength = ratings.length;
    for (let i = 0; i < ratings.length; i++) {
      sumStar = sumStar + ratings[i].star;
    }
    console.log(sumStar);
    averageRating = sumStar / starLength;
    console.log(averageRating);
  }
  return (
    <div>
      <StarRating
        numberOfStars={5}
        rating={averageRating}
        starRatedColor="red"
        editing={false}
        starDimension="22px"
        starSpacing="2px"
      />{" "}
      ({ratings.length})
    </div>
  );
}

export default ShowAverageRating;
