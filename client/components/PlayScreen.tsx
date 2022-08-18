import React, { useRef, useEffect, useState } from "react";
import GameHeader from "./GameHeader";
import Result from "./Result";
import socket from "./Socket";
import GameTimer from "./GameTimer";
import TileScreen from "./TileScreen";
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
	const [winnerId, setWinnerId] = useState<number | null>(null);
	const [winWord, setWinWord] = useState<string>("");
	const [wordOptions, setWordOptions] = useState<string[]>([]);
	const [currentScore, setCurrentScore] = useState<number>(0);
	const [isFilled, setIsFilled] = useState<boolean>(false);
	const [tileInput, setTileInput] = useState<string | null>(null);
	const refs = useRef<any>([...new Array(64)].map(() => React.createRef()));
	const tileRefs = useRef<any>(
		[...new Array(5)].map(() => React.createRef())
	);

	useEffect(() => {
		socket.on("reset", (userList, newNextWord, playerObj) => {
			setIsFilled(false);
			setShowResult(false);
			setIsWin(false);
			setTiles(initialArr);
			setWinner("");
			setWinWord("");
			setBoardColor({});
			setPlayerList(userList);
			setPlayerTurn(userList[0].id);
			setPlayerColor("red");
			tiles.forEach((value: any, key: any) => {
				refs.current[key].current.classList.remove("bg-red-400");
				refs.current[key].current.classList.remove("bg-blue-400");
			});
			if (playerObj.hasOwnProperty(socket.id)) {
				setWord(newNextWord[playerObj[socket.id]].toUpperCase());
				setAvaialbleLetters(
					newNextWord[playerObj[socket.id]].toUpperCase().split("")
				);
			}
			socket.emit("turn", userList[0].id);
		});
		socket.on("validate", (userList) => {
			setGameStart(true);
			setPlayerList(userList);
		});
		socket.on(
			"start",
			(userList, RANDOM_ANAGRAM_LIST: string[], playerObj) => {
				setPlayerTurn(userList[0].id);
				if (playerObj.hasOwnProperty(socket.id)) {
					setPlayerName(userList[playerObj[socket.id]].name);
					setWord(
						RANDOM_ANAGRAM_LIST[playerObj[socket.id]].toUpperCase()
					);
					setAvaialbleLetters(
						RANDOM_ANAGRAM_LIST[playerObj[socket.id]]
							.toUpperCase()
							.split("")
					);
				}
				socket.emit("turn", userList[0].id);
				socket.emit("timer", "red");
			}
		);
		socket.on("play", (grid, board, color, newIndex, userList) => {
			let checkFilled = true;
			setTiles(grid);
			setSelectedIndex(newIndex);
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
					checkFilled = false;
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
			if (checkFilled === true) {
				setIsFilled(checkFilled);
				setShowResult(true);
			}
		});
		socket.on(
			"result",
			(
				wordResult: string,
				nameResult: string,
				idResult: number,
				randomWordList: string[]
			) => {
				setShowResult(true);
				setWinnerId(idResult);
				setWinner(nameResult);
				setWinWord(wordResult);
				setWordOptions(randomWordList);
			}
		);
		socket.on("skipTurn", (userList: any, color: string) => {
			if (color == "red") {
				setPlayerColor("blue");
				setPlayerTurn(userList[1].id);
				socket.emit("turn", userList[1].id);
			} else {
				setPlayerColor("red");
				setPlayerTurn(userList[0].id);
				socket.emit("turn", userList[0].id);
			}
		});
		return () => {
			socket.off("start");
			socket.off("reset");
			socket.off("play");
			socket.off("result");
			socket.off("skipTurn");
		};
	}, []);
	useEffect(() => {
		let checkWin = false;
		// Function for checking tiles in all directions
		const checkDirection = (prevTile: number, nextTile: number): void => {
			if (checkWin === false) {
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
				else {
					for (let i = 1; i < rightCharacters; i++) {
						//check right side of availableLetters array
						if (
							availableLetters[
								availableLetters.indexOf(tiles[selectedIndex]) +
									i
							] === tiles[selectedIndex + i * nextTile]
						) {
							if (i === rightCharacters) {
								rightCheck = true;
							}
							continue;
						} else break;
						rightCheck = true;
					}
				}
				if (leftCharacters === 0) leftCheck = true;
				for (let i = 1; i < leftCharacters + 1; i++) {
					//check left side of availableLetters array
					if (
						availableLetters[
							availableLetters.indexOf(tiles[selectedIndex]) - i
						] === tiles[selectedIndex + i * prevTile]
					) {
						if (i === leftCharacters) {
							leftCheck = true;
						}
						continue;
					} else break;
				}
				if (rightCheck && leftCheck) {
					checkWin = true;
					setIsWin(true);
					setCurrentScore((prevState) => prevState + 1);
					return;
				}
				// If the letter is a duplicate
				if (availableLetters.indexOf(tiles[selectedIndex], 2) !== -1) {
					let rightCharacters =
						availableLetters.length -
						1 -
						availableLetters.indexOf(tiles[selectedIndex], 2);
					let leftCharacters = availableLetters.indexOf(
						tiles[selectedIndex],
						2
					);
					let rightCheck = false;
					let leftCheck = false;
					if (rightCharacters === 0) rightCheck = true;
					else {
						for (let i = 1; i < rightCharacters + 1; i++) {
							//check right side of availableLetters array
							if (
								availableLetters[
									availableLetters.indexOf(
										tiles[selectedIndex],
										2
									) + i
								] === tiles[selectedIndex + i * nextTile]
							) {
								if (
									i === rightCharacters ||
									rightCharacters === 0
								) {
									rightCheck = true;
								}
								continue;
							} else break;
							rightCheck = true;
						}
					}
					if (leftCharacters === 0) leftCheck = true;
					for (let i = 1; i < leftCharacters + 1; i++) {
						//check left side of availableLetters array
						if (
							availableLetters[
								availableLetters.indexOf(
									tiles[selectedIndex],
									2
								) - i
							] === tiles[selectedIndex + i * prevTile]
						) {
							if (i === leftCharacters) {
								leftCheck = true;
							}
							continue;
						} else break;
					}
					if (rightCheck && leftCheck) {
						checkWin = true;
						setIsWin(true);
						setCurrentScore((prevState) => prevState + 1);
						return;
					}
				}
			}
		};
		checkDirection(-1, 1); //CHECK LEFT TO RIGHT
		checkDirection(1, -1); //CHECK RIGHT TO LEFT
		checkDirection(8, -8); //CHECK BOTTOM TO TOP
		checkDirection(-8, 8); //CHECK TOP TO BOTTOM
		checkDirection(7, -7); //CHECK BOTTOMLEFT TO TOPRIGHT
		checkDirection(9, -9); //CHECK BOTTOMRIGHT TO TOPLEFT
		checkDirection(-7, 7); //CHECK TOPRIGHT TO BOTTOMLEFT
		checkDirection(-9, 9); //CHECK TOPLEFT TO BOTTOMRIGHT
	}, [selectedIndex, tiles, playerColor]);
	useEffect(() => {
		//check game status
		if (isWin)
			socket.emit("result", word, playerName, currentScore, socket.id);
	}, [isWin]);
	//Emitting socket.io event after every valid input && pass new Color
	useEffect(() => {
		let prevColor;
		if (playerColor === "red") {
			prevColor = "blue";
		} else {
			prevColor = "red";
		}
		socket.emit("play", tiles, boardColor, selectedIndex, prevColor);
	}, [turn]);
	//This function will be invoked whenever a tile is clicked
	const selectTile = (key: number, divEvent: any) => {
		if (gameStart && playerTurn == socket.id && showResult === false) {
			// This function will read the tile screen by a click event listener
			const clickInputTile = (e: any) => {
				let inputChar = e.target.innerText;
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
				window.removeEventListener("keypress", pressInputTile);
				tileRefs.current.forEach((curr: any) =>
					curr?.current?.removeEventListener("click", clickInputTile)
				);
			};
			// This function will read the keyboard and input character if it is part of the word
			const pressInputTile = (keyPressEvent: any) => {
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
				window.removeEventListener("keypress", pressInputTile);
				tileRefs.current.forEach((curr: any) =>
					curr?.current?.removeEventListener("click", clickInputTile)
				);
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
				tileRefs.current.forEach((curr: any) =>
					curr?.current?.addEventListener("click", clickInputTile)
				);
				window.addEventListener("keypress", pressInputTile);
			}
		}
	};
	const resetHandler = (e: any) => {
		let nextWord = e.target.textContent;
		socket.emit("reset", winnerId, nextWord);
	};
	const filledHandler = () => {
		socket.emit("filled");
	};
	const selectLetterHandler = (e: any) => {
		setTileInput(e.target.InnerHTML);
	};
	return (
		<>
			<div className=" relative sm:m-20 m-4 sm:m-10 sm:p-10 p-2 w-screen sm:w-full md:w-3/4 lg:w-1/2 sm:h-4/5 h-1/2 bg-neutral-800 rounded-2xl place-content-center place-items-center">
				<div className=" ">
					<GameHeader
						socketId={socket.id}
						playerList={playerList}
						gameStart={gameStart}
						word={word}
					/>
					<GameTimer
						gameStart={gameStart}
						playerTurn={playerTurn}
						playerColor={playerColor}
						winner={winner}
						winnerId={winnerId}
						playerName={playerName}
						showResult={showResult}
						wordOptions={wordOptions}
					/>
				</div>
				<br />
				<div className="sm:m-10 grid grid-cols-8 sm:gap-y-4">
					{tiles.map((value, key) => (
						<div
							ref={refs.current[key]}
							className={`text-stone-50 text-2xl sm:text-4xl font-bold font-mono rounded sm:w-14 sm:h-14 w-10 h-10 border-2 sm:border-4 border-purple-600 hover:border-green-100 flex justify-center items-center `}
							onClick={(event) => selectTile(key, event)}
							key={key}
						>
							{value}
						</div>
					))}
					<Result
						playerName={playerName}
						showResult={showResult}
						winner={winner}
						winWord={winWord}
						wordOptions={wordOptions}
						resetHandler={resetHandler}
						isFilled={isFilled}
						filledHandler={filledHandler}
					/>
				</div>
			</div>
			<TileScreen
				selectLetterHandler={selectLetterHandler}
				avaialableLetters={availableLetters}
				tileRefs={tileRefs}
			/>
		</>
	);
};

export default PlayScreen;
