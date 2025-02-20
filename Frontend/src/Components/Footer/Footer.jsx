import React from "react";
import {
  FaSquareInstagram,
  FaXTwitter,
  FaLinkedin,
  FaSquareGithub,
} from "react-icons/fa6";
import "../Home/Home.css";

const Footer = () => {
  return (
    <div className="mt-10 md:w-full w-screen relative bottom-0 border-t px-4 p-10">
      {/* Webite Name */}
      <p className="font-[font10] font-bold md:text-4xl text-2 bgAlter text-right ">
        Webly
      </p>

      {/* Creator Name */}
      <p className="mt-5 ">
        {" "}
        <span className="font-[font10] font-bold text-xl">
          Created by -{" "}
        </span>{" "}
        <span className="font-[font9] font-bold text-2xl bgAlter">
          Mohd Qaisar Moin
        </span>
      </p>

      {/* Connect */}
      <p className=" flex gap-4 md:flex-nowrap flex-wrap justify-evenly items-center font-[font9] mt-5 md:text-xl font-bold ">
        <p className="flex gap-2 justify-center items-center bgAlter ">
          <FaLinkedin className="md:text-2xl " />
          Linkedin
        </p>
        <p className="flex gap-2 justify-center items-center bgAlter">
          <FaSquareGithub className="md:text-2xl" />
          Github
        </p>
        <p className="flex gap-2 justify-center items-center bgAlter">
          <FaXTwitter className="md:text-2xl" />
          X.com
        </p>
        <p className="flex gap-2 justify-center items-center bgAlter">
          {" "}
          <FaSquareInstagram className="md:text-2xl" /> Instagram
        </p>
      </p>
    </div>
  );
};

export default Footer;
