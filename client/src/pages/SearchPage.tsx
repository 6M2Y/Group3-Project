import React from "react";
import { useParams } from "react-router-dom";

export const SearchPage = () => {
  let { query } = useParams();

  return <h1>Search reasult for {query}</h1>;
};
