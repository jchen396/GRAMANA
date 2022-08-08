import React from "react";

interface Props {
	showResult: boolean;
	winner: string;
	winWord: string;
	resetHandler: Function;
	playerName: string;
	wordOptions: string[];
}

const Result: React.FC<Props> = ({
	showResult,
	winner,
	winWord,
	resetHandler,
	playerName,
	wordOptions,
}) => {
	return (
		<>
			{" "}
			{showResult && playerName === winner ? (
				<div className="absolute inset-1/4 w-1/2 h-1/4 bg-neutral-700 rounded-2xl flex flex-col justify-center items-center gap-y-4">
					<h1 className="text-stone-50 text-2xl">
						{winner} has won with the word{" "}
						<span className="text-purple-400">{winWord}</span>
					</h1>
					<p>Choose next word: </p>
					<div className="w-full flex justify-center items-center">
						{wordOptions.map((nextWord: string, key: number) => (
							<button
								key={key}
								onClick={(e) => resetHandler(e)}
								className="p-2 px-8 mx-4 bg-purple-600 hover:bg-purple-400 rounded"
							>
								{nextWord[0].toUpperCase()}
							</button>
						))}
					</div>
				</div>
			) : showResult && playerName !== winner ? (
				<div className="absolute inset-1/4 w-1/2 h-1/4 bg-neutral-700 rounded-2xl flex flex-col justify-center items-center gap-y-6">
					<h1 className="text-stone-50 text-2xl">
						{winner} has won with the word{" "}
						<span className="text-purple-400">{winWord}</span>
					</h1>
					<button className="w-1/2 h-1/5 bg-stone-600 hover:bg-stone-400 rounded-full ">
						Waiting for new word . . .
					</button>
				</div>
			) : null}
		</>
	);
};

export default Result;
