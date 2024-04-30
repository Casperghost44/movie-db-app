import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navigation = ({ data }) => {
  return (
    <div className="bg-[#1f2326] max-h-[500px] p-3 max-w-[50%] flex gap-8 rounded-lg mb-8">
      <Image
        height={0}
        width={0}
        src={data.imagePath}
        alt="Spider man"
        className="w-96 h-auto object-cover rounded-lg"
        unoptimized
      />
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-[32px] text-[#c5f6fa]">{data.title}</h4>
        <div className="flex gap-10 items-center">
          <span className="bg-gradient-to-r font-semibold from-[#c5f6fa] to-[#ae3ec9] inline-block py-2 px-4 text-[#1f2326] rounded-[20px]">
            {data.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
