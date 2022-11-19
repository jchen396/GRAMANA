import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import socket from "./../../components/Socket";

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
      <div className="w-screen h-screen bg-neutral-900 flex flex-col space-y-10 items-center justify-center ">
        {" "}
        <h1 className="text-2xl text-slate-100">JOIN ROOM</h1>{" "}
        <div className="mx-2 w-full sm:w-4/5 h-3/4 bg-neutral-800 rounded-lg flex flex-col items-center justify-center overflow-auto ">
          {Object.keys(gameRoomNames).length ? (
            Object.keys(gameRoomNames).map((name: any, key: number) => {
              return (
                <div
                  ref={parent.current[key]}
                  key={key}
                  className={`transition-all ease-in-out delay-150 my-4 py-4 px-4 w-4/5
                   bg-neutral-700 rounded-md flex flex-col justify-between hover:bg-neutral-600 cursor-pointer ${
                     showKey[key as keyof typeof showKey] && ""
                   }
                   `}
                  onClick={() => reveal(key)}
                >
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="text-purple-400 text-lg">
                      Room: {name.toUpperCase()}
                    </h1>
                    <p className="text-emerald-400 text-sm">
                      Players: {gameRoomNames[name].length}
                    </p>
                  </div>
                  {showKey[key as keyof typeof showKey] && (
                    <div className="w-full flex flex-col items-center justify-between space-y-4">
                      <div>
                        {Object.keys(gameRoomNames[name]).map(
                          (e: string, key: number) => {
                            return (
                              <div
                                key={key}
                                className="flex flex-row items-center justify-center space-x-4 "
                              >
                                <strong className="text-xl text-slate-100">
                                  {gameRoomNames[name][key].name}
                                </strong>
                                <p className="text-lg text-slate-100">
                                  {gameRoomNames[name][key].score}
                                </p>
                              </div>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() => joinRoomHandler(name)}
                        className="p-2 text-slate-900 font-semibold text-lg bg-emerald-500 rounded-lg"
                      >
                        Join
                      </button>
                    </div>
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
