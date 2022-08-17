import io from "socket.io-client";
const SERVER =
	"http://localhost:5000" || "https://purple-game-server.herokuapp.com/";
const socket = io(SERVER);
export default socket;
