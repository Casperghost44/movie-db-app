"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import MovieCard from "../components/MovieCard";
import CreateButton from "../components/CreateButton";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const response = axios
      .get("/api/movies")
      .then((data) => setMovies(data.data.movies));
  }, []);

  return (
    <main className="bg-[#121212] min-h-screen p-24">
      {movies.map((item) => (
        <MovieCard key={item._id} data={item} />
      ))}
      <CreateButton />
    </main>
  );
}
