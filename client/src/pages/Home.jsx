import React from "react";
import HomeLayout from "../components/HomeLayout";
import AddButton from "./AddButton";
import AllDocs from "./AllDocs";

const Home = () => {
  return (
    <HomeLayout>
      <AllDocs />
    </HomeLayout>
  );
};

export default Home;
