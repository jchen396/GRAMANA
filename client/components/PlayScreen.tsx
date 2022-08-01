import React, { useRef, useEffect, useState, createRef } from "react";
import socket from "./Socket";
const AVAILABLE_LETTERS = "GREEN".split("");
const PlayScreen = () => {
	let initialArr: string[] = [];

	// For loops will generate an array of empty strings
	for (let i = 0; i < 100; i++) {
		initialArr.push("");
	}
	const [gameStart, setGameStart] = useState<boolean>(false);
	const [playerTurn, setPlayerTurn] = useState<string>("");
	const [playerList, setPlayerList] = useState<any[]>([]);
	const [tiles, setTiles] = useState(initialArr);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [isWin, setIsWin] = useState<boolean>(false);
	const [playerColor, setPlayerColor] = useState<string>("red");
	const [boardColor, setBoardColor] = useState({});
	const [selectedDiv, setSelectedDiv] = useState<HTMLDivElement | null>(null);
	const [turn, setTurn] = useState(0);
	const refs = useRef<any>([...new Array(100)].map(() => React.createRef()));
	useEffect(() => {
		socket.on("start", (userList) => {
			setGameStart(true);
			setPlayerList(userList);
			setPlayerTurn(userList[0].id);
		});
		socket.on("play", (grid, board, color, userList) => {
			setTiles(grid);
			setBoardColor({ ...boardColor, ...board });
			grid.forEach((value: any, key: number) => {
				if (board[key]) {
					if (board[key] == "red") {
						refs.current[key].current.classList.add(`bg-red-400`);
					} else {
						refs.current[key].current.classList.add(`bg-blue-400`);
					}
				} else {
					refs.current[key]?.current.classList.remove(`bg-blue-400`);
					refs.current[key]?.current.classList.remove(`bg-red-400`);
				}
			});
			if (color === "red") {
				setPlayerColor("blue");
				setPlayerTurn(userList[1].id);
			} else {
				setPlayerColor("red");
				setPlayerTurn(userList[0].id);
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
						] === tiles[selectedIndex + i * 10] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex + i * 10]
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
						] === tiles[selectedIndex - i * 10] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex - i * 10]
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
						] === tiles[selectedIndex - i * 10] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex - i * 10]
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
						] === tiles[selectedIndex + i * 10] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex + i * 10]
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
						] === tiles[selectedIndex - i * 9] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex - i * 9]
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
						] === tiles[selectedIndex + i * 9] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex + i * 9]
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
						] === tiles[selectedIndex + i * 9] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex + i * 9]
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
						] === tiles[selectedIndex - i * 9] ||
						AVAILABLE_LETTERS[
							AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex - i * 9]
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
		socket.emit("play", tiles, boardColor, prevColor);
	}, [turn]);
	//This function will be invoked whenever a tile is clicked
	const selectTile = (key: number, divEvent: any) => {
		console.log(playerTurn, socket.id);
		if (gameStart && playerTurn == socket.id) {
			// This function will read the keyboard and input character if it is part of the word
			const inputTile = (keyPressEvent: any) => {
				let inputChar;
				if (
					AVAILABLE_LETTERS.includes(keyPressEvent.key.toUpperCase())
				) {
					inputChar = keyPressEvent.key.toUpperCase();
					setSelectedIndex(key);
					setTiles([
						...tiles.slice(0, key),
						inputChar,
						...tiles.slice(key + 1, tiles.length),
					]);
					setTurn((prev) => prev + 1);
					setSelectedDiv(null);
					if (playerColor === "red") {
						setPlayerColor("blue");
						setPlayerTurn(playerList[1].id);
						setBoardColor({ ...boardColor, [key]: "red" });
					} else {
						setPlayerColor("red");
						setPlayerTurn(playerList[0].id);
						setBoardColor({ ...boardColor, [key]: "blue" });
					}
				}
				window.removeEventListener("keypress", inputTile);
			};
			if (selectedDiv !== null) {
				if (playerColor == "red") {
					selectedDiv.classList.remove(`bg-red-400`);
				} else {
					selectedDiv.classList.remove(`bg-blue-400`);
				}
			}
			setSelectedDiv(divEvent.target);
			if (playerColor == "red") {
				divEvent.target.classList.add(`bg-red-400`);
			} else {
				divEvent.target.classList.add(`bg-blue-400`);
			}
			if (tiles[key] === "") {
				window.addEventListener("keypress", inputTile);
			}
		}
	};
	return (
		<div className="m-20 sm:p-10 p-8 grid grid-cols-10 gap-y-4 sm:w-full md:w-3/4 lg:w-1/2 sm:h-4/5 h-3/4 bg-neutral-800 rounded place-content-center place-items-center">
			{tiles.map((value, key) => (
				<div
					ref={refs.current[key]}
					className={`text-stone-50 text-4xl font-bold font-mono rounded sm:w-14 sm:h-14 w-12 h-12 border-4 border-purple-600 hover:border-green-100 flex justify-center items-center `}
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
