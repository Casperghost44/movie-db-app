"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";

export default function SignUp() {
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter(); // Import the useRouter hook

  useEffect(() => {
    if (
      user.email.length > 3 &&
      user.password.length > 0 &&
      user.confirmPassword === user.password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const onSignUp = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/signup", user);
    console.log("Sign up Success", response.data);
    if (router) {
      router.push("/login");
    }
  };

  return (
    <main className="bg-[#121212] min-h-screen p-24">
      <form className="flex flex-col gap-4" onSubmit={onSignUp}>
        <label htmlFor="email">Email</label>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          name="email"
          className="p-4 bg-[#000]"
        />
        <label htmlFor="password">Password</label>
        <input
          value={user.password}
          type="password"
          name="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-4 bg-[#000]"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          type="password"
          name="confirmPassword"
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
          Sing up
        </button>
      </form>
    </main>
  );
}
