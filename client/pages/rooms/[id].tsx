import React, { useState } from "react";
import PlayScreen from "../../components/PlayScreen";
import ChatBox from "../../components/ChatBox";
import { useRouter } from "next/router";

const Room = () => {
	const router = useRouter();
	const queryId: string | string[] = router.query.id!;
	return (
		<div className="w-screen h-screen bg-neutral-900 flex flex-wrap items-center justify-center space-x-20">
			<PlayScreen />
			<ChatBox queryId={queryId} />
		</div>
	);
};

export default Room;
