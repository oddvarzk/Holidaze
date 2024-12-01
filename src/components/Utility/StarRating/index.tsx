import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fullStar,
  faStarHalfAlt as halfStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <FontAwesomeIcon key={i} icon={fullStar} className="text-yellow-500" />
      );
    } else if (i - rating < 1) {
      stars.push(
        <FontAwesomeIcon key={i} icon={halfStar} className="text-yellow-500" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={emptyStar} className="text-gray-300" />
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

export default StarRating;
