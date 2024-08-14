import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const handleRenderedValue = (eachDocs) => {
  {
    if (eachDocs?.data === "") {
      return <p className=" text-center font-bold text-xl">Empty docs </p>;
    }
    const image = eachDocs?.data?.ops[0]?.insert?.image;
    if (image) {
      return (
        <img
          src={image}
          alt="Document content"
          className="w-full h-auto object-cover"
        />
      );
    }
    const text = eachDocs?.data?.ops[0]?.insert;
    return <p>{text?.slice(0, 30)}</p>;
  }
};

const EachDocs = () => {
  const [allDocs, setAllDocs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAllDocs = async () => {
      try {
        const response = await axiosInstance.get("/all/docs");

        const fetchAllDocs = response.data.allDocs;

        setAllDocs(fetchAllDocs);
      } catch (error) {
        console.log("Error during logout:", error);
        const errorMessage =
          error?.response?.data?.message || "An error occurred during logout.";
        toast.error(errorMessage);
      }
    };
    if (location.pathname === "/") {
      handleAllDocs();
    }
  }, [location]);

  const handleNavigateToDocs = (eachDocs) => {
    navigate(`/docs/${eachDocs?._id}`);
  };

  const shortMonthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const handleFormateDate = (value) => {
    const date = new Date(value);

    const getYear = date.getFullYear();
    const getMonth = date.getMonth();
    const getDate = date.getDate();

    const formattedYear = `${getDate} ${shortMonthName[getMonth]} ${getYear}`;
    return formattedYear;
  };

  return (
    <>
      {allDocs.map((eachDocs) => (
        <div
          onClick={() => handleNavigateToDocs(eachDocs)}
          key={eachDocs._id}
          className=" bg-gray-200 py-4 cursor-pointer   w-[215px] rounded transition duration-300 hover:border border-blue-800"
        >
          <div className="h-[200px] px-3">{handleRenderedValue(eachDocs)}</div>

          <p className=" text-center font-bold text-base">
            {handleFormateDate(eachDocs?.createdAt)}
          </p>
        </div>
      ))}
    </>
  );
};

export default EachDocs;
