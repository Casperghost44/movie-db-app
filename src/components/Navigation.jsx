"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

const Navigation = () => {
  const { userModel } = useContext(AuthContext);

  console.log(userModel);
  return (
    <div className="flex gap-6 p-6 bg-[#121212]">
      <Link href={"/"} className="text-[#c5f6fa] text-xl">
        Movies
      </Link>
      <Link href={"/actor"} className="text-[#c5f6fa] text-xl">
        Actors
      </Link>
      <Link href={"/director"} className="text-[#c5f6fa] text-xl">
        Directors
      </Link>
      {userModel ? (
        <div className="flex ml-auto gap-4 items-center">
          <span>
            Welcome back, <br />
            {userModel.email}
          </span>
          <button className="p-4 bg-red-600">Sign out!</button>
        </div>
      ) : (
        <div className="flex gap-6 ml-auto items-center">
          <Link
            href={"/login"}
            className="text-[#ae3ec9] text-xl font-semibold"
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className="bg-[#c5f6fa] text-[#121212] p-2 text-xl font-semibold ml-auto rounded-xl"
          >
            Sing up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
