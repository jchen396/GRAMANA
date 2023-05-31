import io from "socket.io-client";
const SERVER = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
const socket = io(SERVER);
export default socket;
