import e from "express";
import React, { useRef, useEffect, useState, createRef } from "react";
import io from "socket.io-client";

const AVAILABLE_LETTERS = "PURPLE".split("");
const SERVER = "http://localhost:8080";
const socket = io(SERVER);
const PlayScreen = () => {
	let initialArr: string[] = [];

	// For loops will generate an array of empty strings
	for (let i = 0; i < 144; i++) {
		initialArr.push("");
	}
	const [tiles, setTiles] = useState(initialArr);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isWin, setIsWin] = useState(false);
	const [playerColor, setPlayerColor] = useState("red");
	const [selectedDiv, setSelectedDiv] = useState<HTMLDivElement | null>(null);
	const [turn, setTurn] = useState(0);
	const refs = useRef<any>([...new Array(144)].map(() => React.createRef()));
	useEffect(() => {
		socket.on("connect", () => console.log(socket.id));
		socket.on("play", (index, grid, color) => {
			console.log(`client received ${index}, $${grid}, ${color}`);
			setSelectedIndex(index);
			setTiles(grid);
			if (index !== -1) {
				refs.current[index].current.classList.add(`bg-${color}-600`);
			}
			if (playerColor === "red") {
				setPlayerColor("blue");
			} else {
				setPlayerColor("red");
			}
		});
		return () => {
			socket.off("connect");
			socket.off("play");
		};
	}, []);
	useEffect(() => {
		// CHECK LEFT TO RIGHT
		const checkLeftRight = () => {
			if (isWin === false) {
				let rightCharacters =
					AVAILABLE_LETTERS.length -
					1 -
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
				let leftCharacters = AVAILABLE_LETTERS.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of AVAILABLE_LETTERS array
					if (rightCharacters === 0) rightCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex + i] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex + i]
					) {
						if (i === rightCharacters) {
							rightCheck = true;
						}
						continue;
					} else break;
					rightCheck = true;
				}
				if (leftCharacters === 0) leftCheck = true;
				for (let i = 1; i < leftCharacters + 1; i++) {
					//check left side of AVAILABLE_LETTERS array
					if (leftCharacters === 0) leftCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex - i] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex - i]
					) {
						if (i === leftCharacters || leftCharacters === 0) {
							leftCheck = true;
						}
						continue;
					} else break;
				}
				if (rightCheck && leftCheck) {
					setIsWin(true);
				}
			}
		};
		//CHECK RIGHT TO LEFT
		const checkRightLeft = () => {
			if (isWin === false) {
				let rightCharacters =
					AVAILABLE_LETTERS.length -
					1 -
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
				let leftCharacters = AVAILABLE_LETTERS.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of AVAILABLE_LETTERS array
					if (rightCharacters === 0) rightCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex - i] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex - i]
					) {
						if (i === rightCharacters) {
							rightCheck = true;
						}
						continue;
					} else break;
					rightCheck = true;
				}
				if (leftCharacters === 0) leftCheck = true;
				for (let i = 1; i < leftCharacters + 1; i++) {
					//check left side of AVAILABLE_LETTERS array
					if (leftCharacters === 0) leftCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex + i] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex + i]
					) {
						if (i === leftCharacters || leftCharacters === 0) {
							leftCheck = true;
						}
						continue;
					} else break;
				}
				if (rightCheck && leftCheck) {
					setIsWin(true);
				}
			}
		};
		const checkUpDown = () => {
			if (isWin === false) {
				let rightCharacters =
					AVAILABLE_LETTERS.length -
					1 -
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
				let leftCharacters = AVAILABLE_LETTERS.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of AVAILABLE_LETTERS array
					if (rightCharacters === 0) rightCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex + i * 12] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex + i * 12]
					) {
						if (i === rightCharacters) {
							rightCheck = true;
						}
						continue;
					} else break;
					rightCheck = true;
				}
				if (leftCharacters === 0) leftCheck = true;
				for (let i = 1; i < leftCharacters + 1; i++) {
					//check left side of AVAILABLE_LETTERS array
					if (leftCharacters === 0) leftCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex - i * 12] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex - i * 12]
					) {
						if (i === leftCharacters || leftCharacters === 0) {
							leftCheck = true;
						}
						continue;
					} else break;
				}
				if (rightCheck && leftCheck) {
					setIsWin(true);
				}
			}
		};
		const checkDownUp = () => {
			if (isWin === false) {
				let rightCharacters =
					AVAILABLE_LETTERS.length -
					1 -
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
				let leftCharacters = AVAILABLE_LETTERS.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of AVAILABLE_LETTERS array
					if (rightCharacters === 0) rightCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex - i * 12] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex - i * 12]
					) {
						if (i === rightCharacters) {
							rightCheck = true;
						}
						continue;
					} else break;
					rightCheck = true;
				}
				if (leftCharacters === 0) leftCheck = true;
				for (let i = 1; i < leftCharacters + 1; i++) {
					//check left side of AVAILABLE_LETTERS array
					if (leftCharacters === 0) leftCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex + i * 12] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex + i * 12]
					) {
						if (i === leftCharacters || leftCharacters === 0) {
							leftCheck = true;
						}
						continue;
					} else break;
				}
				if (rightCheck && leftCheck) {
					setIsWin(true);
				}
			}
		};
		const checkUpRight = () => {
			if (isWin === false) {
				let rightCharacters =
					AVAILABLE_LETTERS.length -
					1 -
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
				let leftCharacters = AVAILABLE_LETTERS.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of AVAILABLE_LETTERS array
					if (rightCharacters === 0) rightCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex - i * 11] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex - i * 11]
					) {
						if (i === rightCharacters) {
							rightCheck = true;
						}
						continue;
					} else break;
					rightCheck = true;
				}
				if (leftCharacters === 0) leftCheck = true;
				for (let i = 1; i < leftCharacters + 1; i++) {
					//check left side of AVAILABLE_LETTERS array
					if (leftCharacters === 0) leftCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex + i * 11] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex + i * 11]
					) {
						if (i === leftCharacters || leftCharacters === 0) {
							leftCheck = true;
						}
						continue;
					} else break;
				}
				if (rightCheck && leftCheck) {
					setIsWin(true);
				}
			}
		};
		const checkUpLeft = () => {
			if (isWin === false) {
				let rightCharacters =
					AVAILABLE_LETTERS.length -
					1 -
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
				let leftCharacters = AVAILABLE_LETTERS.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of AVAILABLE_LETTERS array
					if (rightCharacters === 0) rightCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex - i * 13] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex - i * 13]
					) {
						if (i === rightCharacters) {
							rightCheck = true;
						}
						continue;
					} else break;
					rightCheck = true;
				}
				if (leftCharacters === 0) leftCheck = true;
				for (let i = 1; i < leftCharacters + 1; i++) {
					//check left side of AVAILABLE_LETTERS array
					if (leftCharacters === 0) leftCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex + i * 13] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex + i * 13]
					) {
						if (i === leftCharacters || leftCharacters === 0) {
							leftCheck = true;
						}
						continue;
					} else break;
				}
				if (rightCheck && leftCheck) {
					setIsWin(true);
				}
			}
		};
		const checkDownLeft = () => {
			if (isWin === false) {
				let rightCharacters =
					AVAILABLE_LETTERS.length -
					1 -
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
				let leftCharacters = AVAILABLE_LETTERS.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of AVAILABLE_LETTERS array
					if (rightCharacters === 0) rightCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex + i * 11] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex + i * 11]
					) {
						if (i === rightCharacters) {
							rightCheck = true;
						}
						continue;
					} else break;
					rightCheck = true;
				}
				if (leftCharacters === 0) leftCheck = true;
				for (let i = 1; i < leftCharacters + 1; i++) {
					//check left side of AVAILABLE_LETTERS array
					if (leftCharacters === 0) leftCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex - i * 11] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex - i * 11]
					) {
						if (i === leftCharacters || leftCharacters === 0) {
							leftCheck = true;
						}
						continue;
					} else break;
				}
				if (rightCheck && leftCheck) {
					setIsWin(true);
				}
			}
		};
		const checkDownRight = () => {
			if (isWin === false) {
				let rightCharacters =
					AVAILABLE_LETTERS.length -
					1 -
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
				let leftCharacters = AVAILABLE_LETTERS.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of AVAILABLE_LETTERS array
					if (rightCharacters === 0) rightCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex + i * 13] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex + i * 13]
					) {
						if (i === rightCharacters) {
							rightCheck = true;
						}
						continue;
					} else break;
					rightCheck = true;
				}
				if (leftCharacters === 0) leftCheck = true;
				for (let i = 1; i < leftCharacters + 1; i++) {
					//check left side of AVAILABLE_LETTERS array
					if (leftCharacters === 0) leftCheck = true;
					if (
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex - i * 13] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex - i * 13]
					) {
						if (i === leftCharacters || leftCharacters === 0) {
							leftCheck = true;
						}
						continue;
					} else break;
				}
				if (rightCheck && leftCheck) {
					setIsWin(true);
				}
			}
		};
		checkLeftRight();
		checkRightLeft();
		checkUpDown();
		checkDownUp();
		checkUpRight();
		checkUpLeft();
		checkDownLeft();
		checkDownRight();
		//check game status
		if (isWin) {
			console.log(`${playerColor} lost the game!`);
		}
	}, [selectedIndex, tiles, isWin, playerColor]);
	//Emitting socket.io event after every valid input && pass new Color
	useEffect(() => {
		let prevColor;
		if (playerColor === "red") {
			prevColor = "blue";
		} else {
			prevColor = "red";
		}
		socket.emit("play", selectedIndex, tiles, prevColor);
	}, [turn]);
	//This function will be invoked whenever a tile is clicked
	const selectTile = (key: number, divEvent: any) => {
		// This function will read the keyboard and input character if it is part of "PURPLE"
		const inputTile = (keyPressEvent: any) => {
			let inputChar;
			if (AVAILABLE_LETTERS.includes(keyPressEvent.key.toUpperCase())) {
				keyPressEvent.preventDefault();
				inputChar = keyPressEvent.key.toUpperCase();
				setSelectedIndex(key);
				setTiles([
					...tiles.slice(0, key),
					inputChar,
					...tiles.slice(key + 1, tiles.length),
				]);
				setTurn((prev) => prev + 1);
				if (playerColor === "red") {
					setPlayerColor("blue");
				} else {
					setPlayerColor("red");
				}
			}
			window.removeEventListener("keypress", inputTile);
		};
		if (selectedDiv !== null) {
			selectedDiv.classList.remove(`bg-${playerColor}-600`);
		}
		setSelectedDiv(divEvent.target);
		divEvent.target.classList.add(`bg-${playerColor}-600`);
		console.log(divEvent.target);
		if (tiles[key] === "") {
			window.addEventListener("keypress", inputTile);
		}
	};
	return (
		<div className="grid grid-cols-12 gap-2 s:w-full md:w-1/2 lg:w-1/3 h-1/2">
			{tiles.map((value, key) => (
				<div
					ref={refs.current[key]}
					className={`text-slate-900 rounded s:w-6 s:h-6 w-8 h-8 border-2 border-red-200 hover:border-blue-200 flex justify-center items-center `}
					onClick={(event) => selectTile(key, event)}
					key={key}
				>
					{value}
				</div>
			))}
		</div>
	);
};

export default PlayScreen;
