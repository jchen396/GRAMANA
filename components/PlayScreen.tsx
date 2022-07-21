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

	useEffect(() => {
		let rightCharacters =
			AVAILABLE_LETTERS.length -
			1 -
			AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
		let leftCharacters = AVAILABLE_LETTERS.indexOf(tiles[selectedIndex]);
		//check word going right
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
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) + i
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
					AVAILABLE_LETTERS.indexOf(tiles[selectedIndex], 2) - i
				] === tiles[selectedIndex - i]
			) {
				if (i === leftCharacters || leftCharacters === 0) {
					leftCheck = true;
				}
				continue;
			} else break;
		}
		setIsWin(rightCheck && leftCheck ? true : false);
		//check game status
		if (isWin) {
			console.log("You won!");
		}
	}, [selectedIndex, tiles, isWin]);

	//This function will be invoked whenever a tile is clicked
	const selectTile = (key: number) => {
		// This function will read the keyboard and input character if it is part of "PURPLE"
		const inputTile = (event: any) => {
			let inputChar;
			if (AVAILABLE_LETTERS.includes(event.key.toUpperCase())) {
				inputChar = event.key.toUpperCase();
				setSelectedIndex(key);
			}
			setTiles([
				...tiles.slice(0, key),
				inputChar,
				...tiles.slice(key + 1, tiles.length),
			]);
		};
		if (tiles[key] === "") {
			window.addEventListener("keydown", inputTile);
		}
	};

	return (
		<div className="grid grid-cols-12 gap-2 s:w-full md:w-1/2 lg:w-1/3 h-1/2">
			{tiles.map((value, key) => (
				<div
					className="s:w-6 s:h-6 w-8 h-8 border-2 border-red-200 hover:border-blue-200 flex justify-center items-center"
					onClick={() => selectTile(key)}
					key={key}
				>
					{value}
				</div>
			))}
		</div>
	);
};

export default PlayScreen;
