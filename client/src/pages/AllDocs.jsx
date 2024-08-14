import React from "react";
import EachDocs from "./EachDocs";
import AddButton from "./AddButton";

const AllDocs = () => {
  return (
    <div className=" mt-28 ml-10 mb-10 flex items-center justify-center gap-6 flex-wrap">
      <AddButton />
      <EachDocs />
    </div>
  );
};

export default AllDocs;
