import React from "react";
import { BounceLoader } from "react-spinners";

const LoadingItems = () => {
  return (
    <div className="d-flex m-4">
      <div className="m-auto">
        <BounceLoader size={60} />
      </div>
    </div>
  );
};

export default LoadingItems;
