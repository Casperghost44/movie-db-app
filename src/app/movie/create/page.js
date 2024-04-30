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

export default function Create() {
  const [actorsData, setActorsData] = useState([]);

  const [disabled, setDisabled] = useState(true);

  const [directorsData, setDirectorsData] = useState([]);

  useEffect(() => {
    const response = axios
      .get("/api/actors")
      .then((data) => setActorsData(data.data.actors));
  }, []);

  useEffect(() => {
    const response = axios
      .get("/api/directors")
      .then((data) => setDirectorsData(data.data.directors));
  }, []);

  const { router } = useRouter();

  const handleChangeActorList = function (e) {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setMovie({ ...movie, cast: value });
  };

  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    dor: undefined,
    length: undefined,
    imagePath: "",
    cast: [],
    director: "",
  });

  useEffect(() => {
    if (
      movie.title.length > 0 &&
      movie.genre.length > 0 &&
      movie.imagePath.length > 0 &&
      movie.cast.length > 0 &&
      movie.director.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [movie]);

  const convert = async (e) => {
    try {
      const base64String = await fileToBase64(e.target.files[0]);
      setMovie({ ...movie, imagePath: base64String });
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log(movie);
    const response = await axios.post("/api/movies", movie);
    if (router) {
      router.push("/");
    }
  };

  return (
    <main className="bg-[#121212] min-h-screen p-24">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="title">Movie Title</label>
        <input
          type="text"
          name="title"
          className="p-4 bg-[#000]"
          onChange={(e) => setMovie({ ...movie, title: e.target.value })}
        />
        <label htmlFor="genre">Movie Genre</label>
        <input
          type="text"
          name="genre"
          className="p-4 bg-[#000]"
          onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
        />
        <label htmlFor="dor">Movie Release date</label>
        <input
          type="date"
          name="dor"
          className="p-4 bg-[#000]"
          onChange={(e) => setMovie({ ...movie, dor: e.target.value })}
        />
        <label htmlFor="actors">Actors</label>
        <select
          onChange={(e) => handleChangeActorList(e)}
          multiple
          name="actors"
          className="bg-[#000] p-4"
        >
          {actorsData &&
            actorsData.map((item) => (
              <option value={item._id} key={item._id}>
                {item.firstName} {item.lastName}
              </option>
            ))}
        </select>
        <label htmlFor="director">Director</label>
        <select
          name="director"
          onChange={(e) => {
            setMovie({ ...movie, director: e.target.value });
          }}
          className="bg-[#000] p-4"
        >
          {directorsData &&
            directorsData.map((item) => (
              <option value={item._id} key={item._id}>
                {item.firstName} {item.lastName}
              </option>
            ))}
        </select>
        <label htmlFor="length">Movie Lenght (in minutes)</label>
        <input
          type="number"
          name="length"
          className="p-4 bg-[#000]"
          onChange={(e) => setMovie({ ...movie, length: e.target.value })}
        />
        <label htmlFor="imagePath">Image</label>
        <input type="file" name="imagePath" onChange={(e) => convert(e)} />
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
