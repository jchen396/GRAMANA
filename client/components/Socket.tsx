import React from "react";
import io from "socket.io-client";

const SERVER = "http://localhost:3000";
const Socket = () => {
	const [time, setTime] = React.useState("fetching");
	React.useEffect(() => {
		const socket = io(SERVER);
		socket.on("connect", () => console.log(socket.id));
		socket.on("connect_error", () => {
			setTimeout(() => socket.connect(), 3000);
		});
		socket.on("time", (data) => setTime(data));
		socket.on("disconnect", () => setTime("server disconnected"));
	}, []);
	return <div>{time}</div>;
};

export default Socket;
