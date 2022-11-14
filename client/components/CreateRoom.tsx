import React, { useEffect, useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useRouter } from "next/router";

const CreateRoom = () => {
  const [roomCode, setRoomCode] = useState<string | string[]>("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const roomName: string | string[] = router.query.name!;
  useEffect(() => {
    if (roomName) setRoomCode(roomName);
  }, []);
  const enterRoomHandler = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: `/rooms/${roomCode}`,
      query: { user: username },
    });
  };
  const userTextHandler = (e: any) => {
    setUsername(e.target.value);
  };
  const roomTextHandler = (e: any) => {
    setRoomCode(e.target.value);
  };
  const browseRoomHandler = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: "/browse",
    });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-10">
      <div>
        <h1 className="cursor-default text-5xl font-mono tracking-widest text-stone-900 p-10 bg-purple-400 rounded-full">
          GRAMANA
        </h1>
      </div>
      <div className="sm:p-16 p-4 bg-neutral-800 rounded-2xl flex flex-col justify-center items-center">
        <form
          id="roomInput"
          onSubmit={(e) => enterRoomHandler(e)}
          className="flex flex-col justify-center items-center"
        >
          <label
            htmlFor="nameInput"
            className="m-2 text-stone-50 text-2xl sm:text-4xl"
          >
            Player Name:
          </label>
          <input
            id="nameInput"
            title="Please enter a username"
            autoComplete="off"
            required
            onChange={(e) => userTextHandler(e)}
            className="m-4 text-2xl text-center text-medium uppercase rounded p-2 bg-stone-900 text-stone-50"
            type="text"
          />
          <label
            htmlFor="codeInput"
            className="m-2 text-stone-50 text-2xl sm:text-4xl "
          >
            Room Code:
          </label>
          <input
            id="codeInput"
            title="Please enter a room code"
            autoComplete="off"
            required
            onChange={(e) => roomTextHandler(e)}
            value={roomName}
            className="m-4 text-2xl text-center text-medium uppercase rounded p-2 bg-stone-900 text-stone-50"
            type="text"
          />
          <button type="submit">
            <ArrowCircleRightIcon
              aria-label="Join Room"
              sx={{ fontSize: 75 }}
              className="m-2 bg-emerald-600 hover:bg-emerald-400 cursor-pointer rounded-full"
            />
          </button>
          <button
            className="m-2 text-purple-400 hover:text-purple-200 text-xl"
            onClick={browseRoomHandler}
          >
            Browse existing game
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
