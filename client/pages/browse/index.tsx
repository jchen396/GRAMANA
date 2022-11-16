import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import socket from "./../../components/Socket";
import autoAnimate from "@formkit/auto-animate";

const index = () => {
  const [gameRoomNames, setGameRoomNames] = useState<string[]>([]);
  const [showKey, setShowKey] = useState<object>({});
  const parent = useRef<any>([...new Array(100)].map(() => React.createRef()));
  const router = useRouter();
  useEffect(() => {
    socket.emit("showRooms");
    socket.on("showRooms", (rooms) => {
      setGameRoomNames(rooms);
    });
    return () => {
      socket.off("showRooms");
    };
  }, []);
  useEffect(() => {
    parent.current[0]?.current && autoAnimate(parent.current[0].current);
  }, [parent]);
  const joinRoomHandler = (name: string) => {
    router.push({
      pathname: "/",
      query: { name: name },
    });
  };
  const reveal = (key: number) => {
    if (!showKey[key as keyof typeof showKey])
      setShowKey({ ...showKey, [key]: true });
    else setShowKey({ ...showKey, [key]: ![key] });
  };
  return (
    <Layout>
      <div className="w-screen h-screen bg-neutral-900 flex flex-col space-y-10 items-center justify-center space-x-20">
        <h1 className="text-2xl text-slate-100">JOIN ROOM</h1>
        <div className="mx-2 w-full sm:w-4/5 h-3/4 bg-neutral-800 rounded-lg flex flex-col items-center justify-center overflow-auto ">
          {Object.keys(gameRoomNames).length ? (
            Object.keys(gameRoomNames).map((name: any, key: number) => {
              return (
                <div
                  ref={parent.current[key]}
                  key={key}
                  className="my-4 py-4 px-2 w-4/5 bg-neutral-700 rounded-md flex flex-row justify-between items-center hover:bg-neutral-600 cursor-pointer"
                  onClick={() => reveal(key)}
                >
                  <h1 className="text-purple-400 text-lg ">
                    Room: {name.toUpperCase()}
                  </h1>
                  <p className="text-emerald-400 text-sm ">
                    Players: {gameRoomNames[name].length}
                  </p>
                  {showKey[key as keyof typeof showKey] && (
                    <p className="text-slate-100">test dropdown</p>
                  )}
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
