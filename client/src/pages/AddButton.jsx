import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { v4 as UUIDV4 } from "uuid";

const AddButton = () => {
  const id = UUIDV4();
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/${id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className=" flex cursor-pointer  items-center justify-center bg-red-200 py-4 h-[260px]  w-[215px] rounded transition duration-300 hover:border border-blue-800"
    >
      <button className=" flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200">
        <FaPlus size={96} />
      </button>
    </div>
  );
};

export default AddButton;
