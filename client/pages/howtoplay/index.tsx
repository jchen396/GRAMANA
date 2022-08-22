import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";

const index = () => {
	return (
		<Layout>
			<div className="w-screen h-screen flex flex-wrap ">
				<div className="pt-10 bg-neutral-900 w-full flex flex-wrap justify-center items-center space-y-10 sm:space-x-20">
					<Image
						src="/images/example.webp"
						width="400"
						height="600"
					/>
					<article className="text-stone-50 md:text-2xl text-lg text-center w-3/4 sm:w-1/2">
						Enter a username and create a room to challenge your
						friends by connecting the letters to build your word and
						prevent your opponents from completing theirs. You and
						your opponent will be given words that are anangrams to
						each other's.
						<br /> This makes it so that the players will be sharing
						the same letters while building different words. The
						objective is to build your word by inputting letters on
						the grid on the left side of the play screen. The
						letters can be connected vertically, horizontally, or
						diagonally in any direction. &#40;similar to Scrabble
						and Gomoku &#41; <br />
						In order for the game to start, there must be at least 2
						active users in the room. When there are more than 2
						users, there will be a waiting queue to take over the
						loser's spot. The player list will display the
						scoreboard as well as the players' turn. <br />
						The color <span className="text-red-400">red</span> will
						indicate the player 1's moves, and the color{" "}
						<span className="text-blue-400">blue</span> will show
						the player 2's. Every player will have 15 seconds to
						make their move, when the timer runs out the turn will
						be automically skipped. At the end of each match, the
						winner will be able to select thier next word within the
						time limit. If they do not choose a word, the word will
						be automatically chosen by the system. If the board is
						filled without a winner, the match will result in a tie,
						and the match will be restarted with the same players.
						<br /> Keep in mind there is a chat room at the bottom
						right. Feel free to use it to interact with other users
						in the room! Last, but not least, have fun!
					</article>
				</div>
			</div>
		</Layout>
	);
};

export default index;
