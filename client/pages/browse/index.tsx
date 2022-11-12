import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import socket from "./../../components/Socket";

const index = () => {
  const [gameUsers, useGameUsers] = useState<string[]>([]);
  const [gameRoomNames, setGameRoomNames] = useState<string[]>([]);
  const [gameAmount, setGameAmount] = useState<number[]>([]);
  useEffect(() => {
    socket.emit("showRooms");
    socket.on("showRooms", (rooms) => {
      setGameRoomNames(rooms);
    });
    return () => {
      socket.off("showRooms");
    };
  }, []);
  return (
    <Layout>
      <div className="w-screen h-screen bg-neutral-900 flex flex-col space-y-10 items-center justify-center space-x-20">
        <div className="mx-2 w-full h-3/4 bg-neutral-800 rounded-lg flex flex-col items-center justify-center">
          {Object.keys(gameRoomNames).length ? (
            Object.keys(gameRoomNames).map((name: any, key: number) => {
              return (
                <div
                  key={key}
                  className="my-4 py-4 px-2 w-4/5 bg-neutral-500 rounded-md text-xl flex flex-row hover:bg-neutral-400"
                >
                  <h1>Room: {name}</h1>
                  <p>Players: {gameRoomNames[name].length}</p>
                </div>
              );
            })
          ) : (
            <div className="text-neutral-100 self-center">
              No rooms are currently active.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default index;
