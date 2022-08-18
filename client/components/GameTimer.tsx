import React, { useEffect, useState } from "react";
import socket from "./Socket";

interface Props {
	gameStart: boolean;
	playerTurn: string;
	playerColor: string;
	winner: string;
	winnerId: number | null;
	playerName: string;
	showResult: boolean;
	wordOptions: string[];
}

const GameTimer: React.FC<Props> = ({
	gameStart,
	playerTurn,
	playerColor,
	winner,
	winnerId,
	playerName,
	showResult,
	wordOptions,
}) => {
	const [timer, setTimer] = useState<number>(15);
	useEffect(() => {
		socket.on("timer", (timerCounter) => {
			setTimer(timerCounter);
			if (
				timerCounter === 0 &&
				socket.id === playerTurn &&
				showResult === false
			) {
				socket.emit("skipTurn", playerColor);
			}
			if (timerCounter === 0 && showResult === true) {
				socket.emit("skipTurn", playerColor);
				const nextWord = wordOptions[Math.floor(Math.random() * 3)][0];
				socket.emit("reset", winnerId, nextWord);
			}
		});
		return () => {
			socket.off("timer");
		};
	}, [
		playerTurn,
		playerColor,
		showResult,
		playerName,
		winner,
		winnerId,
		wordOptions,
	]);
	return (
		<>
			{gameStart ? (
				<div className="absolute right-2 sm:right-6 top-2 sm:top-6  w-10 sm:w-16 h-10 sm:h-16 border-2 border-stone-400 rounded-full flex justify-center items-center">
					<h1 className="text-stone-50 text-xl sm:text-3xl">
						{timer}
					</h1>
				</div>
			) : null}
		</>
	);
};

export default GameTimer;
