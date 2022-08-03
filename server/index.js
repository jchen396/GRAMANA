const cors = require("cors");
const express = require("express");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const wordList = require("./anagaml-list.json");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "purple-game.vercel.app",
	},
});

app.use(cors());

//in case server and client run on different urls
io.on("connection", (socket) => {
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
			if (userList.length <= 2) {
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
	socket.on("play", (tiles, boardColor, playerColor) => {
		try {
			const user = getUser(socket.id);
			const userList = getUsersInRoom(user.room);
			socket.broadcast
				.to(user.room)
				.emit("play", tiles, boardColor, playerColor, userList);
		} catch {}
	});
	socket.on("message", (message) => {
		try {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit("message", message);
		} catch {}
	});
	socket.on("turn", (userId) => {
		const user = getUser(socket.id);
		io.to(user.room).emit("turn", userId);
	});
	socket.on("result", (word, playerName, currentScore) => {
		const user = getUser(socket.id);
		user.score = currentScore;
		const userList = getUsersInRoom(user.room);
		io.to(user.room).emit("update", userList);
		io.to(user.room).emit("result", word, playerName);
	});
	socket.on("reset", () => {
		const RANDOM_ANAGRAM_LIST =
			wordList[Math.floor(Math.random() * wordList.length)];
		const user = getUser(socket.id);
		const userList = getUsersInRoom(user.room);
		if (userList.length <= 2) {
			playerObj = {
				[userList[0].id]: 0,
				[userList[1].id]: 1,
			};
			io.to(user.room).emit(
				"reset",
				userList,
				RANDOM_ANAGRAM_LIST,
				playerObj
			);
		}
	});
});
server.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port", PORT);
});
