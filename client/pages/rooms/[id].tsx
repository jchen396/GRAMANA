import React, { useState } from "react";
import ChatBox from "../../components/ChatBox";
import PlayScreen from "../../components/PlayScreen";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/Layout";

const Room = () => {
	const router = useRouter();
	const roomCode: string | string[] = router.query.id!;
	const userName: string | string[] = router.query.user!;
	return (
		<>
			<Layout>
				<Head>
					<title>GRAMANA | Multiplayer Word Game</title>
					<meta
						property="og:title"
						content="GRAMANA | Multiplayer Word Game"
						key="title"
					/>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<meta
						name="description"
						content="GRAMANA is a free multiplayer word game. Enter a username and create a room to challenge your friends by connecting the letters to build your word!"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className="sm:w-screen bg-neutral-900  sm:h-screen flex flex-wrap items-center justify-center lg:space-x-20">
					<PlayScreen />
					<ChatBox roomCode={roomCode} userName={userName} />
				</div>
			</Layout>
		</>
	);
};

export default Room;
