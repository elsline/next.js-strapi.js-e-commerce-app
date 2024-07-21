import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


function SkeletonCard2({ cards, height }) {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <div className=" " key={index}>
        <Skeleton height={height} />
      </div>
    ));
}

export default SkeletonCard2;
