const express = require("express");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "*",
	},
});

//in case server and client run on different urls
io.on("connection", (socket) => {
	socket.on("join", (roomCode, userName) => {
		try {
			const { user } = addUser({
				id: socket.id,
				name: userName,
				room: roomCode,
			});
			socket.join(user.room);
			const userList = getUsersInRoom(user.room);
			if (userList.length <= 2) {
				io.to(user.room).emit("start", userList);
			}
			io.to(user.room).emit("join", user.name, userList);
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
});
server.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port", PORT);
});
