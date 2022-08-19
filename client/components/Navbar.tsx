import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
	const [toggle, setToggle] = useState<boolean>(false);
	const toggleMenuHandler = () => {
		toggle ? setToggle(false) : setToggle(true);
	};
	return (
		<>
			<div className="hidden sm:block absolute top-0 w-screen flex flex-row justify-end items-center space-x-10 p-20">
				<Link href="/">
					<a className="text-4xl text-stone-200">Home</a>
				</Link>
				<Link href="/about">
					<a className="text-4xl text-stone-400 hover:text-stone-50">
						About
					</a>
				</Link>
			</div>
			<div
				onClick={toggleMenuHandler}
				className="absolute right-4 z-10 top-4 space-y-2"
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
			{toggle ? (
				<div className="py-10 absolute flex flex-col w-screen justify-center items-center space-y-5 bg-neutral-800">
					<Link href="/">
						<a className="text-4xl text-stone-200">Home</a>
					</Link>
					<br />
					<Link href="/about">
						<a className="text-4xl text-stone-400 hover:text-stone-50">
							About
						</a>
					</Link>
				</div>
			) : null}
		</>
	);
};

export default Navbar;
