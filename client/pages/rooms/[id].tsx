import React, { useState } from "react";
import ChatBox from "../../components/ChatBox";
import PlayScreen from "../../components/PlayScreen";
import { useRouter } from "next/router";

const Room = () => {
	const router = useRouter();
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
