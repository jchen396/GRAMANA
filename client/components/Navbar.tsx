import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleMenuHandler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };
  return (
    <>
      <div
        onClick={toggleMenuHandler}
        className="absolute right-4 z-30 top-4 space-y-2"
      >
        <div
          className={`w-8 h-0.5 bg-gray-600 transform transition duration-500 ease-in-out ${
            toggle ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></div>
        <div
          className={`w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out ${
            toggle ? "opacity-0" : "opacity-1"
          }`}
        ></div>
        <div
          className={`w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out ${
            toggle ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></div>
      </div>
      <div
        className={`z-20 py-10 absolute flex flex-col w-screen justify-center items-center space-y-5 bg-neutral-700  transform transition duration-500 ease-in-out ${
          toggle ? "translate-y-0 opacity-1" : "opacity-0 -translate-y-full"
        }`}
      >
        <Link href="/">
          <a className="text-4xl text-stone-400 hover:text-stone-50">Home</a>
        </Link>
        <br />
        <Link href="/browse">
          <a className="text-4xl text-stone-400 hover:text-stone-50">Browse</a>
        </Link>
        <br />
        <Link href="/about">
          <a className="text-4xl text-stone-400 hover:text-stone-50">About</a>
        </Link>
        <br />
        <Link href="/howtoplay">
          <a className="text-4xl text-stone-400 hover:text-stone-50">
            How To Play
          </a>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
