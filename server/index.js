const express = require("express");
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
	console.log(socket.id)
	socket.on("disconnect", (reason) => {
		console.log(`${reason} for ${socket.id}`);
	});
	socket.on("play", (tiles, boardColor, playerColor) => {
		socket.broadcast.emit("play",tiles, boardColor, playerColor);
	});
	socket.on("message", message => {
		socket.broadcast.emit("message" , message);
	})
});
server.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port", PORT);
});
