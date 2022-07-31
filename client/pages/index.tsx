import type { NextPage } from "next";
import ChatBox from "../components/ChatBox";
import CreateRoom from "../components/CreateRoom";
import PlayScreen from "../components/PlayScreen";

const Home: NextPage = () => {
	return (
		<main>
			<div className="w-screen h-screen bg-neutral-900 flex flex-wrap items-center justify-center space-x-20">
				<CreateRoom />
			</div>
		</main>
	);
};

export default Home;
