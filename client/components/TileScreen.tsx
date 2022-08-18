import React from "react";

interface Props {
	avaialableLetters: string[];
}

const TileScreen: React.FC<Props> = ({ avaialableLetters }) => {
	const newAvaialbleLetters: string[] = [...new Set(avaialableLetters)].sort(
		(a, b) => (a < b ? -1 : 1)
	);
	const selectLetterHandler = (e: any) => {
		console.log(e.target.innerText);
	};
	return (
		<div className="sm:hidden relative m-2 p-2 bg-neutral-800 w-screen rounded-2xl h-1/4">
			<div className="flex p-2 m-2 justify-between items-center ">
				{newAvaialbleLetters?.map((letter) => (
					<div
						onClick={selectLetterHandler}
						className="w-14 h-14 rounded bg-emerald-600 hover:bg-emerald-400 flex justify-center items-center space-x-1 text-2xl "
					>
						{letter}
					</div>
				))}
			</div>
		</div>
	);
};

export default TileScreen;
