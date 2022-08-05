import React, { useEffect, useState } from "react";
import socket from "./Socket";

interface Props {
	gameStart: boolean;
}

const GameTimer: React.FC<Props> = ({ gameStart }) => {
	const [timer, setTimer] = useState<number>(10);
	useEffect(() => {
		socket.on("timer", (timerCounter) => {
			setTimer(timerCounter);
		});
	});
	return (
		<>
			{gameStart ? (
				<div className="absolute right-6 top-6 w-16 h-16 border-2 border-stone-400 rounded-full flex justify-center items-center">
					<h1 className="text-stone-50 text-3xl">{timer}</h1>
				</div>
			) : null}
		</>
	);
};

export default GameTimer;
