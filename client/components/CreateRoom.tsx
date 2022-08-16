import React, { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useRouter } from "next/router";

const CreateRoom = () => {
	const [roomCode, setRoomCode] = useState("");
	const [username, setUsername] = useState("");
	const router = useRouter();
	const enterRoomHandler = (e: any) => {
		e.preventDefault();
		router.push({
			pathname: `/rooms/${roomCode}`,
			query: { user: username },
		});
	};
	const userTextHandler = (e: any) => {
		setUsername(e.target.value);
	};
	const roomTextHandler = (e: any) => {
		setRoomCode(e.target.value);
	};
	return (
		<div className="flex flex-col justify-center items-center gap-y-10">
			<div>
				<h1 className="text-5xl font-mono tracking-widest text-stone-900 p-10 bg-purple-400 rounded-full">
					GRAMANA
				</h1>
			</div>
			<div className="p-16 bg-neutral-800 rounded-2xl flex flex-col justify-center items-center">
				<form
					id="roomInput"
					onSubmit={(e) => enterRoomHandler(e)}
					className="flex flex-col justify-center items-center"
				>
					<label
						htmlFor="nameInput"
						className="m-2 text-stone-50 text-4xl"
					>
						Player Name:
					</label>
					<input
						id="nameInput"
						required
						onChange={(e) => userTextHandler(e)}
						className="m-4 text-2xl text-center text-medium uppercase rounded p-2 bg-stone-900 text-stone-50"
						type="text"
					/>
					<label
						htmlFor="roomInput"
						className="m-2 text-stone-50 text-4xl"
					>
						Room Code:
					</label>
					<input
						id="roomInput"
						required
						onChange={(e) => roomTextHandler(e)}
						className="m-4 text-2xl text-center text-medium uppercase rounded p-2 bg-stone-900 text-stone-50"
						type="text"
					/>
					<button type="submit">
						<ArrowCircleRightIcon
							sx={{ fontSize: 75 }}
							className="m-2 bg-emerald-600 hover:bg-emerald-400 cursor-pointer rounded-full"
						/>
						<span className="hidden">Join</span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateRoom;
