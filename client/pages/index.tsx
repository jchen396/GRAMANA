import type { NextPage } from "next";
import ChatBox from "../components/ChatBox";
import PlayScreen from "../components/PlayScreen";

const Home: NextPage = () => {
	return (
		<main>
			<div className="w-screen h-screen bg-stone-900 flex items-center justify-center space-x-20">
				<PlayScreen />
				<ChatBox />
			</div>
		</main>
	);
};

export default Home;
