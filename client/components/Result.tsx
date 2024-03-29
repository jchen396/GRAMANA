import { dividerClasses } from "@mui/material";
import React from "react";

interface Props {
	showResult: boolean;
	winner: string;
	winWord: string;
	resetHandler: Function;
	playerName: string;
	wordOptions: string[];
	isFilled: boolean;
	filledHandler: Function;
}

const Result: React.FC<Props> = ({
	showResult,
	winner,
	winWord,
	resetHandler,
	playerName,
	wordOptions,
	isFilled,
	filledHandler,
}) => {
	return (
		<>
			{" "}
			{showResult && playerName === winner ? (
				<div className="absolute top-1/2 sm:inset-1/4 w-full sm:w-1/2 h-1/2 sm:h-1/4 bg-neutral-700 rounded-2xl flex flex-col justify-center items-center gap-y-4">
					<h1 className="text-stone-50 text-xl sm:text-2xl">
						{winner} has won with the word{" "}
						<span className="text-purple-400">{winWord}</span>
					</h1>
					<p>Choose next word: </p>
					<div className="w-full flex justify-center items-center">
						{wordOptions.map((nextWord: string, key: number) => (
							<button
								key={key}
								onClick={(e) => resetHandler(e)}
								className="p-1 sm:p-2 px-4 sm:px-8 mx-2 sm:mx-4 bg-purple-600 hover:bg-purple-400 rounded"
							>
								{nextWord[0].toUpperCase()}
							</button>
						))}
					</div>
				</div>
			) : showResult && playerName !== winner && isFilled === false ? (
				<div className="absolute top-1/2 sm:inset-1/4 w-full sm:w-1/2 h-1/2 sm:h-1/4 bg-neutral-700 rounded-2xl flex flex-col justify-center items-center gap-y-6">
					<h1 className="text-stone-50 text-xl sm:text-2xl">
						{winner} has won with the word{" "}
						<span className="text-purple-400">{winWord}</span>
					</h1>
					<button className="w-3/4 sm:w-1/2 sm:h-1/5 bg-stone-600 hover:bg-stone-400 rounded-full ">
						Waiting for new word . . .
					</button>
				</div>
			) : showResult && isFilled === true ? (
				<div className="absolute top-1/2 sm:inset-1/4 w-full sm:w-1/2 h-1/4 bg-neutral-700 rounded-2xl flex flex-col justify-center items-center gap-y-6">
					<h1 className="text-stone-50 text-2xl">
						The match resulted in a draw.
						<span className="text-purple-400">{winWord}</span>
					</h1>
					<button
						onClick={() => filledHandler()}
						className="p-2 px-8 mx-4 bg-purple-600 hover:bg-purple-400 rounded"
					>
						Play Again
					</button>
				</div>
			) : null}
		</>
	);
};

export default Result;
