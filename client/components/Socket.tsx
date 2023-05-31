import io from "socket.io-client";
require("dotenv").config();
console.log(process.env.NEXT_PUBLIC_SERVER_DOMAIN)
const SERVER = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
const socket = io(SERVER);
export default socket;
