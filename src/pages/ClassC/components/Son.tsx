import React from "react";
import { useLocation, useMatch } from "react-router";

const Son = () => {
  const location = useLocation();
  const match = useMatch(location.pathname);
  console.log(match);
  return <div>son</div>;
};

export default Son;
