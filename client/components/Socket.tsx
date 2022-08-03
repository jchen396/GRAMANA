import io from "socket.io-client";
const SERVER = "https://purple-game-server.herokuapp.com/";
const socket = io(SERVER);
export default socket;
