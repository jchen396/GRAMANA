import React from "react";

interface Props {
	avaialableLetters: string[];
	selectLetterHandler: Function;
	tileRefs: any;
}

const TileScreen: React.FC<Props> = ({
	avaialableLetters,
	selectLetterHandler,
	tileRefs,
}) => {
	const newAvaialbleLetters: string[] = [...new Set(avaialableLetters)].sort(
		(a, b) => (a < b ? -1 : 1)
	);
	return (
		<div className="sm:hidden relative m-2 p-2 bg-neutral-800 w-screen rounded-2xl h-1/4">
			<div className="flex p-2 m-2 justify-between items-center ">
				{newAvaialbleLetters?.map((letter, key) => (
					<div
						ref={tileRefs.current[key]}
						key={key}
						onClick={(e) => selectLetterHandler(e)}
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
