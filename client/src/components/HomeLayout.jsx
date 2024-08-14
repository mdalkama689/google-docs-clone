import React, { useContext } from "react";
import googleDocsLogo from "../assets/google-docs-logo.webp";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { FaCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

const HomeLayout = ({ children }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { setUserDetails, userDetails, setIsAuthenticated } =
    useContext(AuthContext);
  const handleLogout = async (e) => {
    try {
      e.preventDefault();
 await axiosInstance.post("/logout");

      toast.success("User loggedout successfully !");
      localStorage.clear();
      setUserDetails({});
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.log("Error during logout:", error);
      const errorMessage =
        error?.response?.data?.message || "An error occurred during logout.";
      toast.error(errorMessage);
    }
  };
  const handleCopy = () => {
    toast.success("Document link copied! Share it with your friends.");
  };
  const firstCharOfLoggedInUser = userDetails.username.charAt(0).toUpperCase();
  return (
    <div className=" relative">
      <div className="flex flex-col fixed top-0 w-full z-50">
        <header className=" bg-gray-800 text-white shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              {" "}
              <img
                src={googleDocsLogo}
                alt="Google Docs Logo"
                className="h-8"
              />
            </Link>
            <Link to="/">
              {" "}
              <h1 className="text-xl font-bold">Docs</h1>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            {id && (
              <CopyToClipboard
                onCopy={handleCopy}
                text={`http://localhost:3000/docs/${id}`}
              >
                <button className=" mr-7">
                  <FaCopy size={25} />
                </button>
              </CopyToClipboard>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Logout
            </button>

            <div className="relative flex items-center ">
              <p
                alt="Profile"
                className="w-10 h-10 text-center pt-1 text-xl font-bold rounded-full border-2 border-gray-700"
              >
                {firstCharOfLoggedInUser}{" "}
              </p>
            </div>
          </nav>
        </header>
      </div>
      {children}
    </div>
  );
};

export default HomeLayout;
