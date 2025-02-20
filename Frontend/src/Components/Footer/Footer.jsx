import React from "react";
import {
  FaSquareInstagram,
  FaXTwitter,
  FaLinkedin,
  FaSquareGithub,
} from "react-icons/fa6";
import "../Home/Home.css";
import { Link } from "react-router-dom";

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
        <Link
          to="https://www.linkedin.com/in/qaisar-moin-884918253/"
          className="flex gap-2 justify-center items-center bgAlter "
        >
          <FaLinkedin className="md:text-2xl " />
          Linkedin
        </Link>
        <Link
          to="https://github.com/QaisarMoin"
          className="flex gap-2 justify-center items-center bgAlter"
        >
          <FaSquareGithub className="md:text-2xl" />
          Github
        </Link>
        <Link
          to="https://x.com/_qaisarmoin"
          className="flex gap-2 justify-center items-center bgAlter"
        >
          <FaXTwitter className="md:text-2xl" />
          X.com
        </Link>
        <Link
          to="https://www.instagram.com/qaisarmoin_/"
          className="flex gap-2 justify-center items-center bgAlter"
        >
          {" "}
          <FaSquareInstagram className="md:text-2xl" /> Instagram
        </Link>
      </p>
    </div>
  );
};

export default Footer;
