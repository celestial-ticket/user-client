import React, { createContext, useState, useContext } from "react";

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [movieId, setMovieId] = useState("");

  return (
    <MovieContext.Provider value={{ movieId, setMovieId }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
