import React, { useState } from "react";
import PlayScreen from "../../components/PlayScreen";
import ChatBox from "../../components/ChatBox";
import { useRouter } from "next/router";

const Room = () => {
	const router = useRouter();
	console.log(router.query);
	const roomCode: string | string[] = router.query.id!;
	const userName: string | string[] = router.query.user!;
	return (
		<div className="w-screen h-screen bg-neutral-900 flex flex-wrap items-center justify-center space-x-20">
			<PlayScreen />
			<ChatBox roomCode={roomCode} userName={userName} />
		</div>
	);
};

export default Room;
