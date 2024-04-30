import React from "react";
import Link from "next/link";

const CreateButton = () => {
  return <Link href={"/createMovie"}>Add new Movie</Link>;
};

export default CreateButton;
