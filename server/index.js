const express = require("express");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const wordList = require("./anagaml-list.json");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 8080;
const app = express();
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
	const turnCounter = setInterval(() => {
		const user = getUser(socket.id);
		timerCounter--;
		io.to(user?.room).emit("timer", timerCounter);
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
				timerCounter = 10;
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
			timerCounter = 10;
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
		timerCounter = 10;
		const user = getUser(socket.id);
		io.to(user.room).emit("turn", userId);
	});
	socket.on("result", (word, playerName, currentScore, id) => {
		const user = getUser(socket.id);
		user.score = currentScore;
		const userList = getUsersInRoom(user.room);
		io.to(user.room).emit("result", word, playerName, id);
	});
	socket.on("reset", (winnerId) => {
		const RANDOM_ANAGRAM_LIST =
			wordList[Math.floor(Math.random() * wordList.length)];
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
			io.to(user.room).emit(
				"reset",
				newUserList,
				RANDOM_ANAGRAM_LIST,
				playerObj
			);
			io.to(user.room).emit("update", newUserList);
		}
	});
	socket.on("skipTurn", (color) => {
		const user = getUser(socket.id);
		const userList = getUsersInRoom(user.room);
		io.to(user.room).emit("skipTurn", userList, color);
	});
});
server.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port", PORT);
});

app.get("/", function (req, res) {
	res.send("server is running");
});
