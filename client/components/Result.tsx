import React from "react";

interface Props {
	showResult: boolean;
	winner: string;
	winWord: string;
	resetHandler: Function;
}

const Result: React.FC<Props> = ({
	showResult,
	winner,
	winWord,
	resetHandler,
}) => {
	return (
		<>
			{" "}
			{showResult ? (
				<div className="absolute inset-1/4 w-1/2 h-1/4 bg-neutral-700 rounded-2xl flex flex-col justify-center items-center gap-y-6">
					<h1 className="text-stone-50 text-2xl">
						{winner} has won with the word{" "}
						<span className="text-purple-400">{winWord}</span>
					</h1>
					<button
						onClick={() => resetHandler()}
						className="w-1/3 h-1/5 bg-emerald-600 hover:bg-emerald-400 rounded-full"
					>
						Play again
					</button>
				</div>
			) : null}
		</>
	);
};

export default Result;
