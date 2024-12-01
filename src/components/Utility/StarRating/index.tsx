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

  const sanitizedRating = Math.max(0, Math.min(rating, 5));

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(sanitizedRating)) {
      // Full Star
      stars.push(
        <FontAwesomeIcon key={i} icon={fullStar} className="text-tin" />
      );
    } else if (
      i - sanitizedRating < 1 &&
      sanitizedRating % 1 >= 0.25 &&
      sanitizedRating % 1 < 0.75
    ) {
      // Half Star for ratings like 4.5
      stars.push(
        <FontAwesomeIcon key={i} icon={halfStar} className="text-tin" />
      );
    } else {
      // Empty Star
      stars.push(
        <FontAwesomeIcon key={i} icon={emptyStar} className="text-tin" />
      );
    }
  }

  return <div className="star-rating flex">{stars}</div>;
};

export default StarRating;
