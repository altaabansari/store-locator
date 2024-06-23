import React from "react";
interface StarRatingProps {
  rating: number;
  maxRating?: number;
}
const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = maxRating - fullStars - halfStar;

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-500">
            &#9733;
          </span>
        ))}
      {halfStar === 1 && <span className="text-yellow-500">&#9734;</span>}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">
            &#9733;
          </span>
        ))}
    </div>
  );
};

export default StarRating;
