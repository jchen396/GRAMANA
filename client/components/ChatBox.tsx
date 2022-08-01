import React, { useEffect, useRef, useState } from "react";
import PlayerList from "./PlayerList";
import socket from "./Socket";

interface Props {
	roomCode: string | string[];
	userName: string | string[];
}

const ChatBox: React.FC<Props> = ({ roomCode, userName }) => {
	const [userList, setUserList] = useState<object[]>([]);
	const [message, setMessage] = useState<string>("");
	const [messageBoxes, setMessageBoxes] = useState<string[]>([]);
	const ref = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		setMessageBoxes((prevState: any) => [
			...prevState,
			`Room Code: [ ${roomCode} ]`,
		]);
		socket.emit("join", roomCode, userName);
		socket.on("connect", () => {});
		socket.on("join", (user: string, listOfUsers: object[]) => {
			setMessageBoxes((prevState: string[]) => [
				...prevState,
				`User ${user} has joined the game.`,
			]);
			setUserList(listOfUsers);
		});
		socket.on("disconnect", () => {
			socket.emit("leave", userList);
		});

		socket.on("leave", (user: string, listOfUsers: object[]) => {
			setMessageBoxes((prevState: any) => [
				...prevState,
				`User ${user} has disconnect.`,
			]);
			setUserList(listOfUsers);
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
		let newMessage = `${userName}: ${message}`;
		socket.emit("message", newMessage);
		setMessageBoxes((prevState) => [...prevState, newMessage]);
		ref.current!.value = "";
	};

	return (
		<div className="flex flex-col gap-y-10 sm:w-full md:w-1/4 sm:h-4/5 h-3/4 ">
			<PlayerList userList={userList} />

			<div className="relative h-4/5 bg-neutral-800 rounded flex">
				<div className="p-4 m-4 w-full h-5/6 rounded flex flex-col-reverse justify-start items-start overflow-auto bg-stone-900">
					{messageBoxes
						.slice(0)
						.reverse()
						.map((msg, key) => {
							return (
								<div
									key={key}
									className="p-2 mt-6 bg-stone-800 text-stone-50 rounded"
								>
									{msg}
								</div>
							);
						})}
				</div>

				<form
					className="absolute mb-4 flex justify-center items-center w-full self-end"
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
		</div>
	);
};

export default ChatBox;
