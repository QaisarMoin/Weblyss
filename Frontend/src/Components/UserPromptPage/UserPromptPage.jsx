import React, { useState, useContext } from "react";
import "./UserPromptPage.css";
import check from "../../assets/images/check.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useEffect } from "react";

const UserPromptPage = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const navigate = useNavigate();
  const id = nanoid(10);
  const [toggle, setToggle] = useState(false);
  const [usersData, setUsersData] = useState({});
  const [message, setMessage] = useState("");

  // Setting Up user ID
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      localStorage.setItem("userId", id);
    }
  }, []);

  // handelling the button event
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Please hold on while we generate your code.");
    setToggle(!toggle);
    try {
      const data = await axios.post(
        "https://weblyss.onrender.com/api/get-user-prompt",
        {
          userPrompt,
          userId: localStorage.getItem("userId"),
        }
      );

      console.log(JSON.parse(data.data.code.code));
      console.log(data.data.code.dependencies);

      setUsersData(data.data.code);
      navigate("/websitegenerator");
    } catch (error) {
      setMessage("Server is busy. Please try again.");
      console.log(
        "Error in handleSubmit while submitting the users Prompt ",
        error.message
      );
    }
  };

  useEffect(() => {
    const localData = localStorage.getItem("code");
    const localDependencies = localStorage.getItem("dependencies");

    if ((localData || localDependencies) && usersData) {
      localStorage.removeItem("code");
      localStorage.removeItem("dependencies");
      localStorage.setItem("code", usersData.code);
      localStorage.setItem("dependencies", usersData.dependencies);
    } else if (!localData && !localDependencies && usersData) {
      localStorage.setItem("code", usersData.code);
      localStorage.setItem("dependencies", usersData.dependencies);
    } else if (localData && localDependencies && !usersData) {
      setUsersData({
        code: localData,
        dependencies: localDependencies,
      });
    }
  }, [usersData]);

  return (
    <>
      <div
        className=" md:mt-15 lg:w-full flex lg:flex-row flex-col-reverse gap-10 md:justify-between relative w-screen 
     "
      >
        {toggle ? (
          <div className="absolute  flex justify-center items-center h-full w-full bg-black/60 z-50 flex-col gap-15">
            <div className="flipping1 sticky bottom-28 "></div>
            <p className="font-[font9] font-bold text-2xl bg-black/50 ">
              {message}
            </p>
          </div>
        ) : (
          <></>
        )}

        <section className=" lg:w-[40%] flex flex-col lg:gap-56  items-center lg:py-10 md:px-10 gap-28 min-w-[300px] ">
          {/* div 1 */}
          <div className="flex flex-col gap-4 px-2 lg:mt-56">
            <h1 className="font-[font13] text-4xl">What We Do</h1>

            <p className="font-[font9]">
              We generate fully functional websites based on your prompts.
              Simply describe what you need, and our system will instantly
              create a ready-to-run web app for you. No coding required—just
              prompt and launch!
            </p>
          </div>

          {/* div 2 */}
          <div className="flex flex-col gap-4 px-2 md:mt-15">
            <h1 className="font-[font13] text-4xl">Web App Generation</h1>

            <p className="font-[font9]">
              Your website journey starts with a simple prompt and transforms
              into a fully functional web app. We take your idea and instantly
              generate code, making web development effortless and accessible.
            </p>

            <ul>
              <li className="flex items-center gap-3">
                {" "}
                <img src={check} className="w-[15px] h-[15px]" alt="" /> Instant
                Web App Creation
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <img src={check} className="w-[15px] h-[15px]" alt="" />
                AI-Powered Code Generation
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <img src={check} className="w-[15px] h-[15px]" alt="" />
                Optimized for React Vite
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <img src={check} className="w-[15px] h-[15px]" alt="" />
                Fast and Lightweight Output
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <img src={check} className="w-[15px] h-[15px]" alt="" />
                Ready-to-Run Projects
              </li>
            </ul>
          </div>

          {/* div 3 */}
          <div className="flex flex-col gap-4 px-2 md:mt-15">
            <h1 className="font-[font13] text-4xl">How It Works</h1>

            <p className="font-[font9]">
              Transforming your ideas into functional websites has never been
              easier. Just enter a prompt, and we handle the rest!
            </p>

            <ul>
              <li className="flex items-center gap-3">
                {" "}
                <img src={check} className="w-[15px] h-[15px]" alt="" /> Enter
                Your Prompt – Describe the website you want.
              </li>

              <li className="flex items-center gap-3">
                {" "}
                <img src={check} className="w-[15px] h-[15px]" alt="" />
                Generate Instantly – Our system creates a functional web app.
              </li>

              <li className="flex items-center gap-3">
                {" "}
                <img src={check} className="w-[15px] h-[15px]" alt="" />
                Run and Test – Get your project up and running in seconds.
              </li>
            </ul>
          </div>
        </section>

        <section
          className="md:top-10 lg:sticky lg:w-[60%]  md:h-[45%] rounded-2xl
       flex flex-col md:gap-4 justify-center items-center py-10  w-screen 
       "
        >
          <p className="font-[font13] md:text-4xl">What do you want to Build</p>

          <form
            onSubmit={HandleSubmit}
            className=" min-w-[300px] max-w-[70%] h-fit flex items-center colorfullborder
           p-5 rounded-2xl bg-gradient-to-r from-[#67186d7a] to-[#0d4878aa] "
          >
            <textarea
              name=""
              id=""
              cols="30"
              rows="3"
              placeholder="Enter your prompt here"
              required={true}
              onChange={(e) => {
                setUserPrompt(e.target.value);
              }}
              className=" rounded-xl outline-none p-4 h-full resize-none w-screen md:w-full "
            >
              {console.log(userPrompt)}
            </textarea>
            {toggle ? (
              <div class="flipping"></div>
            ) : (
              <button
                className={` h-fit p-2 rounded-md bg-gradient-to-tl from-[#000] 
            to-[#4cafffe9]  hover:to-[#e33cefe9] transition duration-300 ease-out ${
              toggle ? "cursor-not-allowed" : "cursor-pointer"
            } `}
              >
                submit
              </button>
            )}
          </form>
          <p>Prompt and run web apps instantly.</p>
        </section>
      </div>
    </>
  );
};

export default UserPromptPage;
