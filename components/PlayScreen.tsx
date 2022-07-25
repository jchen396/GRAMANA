import React, { useEffect, useState } from "react";

const AVAILABLE_LETTERS = "PURPLE".split("");

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

	//This function will be invoked whenever a tile is clicked
	const selectTile = (key: number, divEvent: any) => {
		if (selectedDiv !== null) {
			selectedDiv.classList.remove(`bg-${playerColor}-600`);
		}
		setSelectedDiv(divEvent.target);

		// This function will read the keyboard and input character if it is part of "PURPLE"
		const inputTile = (keydownEvent: any) => {
			let inputChar;
			if (AVAILABLE_LETTERS.includes(keydownEvent.key.toUpperCase())) {
				inputChar = keydownEvent.key.toUpperCase();
				setSelectedIndex(key);
				setTiles([
					...tiles.slice(0, key),
					inputChar,
					...tiles.slice(key + 1, tiles.length),
				]);
				if (playerColor === "red") {
					setPlayerColor("blue");
				} else {
					setPlayerColor("red");
				}
			}
			window.removeEventListener("keydown", inputTile);
		};
		if (tiles[key] === "") {
			window.addEventListener("keydown", inputTile);
			divEvent.target.classList.add(`bg-${playerColor}-600`);
		}
	};

	return (
		<div className="grid grid-cols-12 gap-2 s:w-full md:w-1/2 lg:w-1/3 h-1/2">
			{tiles.map((value, key) => (
				<div
					className={`text-slate-100 rounded s:w-6 s:h-6 w-8 h-8 border-2 border-red-200 hover:border-blue-200 flex justify-center items-center`}
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
