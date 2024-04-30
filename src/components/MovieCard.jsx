import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  return (
    <div className="bg-[#1f2326] max-h-[500px] p-3 max-w-[50%] flex gap-8 rounded-lg mb-8">
      <Image
        height={0}
        width={0}
        src={"/ems.jpeg"}
        alt="Spider man"
        className="w-96 h-auto object-cover rounded-lg"
        unoptimized
      />
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-[32px] text-[#c5f6fa]">
          Spider-man: No Way Home
        </h4>
        <div className="flex gap-10 items-center">
          <span className="bg-gradient-to-r font-semibold from-[#c5f6fa] to-[#ae3ec9] inline-block py-2 px-4 text-[#1f2326] rounded-[20px]">
            Action
          </span>
          <Link
            href={"#"}
            className="underline text-[#ae3ec9] font-bold flex items-center gap-2"
          >
            <Image width={0} height={0} src={"/star.svg"} className="h-5 w-5" />
            4.6
          </Link>
        </div>
        <Link href={"#"} className="text-[#ae3ec9]">
          Ditrector name
        </Link>
        <div className="flex gap-1 flex-wrap">
          <Link href={"#"} className="text-[#c5f6fa] underline">
            Tom Holland
          </Link>
          <Link href={"#"} className="text-[#c5f6fa] underline">
            Tom Holland
          </Link>
          <Link href={"#"} className="text-[#c5f6fa] underline">
            Tom Holland
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
