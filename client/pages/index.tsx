import type { NextPage } from "next";
import Head from "next/head";
import CreateRoom from "../components/CreateRoom";

const Home: NextPage = () => {
	return (
		<main>
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
				<link rel="shortcut icon" href="images/favicon.ico" />
			</Head>
			<div className="w-screen h-screen bg-neutral-900 flex flex-wrap items-center justify-center space-x-20">
				<CreateRoom />
			</div>
		</main>
	);
};

export default Home;
