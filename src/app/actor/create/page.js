"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function fileToBase64(inputFile) {
  return new Promise((resolve, reject) => {
    if (!inputFile) {
      reject("No file provided");
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const base64String = fileReader.result.split(",")[1]; // Extract base64 string from data URL
      resolve(base64String);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };

    fileReader.readAsDataURL(inputFile);
  });
}

export default function CreateActor() {
  const [actor, setActor] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    age: undefined,
    movies: [],
    imageUrl: "",
  });

  const [disabled, setDisabled] = useState(true);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const response = axios
      .get("/api/movies")
      .then((data) => setMovies(data.data.movies));
  }, []);
  const { router } = useRouter();

  const handleChangeMovieList = function (e) {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setActor({ ...actor, movies: value });
  };

  useEffect(() => {
    if (
      actor.firstName.length > 0 &&
      actor.lastName.length > 0 &&
      actor.imageUrl.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [actor]);

  const convert = async (e) => {
    try {
      const base64String = await fileToBase64(e.target.files[0]);
      setActor({ ...actor, imageUrl: base64String });
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log(actor);
    const response = await axios.post("/api/actors", actor);
    if (router) {
      router.push("/");
    }
  };

  return (
    <main className="bg-[#121212] min-h-screen p-24">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          className="p-4 bg-[#000]"
          onChange={(e) => setActor({ ...actor, firstName: e.target.value })}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          className="p-4 bg-[#000]"
          onChange={(e) => setActor({ ...actor, lastName: e.target.value })}
        />
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          name="dob"
          className="p-4 bg-[#000]"
          onChange={(e) => setActor({ ...actor, dob: e.target.value })}
        />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          className="p-4 bg-[#000]"
          onChange={(e) => setActor({ ...actor, age: e.target.value })}
        />
        <label htmlFor="movies">Movies</label>
        <select
          onChange={(e) => handleChangeMovieList(e)}
          multiple
          name="movies"
          className="bg-[#000] p-4"
        >
          {movies &&
            movies.map((item) => (
              <option value={item._id}>{item.title}</option>
            ))}
        </select>
        <label htmlFor="imageUrl">Image</label>
        <input type="file" name="imageUrl" onChange={(e) => convert(e)} />
        <button
          type="submit"
          disabled={disabled}
          className={
            disabled
              ? "bg-transparent p-3 transition-all"
              : "bg-[#ae3ec9] p-3 transition-all"
          }
        >
          Create
        </button>
      </form>
    </main>
  );
}
