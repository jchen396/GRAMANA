import React, { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useRouter } from "next/router";

const CreateRoom = () => {
	const [roomCode, setRoomCode] = useState("");
	const router = useRouter();
	const enterRoomHandler = (e: any) => {
		e.preventDefault();
		router.push(`/rooms/${roomCode}`);
		console.log(roomCode);
	};
	const textChangeHandler = (e: any) => {
		setRoomCode(e.target.value);
	};
	return (
		<div className="sm:w-full md:w-1/2 sm:h-4/5 h-3/4 bg-neutral-800 rounded flex flex-col justify-center items-center">
			<h1 className="m-10 text-stone-50 text-5xl"> Room Code: </h1>
			<form
				id="roomInput"
				onSubmit={(e) => enterRoomHandler(e)}
				className="flex justify-center items-center"
			>
				<input
					required
					onChange={(e) => textChangeHandler(e)}
					className="text-2xl text-center text-medium uppercase rounded p-2"
					type="text"
				/>
				<ArrowCircleRightIcon
					type="submit"
					className="m-2 w-12 h-12 bg-emerald-600 hover:bg-emerald-400 cursor-pointer rounded-full"
				/>
			</form>
		</div>
	);
};

export default CreateRoom;
