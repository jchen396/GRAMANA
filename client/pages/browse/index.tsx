import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import socket from "./../../components/Socket";

const index = () => {
  const [gameUsers, useGameUsers] = useState<string[]>([]);
  const [gameRoomName, setGameRoomName] = useState<string[]>([]);
  const [gameAmount, setGameAmount] = useState<number[]>([]);
  useEffect(() => {
    socket.emit("showRooms");
    socket.on("showRooms", (gameRoomName) => {});
    return () => {
      socket.off("showRooms");
    };
  });
  return (
    <Layout>
      <div className="w-screen h-screen bg-neutral-900 flex flex-col space-y-10 items-center justify-center space-x-20">
        <div className="w-1/2 h-3/4 bg-neutral-800 rounded-lg"></div>
      </div>
    </Layout>
  );
};

export default index;
