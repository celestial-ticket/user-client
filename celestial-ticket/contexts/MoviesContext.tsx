import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../mutations/movie";

const MovieContext = createContext(null);

export const MoviesProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  return (
    <MovieContext.Provider value={{ data, loading, error }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
