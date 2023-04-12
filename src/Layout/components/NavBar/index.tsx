import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  console.log(pathSnippets);
  const baseBreadCrumbItem = [
    {
      title: <Link to="/">Home</Link>,
      key: "home",
    },
  ];

  // const extraBreadcrumbItems = pathSnippets.reduce((pre, cur) => {}, []);

  // const extraBreadcrumbItems = pathSnippets.map((_, index) => {
  //   const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
  //   return {
  //     key: url,
  //     title: <Link to={url}>{[url]}</Link>,
  //   };
  // });

  // const breadcrumbItems = [
  //   {
  //     title: <Link to="/">Home</Link>,
  //     key: "home",
  //   },
  // ].concat(extraBreadcrumbItems);

  console.log(location);
  return <>111</>;
};

export default NavBar;
