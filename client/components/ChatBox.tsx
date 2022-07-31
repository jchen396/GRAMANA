import React, { useEffect, useRef, useState } from "react";
import socket from "./Socket";

const ChatBox = () => {
	const [message, setMessage] = useState("");
	const [messageBoxes, setMessageBoxes] = useState<string[]>([]);
	const ref = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		socket.emit("join");
		socket.on("connect", () => {});
		socket.on("join", (id) => {
			setMessageBoxes((prevState: any) => [
				...prevState,
				`User ${id} has joined the game.`,
			]);
		});
		socket.on("disconnect", () => {
			socket.emit("leave");
		});

		socket.on("leave", (id) => {
			setMessageBoxes((prevState: any) => [
				...prevState,
				`User ${id} has disconnect.`,
			]);
		});
		socket.on("message", (msg) => {
			setMessageBoxes((prevState) => [...prevState, msg]);
		});
		return () => {
			socket.off("connect");
			socket.off("message");
			socket.off("disconnect");
		};
	}, []);
	const changeMessageHandler = (e: any) => {
		setMessage(e.target.value);
	};
	const sendMessage = (e: any) => {
		e.preventDefault();
		let newMessage = `${socket.id}: ${message}`;
		socket.emit("message", newMessage);
		setMessageBoxes((prevState) => [...prevState, newMessage]);
		ref.current!.value = "";
	};

	return (
		<div className="relative sm:w-full md:w-1/4 sm:h-4/5 h-3/4 bg-neutral-800 rounded flex">
			<div className="p-4 m-4 w-full h-5/6 rounded flex flex-col-reverse justify-start items-start overflow-auto bg-stone-900">
				{messageBoxes
					.slice(0)
					.reverse()
					.map((msg) => {
						return (
							<div className="p-2 mt-6 bg-stone-800 text-stone-50 rounded">
								{msg}
							</div>
						);
					})}
			</div>

			<form
				className="absolute my-6 m-2 flex justify-center items-center w-full self-end"
				onSubmit={(e) => sendMessage(e)}
			>
				<input
					id="chatInput"
					ref={ref}
					placeholder="Enter a message..."
					className="p-2 pb-6 rounded w-3/4 bg-stone-900 text-stone-50"
					onChange={(e) => changeMessageHandler(e)}
				/>
				<button
					form="chatInput"
					type="submit"
					className="mx-2 p-4 rounded bg-emerald-600 flex justify-center items-center"
				>
					Send
				</button>
			</form>
		</div>
	);
};

export default ChatBox;
