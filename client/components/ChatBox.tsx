import React, { useEffect, useRef, useState } from "react";
import socket from "./Socket";

const ChatBox = () => {
	const [message, setMessage] = useState("");
	const [messageBoxes, setMessageBoxes] = useState<string[]>([]);
	const ref = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		socket.on("connect", () => {
			console.log(socket.id);
		});
		socket.on("message", (msg) => {
			setMessageBoxes((prevState) => [...prevState, msg]);
		});
		return () => {
			socket.off("connect");
		};
	}, []);
	const changeMessageHandler = (e: any) => {
		setMessage(e.target.value);
	};
	const sendMessage = (e: any) => {
		e.preventDefault();
		socket.emit("message", message);
		setMessageBoxes((prevState) => [...prevState, message]);
		ref.current!.value = "";
	};

	return (
		<div className="relative sm:w-full md:w-1/4 sm:h-4/5 h-3/4 bg-stone-800 rounded flex">
			<div className="flex flex-col justify-start items-start">
				{messageBoxes.map((msg) => {
					return (
						<div className="p-2 mt-6 mx-6 bg-stone-100 text-stone-900 rounded">
							{`${socket.id}: ${msg}`}
						</div>
					);
				})}
			</div>

			<form
				className="absolute my-6 m-2 flex justify-center items-center w-full self-end"
				onSubmit={(e) => sendMessage(e)}
			>
				<input
					ref={ref}
					placeholder="Enter a message..."
					className="p-2 pb-6 rounded w-3/4"
					onChange={(e) => changeMessageHandler(e)}
				/>
				<button className="mx-2 p-4 rounded bg-emerald-600 flex justify-center items-center">
					Send
				</button>
			</form>
		</div>
	);
};

export default ChatBox;
