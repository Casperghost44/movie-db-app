"use client";
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter(); // Import the useRouter hook
  const { updateModel } = useContext(AuthContext);

  useEffect(() => {
    if (user.email.length > 3 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/login", user);
    updateModel(response.data.user);
    console.log("Successfully singed in!", response.data);
    if (router) {
      router.push("/"); // Use router.push() instead of Router.push()
    }
  };

  return (
    <main className="bg-[#121212] min-h-screen p-24">
      <form className="flex flex-col gap-4" onSubmit={onLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          name="email"
          className="p-4 bg-[#000]"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          name="password"
          className="p-4 bg-[#000]"
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
          Login
        </button>
      </form>
    </main>
  );
}
