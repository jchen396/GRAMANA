import React, { useRef, useEffect, useState } from "react";
import socket from "./Socket";
const PlayScreen = () => {
	let initialArr: string[] = [];

	// For loops will generate an array of empty strings
	for (let i = 0; i < 64; i++) {
		initialArr.push("");
	}
	const [word, setWord] = useState<string>("");
	const [availableLetters, setAvaialbleLetters] = useState<string[]>([]);
	const [gameStart, setGameStart] = useState<boolean>(false);
	const [playerName, setPlayerName] = useState<string>("");
	const [playerTurn, setPlayerTurn] = useState<string>("");
	const [playerList, setPlayerList] = useState<any[]>([]);
	const [tiles, setTiles] = useState(initialArr);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [isWin, setIsWin] = useState<boolean>(false);
	const [playerColor, setPlayerColor] = useState<string>("red");
	const [boardColor, setBoardColor] = useState({});
	const [selectedDiv, setSelectedDiv] = useState<HTMLDivElement | null>(null);
	const [turn, setTurn] = useState(0);
	const [showResult, setShowResult] = useState<boolean>(false);
	const [winner, setWinner] = useState<string>("");
	const [winWord, setWinWord] = useState<string>("");
	const refs = useRef<any>([...new Array(64)].map(() => React.createRef()));
	useEffect(() => {
		socket.on(
			"start",
			(userList, RANDOM_ANAGRAM_LIST: string[], playerObj) => {
				setGameStart(true);
				setPlayerList(userList);
				setPlayerTurn(userList[0].id);
				setPlayerName(userList[playerObj[socket.id]].name);
				setWord(
					RANDOM_ANAGRAM_LIST[playerObj[socket.id]].toUpperCase()
				);
				setAvaialbleLetters(
					RANDOM_ANAGRAM_LIST[playerObj[socket.id]]
						.toUpperCase()
						.split("")
				);
				socket.emit("turn", userList[0].id);
			}
		);
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
				socket.emit("turn", userList[1].id);
			} else {
				setPlayerColor("red");
				setPlayerTurn(userList[0].id);
				socket.emit("turn", userList[0].id);
			}
		});
		socket.on("result", (wordResult: string, nameResult: string) => {
			setShowResult(true);
			setWinner(nameResult);
			setWinWord(wordResult);
		});
		return () => {
			socket.off("start");
			socket.off("play");
			socket.off("result");
		};
	}, []);
	useEffect(() => {
		// CHECK LEFT TO RIGHT
		const checkLeftRight = () => {
			if (isWin === false) {
				let rightCharacters =
					availableLetters.length -
					1 -
					availableLetters.indexOf(tiles[selectedIndex]);
				let leftCharacters = availableLetters.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of availableLetters array
					if (rightCharacters === 0) rightCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) +
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
					//check left side of availableLetters array
					if (leftCharacters === 0) leftCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex - i] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) -
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
					availableLetters.length -
					1 -
					availableLetters.indexOf(tiles[selectedIndex]);
				let leftCharacters = availableLetters.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of availableLetters array
					if (rightCharacters === 0) rightCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex - i] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) +
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
					//check left side of availableLetters array
					if (leftCharacters === 0) leftCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex + i] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) -
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
					availableLetters.length -
					1 -
					availableLetters.indexOf(tiles[selectedIndex]);
				let leftCharacters = availableLetters.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of availableLetters array
					if (rightCharacters === 0) rightCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex + i * 8] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex + i * 8]
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
					//check left side of availableLetters array
					if (leftCharacters === 0) leftCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex - i * 8] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex - i * 8]
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
					availableLetters.length -
					1 -
					availableLetters.indexOf(tiles[selectedIndex]);
				let leftCharacters = availableLetters.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of availableLetters array
					if (rightCharacters === 0) rightCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex - i * 8] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex - i * 8]
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
					//check left side of availableLetters array
					if (leftCharacters === 0) leftCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex + i * 8] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex + i * 8]
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
					availableLetters.length -
					1 -
					availableLetters.indexOf(tiles[selectedIndex]);
				let leftCharacters = availableLetters.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of availableLetters array
					if (rightCharacters === 0) rightCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex - i * 7] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex - i * 7]
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
					//check left side of availableLetters array
					if (leftCharacters === 0) leftCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex + i * 7] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex + i * 7]
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
					availableLetters.length -
					1 -
					availableLetters.indexOf(tiles[selectedIndex]);
				let leftCharacters = availableLetters.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of availableLetters array
					if (rightCharacters === 0) rightCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex - i * 9] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) +
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
					//check left side of availableLetters array
					if (leftCharacters === 0) leftCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex + i * 9] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) -
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
		const checkDownLeft = () => {
			if (isWin === false) {
				let rightCharacters =
					availableLetters.length -
					1 -
					availableLetters.indexOf(tiles[selectedIndex]);
				let leftCharacters = availableLetters.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of availableLetters array
					if (rightCharacters === 0) rightCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex + i * 7] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) +
								i
						] === tiles[selectedIndex + i * 7]
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
					//check left side of availableLetters array
					if (leftCharacters === 0) leftCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex - i * 7] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) -
								i
						] === tiles[selectedIndex - i * 7]
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
					availableLetters.length -
					1 -
					availableLetters.indexOf(tiles[selectedIndex]);
				let leftCharacters = availableLetters.indexOf(
					tiles[selectedIndex]
				);
				let rightCheck = false;
				let leftCheck = false;
				if (rightCharacters === 0) rightCheck = true;
				for (let i = 1; i < rightCharacters + 1; i++) {
					//check right side of availableLetters array
					if (rightCharacters === 0) rightCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) + i
						] === tiles[selectedIndex + i * 9] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) +
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
					//check left side of availableLetters array
					if (leftCharacters === 0) leftCheck = true;
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex - i * 9] ||
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex], 2) -
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
			socket.emit("result", word, playerName);
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
		if (gameStart && playerTurn == socket.id && showResult === false) {
			// This function will read the keyboard and input character if it is part of the word
			const inputTile = (keyPressEvent: any) => {
				let inputChar;
				if (
					availableLetters.includes(keyPressEvent.key.toUpperCase())
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
	const resetHandler = () => {
		setShowResult(false);
	};
	return (
		<div className=" relative m-20 sm:p-10 p-8 sm:w-full md:w-3/4 lg:w-1/2 sm:h-4/5 h-3/4 bg-neutral-800 rounded-2xl place-content-center place-items-center">
			{gameStart ? (
				<div className="text-3xl text-stone-50 flex justify-center items-center">
					<h1>YOUR WORD IS&nbsp;</h1>
					<span className="text-purple-400">{word}</span>
				</div>
			) : (
				<div className="text-3xl text-stone-50 flex justify-center items-center">
					<h1>WAITING FOR PLAYER . . .</h1>
				</div>
			)}
			<br />
			<div className="m-10 grid grid-cols-8 gap-y-4">
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
		</div>
	);
};

export default PlayScreen;
