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

export default function CreateDirector() {
  const [director, setDirector] = useState({
    firstName: "",
    lastName: "",
    movies: [],
    dob: undefined,
    age: undefined,
  });

  const [disabled, setDisabled] = useState(true);

  const { router } = useRouter();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (
      director.firstName.length > 0 &&
      director.lastName.length > 0 &&
      director.dob &&
      director.age
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [director]);

  const convert = async (e) => {
    try {
      const base64String = await fileToBase64(e.target.files[0]);
      setDirector({ ...director, imageUrl: base64String });
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  useEffect(() => {
    const response = axios
      .get("/api/movies")
      .then((data) => setMovies(data.data.movies));
  }, []);

  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log(director);
    const response = await axios.post("/api/directors", director);
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
          onChange={(e) =>
            setDirector({ ...director, firstName: e.target.value })
          }
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          className="p-4 bg-[#000]"
          onChange={(e) =>
            setDirector({ ...director, lastName: e.target.value })
          }
        />
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          name="dob"
          className="p-4 bg-[#000]"
          onChange={(e) => setDirector({ ...director, dob: e.target.value })}
        />
        <label htmlFor="movies">Movies</label>
        <select
          onChange={(e) =>
            setDirector({
              ...director,
              movies: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            })
          }
          multiple
          name="movies"
          className="bg-[#000] p-4"
        >
          {movies &&
            movies.map((item) => (
              <option value={item._id}>{item.title}</option>
            ))}
        </select>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          className="p-4 bg-[#000]"
          onChange={(e) => setDirector({ ...director, age: e.target.value })}
        />
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
