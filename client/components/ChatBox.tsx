import React, { useEffect } from "react";
import socket from "./Socket";

const ChatBox = () => {
	useEffect(() => {
		socket.on("connect", () => {
			console.log(socket.id);
		});
		return () => {
			socket.off("connect");
		};
	});
	const sendMessage = (e: any) => {
		console.log(e.target.value);
	};
	return (
		<div className="sm:p-10 p-8 sm:w-full md:w-1/4 sm:h-4/5 h-3/4 bg-stone-800 rounded flex items-end">
			<div className="flex justify-center items-center w-full">
				<input
					placeholder="Enter a message..."
					type="text"
					className="p-2 pb-6 rounded w-3/4"
					onSubmit={(e) => sendMessage(e)}
				/>
				<button className="mx-2 p-4 rounded bg-emerald-600 flex justify-center items-center">
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatBox;
