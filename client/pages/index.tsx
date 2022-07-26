import type { NextPage } from "next";
import PlayScreen from "../components/PlayScreen";
import Socket from "../components/Socket";

const Home: NextPage = () => {
	return (
		<main>
			<PlayScreen />
			<Socket />
		</main>
	);
};

export default Home;
