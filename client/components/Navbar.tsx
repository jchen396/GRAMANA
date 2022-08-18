import Link from "next/link";

const Navbar = () => {
	return (
		<div className="absolute top-0 w-screen flex flex-row justify-end items-center space-x-10 p-20">
			<Link href="/">
				<a className="text-4xl text-stone-200">Home</a>
			</Link>
			<Link href="/about">
				<a className="text-4xl text-stone-400 hover:text-stone-50">
					About
				</a>
			</Link>
		</div>
	);
};

export default Navbar;
