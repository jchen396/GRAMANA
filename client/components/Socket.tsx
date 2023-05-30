import io from "socket.io-client";
const SERVER = NEXT_PUBLIC_SERVER_DOMAIN;
const socket = io(SERVER);
export default socket;
