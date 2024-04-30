import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  const token = request.cookies.get("token")?.value || "";
  if (token !== "") {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken;
  }
  return undefined;
};
