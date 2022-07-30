import io from "socket.io-client";
const SERVER = "http://localhost:8080";
const socket = io(SERVER);
export default socket;
