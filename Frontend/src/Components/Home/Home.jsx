import React from "react";
import left from "../../assets/images/left.png";
import arrow from "../../assets/images/arrow.png";
import "./Home.css";

const Home = () => {
  return (
    <div
      className=" lg:w-full relative p-2 mt-5 text-left flex items-center 
    justify-center flex-col  w-screen "
    >
      {/* TRY IT TEXT */}
      <toptext className="flex py-2 mt-5 items-center text-xl md:text-5xl ">
        <img src={left} className="w-15" alt="" />
        <p className="font-[font19] ">Crafted with Curiosity and Code</p>
        <img src={left} className="w-15 rotate-y-180 " alt="" />
      </toptext>

      {/* TAG LINE TEXT */}
      <p className=" font-[font10] font-extrabold w-full lg:text-9xl md:text-7xl text-3xl pt-10 ">
        <p className="font-[font10]">
          E
          <span className="lg:text-7xl md:text-5xl uppercase">ffortlessly</span>{" "}
          D<span className="lg:text-7xl md:text-5xl uppercase">esign</span>
        </p>{" "}
        W<span className="lg:text-7xl md:text-5xl uppercase">ith</span>{" "}
        <span
          className="text-violet-500 leading-2.5 mt-4 
         uppercase font-[font10]"
        >
          <span className="bgAlter">
            W<span className="lg:text-7xl md:text-5xl uppercase">ebly</span>
          </span>
        </span>{" "}
        <br />S
        <span className="lg:text-7xl md:text-5xl uppercase">tunning</span> W
        <span className="lg:text-7xl md:text-5xl uppercase ">ebsites</span>.
      </p>

      {/* ARROW */}
      <p
        className=" flex justify-center items-center
       rounded-full mt-10 md:p-1 bg-gradient-to-tl from-[#e33cefe9] 
      to-[#4cafffe9]"
      >
        <img src={arrow} className="md:w-16 w-10 animate-bounce" alt="" />
      </p>
    </div>
  );
};

export default Home;
