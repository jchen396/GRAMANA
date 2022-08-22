const express = require("express");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const wordList = require("./anagram-list.json");
const wordListSearch = require("./anagram-list-search.json");
const socketIo = require("socket.io");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

//in case server and client run on different urls
io.on("connection", (socket) => {
	let timerCounter;
	setInterval(() => {
		const user = getUser(socket.id);
		if (!isNaN(timerCounter) && timerCounter >= 0) {
			io.to(user?.room).emit("timer", timerCounter);
		}
		timerCounter--;
	}, 1000);
	socket.on("join", (roomCode, userName) => {
		try {
			const RANDOM_ANAGRAM_LIST =
				wordList[Math.floor(Math.random() * wordList.length)];
			const { user } = addUser({
				id: socket.id,
				name: userName,
				room: roomCode,
				score: 0,
			});
			socket.join(user.room);
			const userList = getUsersInRoom(user.room);
			io.to(user.room).emit("join", user.name, userList);
			if (userList.length >= 2) {
				io.to(user.room).emit("validate", userList);
				if (userList.length === 2) {
					timerCounter = 15;
					playerObj = {
						[userList[0].id]: 0,
						[userList[1].id]: 1,
					};
					io.to(user.room).emit(
						"start",
						userList,
						RANDOM_ANAGRAM_LIST,
						playerObj
					);
				}
			}
		} catch {}
	});
	socket.on("disconnect", () => {
		try {
			const user = getUser(socket.id);
			removeUser(socket.id);
			const userList = getUsersInRoom(user.room);
			io.to(user.room).emit("leave", user.name, userList);
		} catch {}
	});
	socket.on("play", (tiles, boardColor, selectedIndex, playerColor) => {
		try {
			const user = getUser(socket.id);
			const userList = getUsersInRoom(user.room);
			socket.broadcast
				.to(user.room)
				.emit(
					"play",
					tiles,
					boardColor,
					playerColor,
					selectedIndex,
					userList
				);
			timerCounter = 15;
		} catch {}
	});
	socket.on("message", (message) => {
		try {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit("message", message);
		} catch {}
	});
	socket.on("turn", (userId) => {
		timerCounter = 15;
		const user = getUser(socket.id);
		io.to(user.room).emit("turn", userId);
	});
	socket.on("result", (word, playerName, currentScore, id) => {
		let randomAnagramList = [];
		for (let i = 0; i < 3; i++) {
			randomAnagramList[i] =
				wordList[Math.floor(Math.random() * wordList.length)];
		}
		const user = getUser(socket.id);
		user.score = currentScore;
		const userList = getUsersInRoom(user.room);
		io.to(user.room).emit(
			"result",
			word,
			playerName,
			id,
			randomAnagramList
		);
	});
	socket.on("reset", (winnerId, nextWord) => {
		let nextWordIndex = wordListSearch[nextWord.toLowerCase()];
		let newNextWord = wordList[nextWordIndex];
		const user = getUser(socket.id);
		const userList = getUsersInRoom(user.room);
		if (userList[0].id === winnerId) {
			temp = userList[1];
			removeUser(userList[1].id);
			addUser(temp);
		} else {
			temp = userList[0];
			removeUser(userList[0].id);
			addUser(temp);
		}
		const newUserList = getUsersInRoom(user.room);
		if (newUserList.length >= 2) {
			playerObj = {
				[newUserList[0].id]: 0,
				[newUserList[1].id]: 1,
			};
			io.to(user.room).emit("reset", newUserList, newNextWord, playerObj);
			io.to(user.room).emit("update", newUserList);
		}
	});
	socket.on("skipTurn", (color) => {
		const user = getUser(socket.id);
		const userList = getUsersInRoom(user.room);
		io.to(user.room).emit("skipTurn", userList, color);
	});
	socket.on("filled", () => {
		const user = getUser(socket.id);
		const userList = getUsersInRoom(user?.room);
		let newNextWord = wordList[Math.floor(Math.random() * wordList.length)];
		if (userList.length >= 2) {
			playerObj = {
				[userList[0].id]: 0,
				[userList[1].id]: 1,
			};
			io.to(user.room).emit("reset", userList, newNextWord, playerObj);
			io.to(user.room).emit("update", userList);
		}
	});
});
server.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port", PORT);
});

app.get("/", function (req, res) {
	res.send("Server is now running . . .");
});
