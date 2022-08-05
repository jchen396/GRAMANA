import React from "react";

interface Props {
	gameStart: boolean;
	playerList: any[];
	socketId: string;
	word: string;
}

const GameHeader: React.FC<Props> = ({
	gameStart,
	playerList,
	socketId,
	word,
}) => {
	return (
		<>
			{" "}
			{(gameStart && playerList[0].id === socketId) ||
			(gameStart && playerList[1].id === socketId) ? (
				<div className="sm:text-3xl text-xl text-stone-50 flex justify-center items-center">
					<h1>YOUR WORD IS&nbsp;</h1>
					<span className="text-purple-400">{word}</span>
				</div>
			) : (gameStart && playerList[0].id !== socketId) ||
			  (gameStart && playerList[1].id === socketId) ? (
				<div className="sm:text-3xl text-xl text-stone-50 flex justify-center items-center">
					<h1>SPECTATING</h1>
				</div>
			) : (
				<div className="sm:text-3xl text-xl text-stone-50 flex justify-center items-center">
					<h1>WAITING FOR PLAYER . . .</h1>
				</div>
			)}
		</>
	);
};

export default GameHeader;
