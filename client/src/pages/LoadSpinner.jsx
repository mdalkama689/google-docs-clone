import React from "react";
import { TailSpin } from "react-loader-spinner";

const LoadSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default LoadSpinner;
