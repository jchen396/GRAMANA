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
	socket.on("disconnect", (reason) => {
		console.log(`${reason} for ${socket.id}`);
	});
	socket.on("play", (key, tiles, playerColor) => {
		console.log(`key:${key} / tiles:${tiles} / playerColor:${playerColor}`);
		socket.broadcast.emit("play", key, tiles, playerColor);
	});
});
server.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log("Server running on Port", PORT);
});
