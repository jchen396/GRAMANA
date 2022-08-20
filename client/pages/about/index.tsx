import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";

const index = () => {
  return (
    <Layout>
      <div className="w-screen h-screen bg-neutral-900 flex flex-col space-y-10 items-center justify-center space-x-20">
        <h1 className="text-stone-50 text-2xl text-center">
          GRAMANA is a free online multiplayer browser word game.
          <br /> This web application was built using NextJS, TailwindCSS, and
          SocketIO.
        </h1>
        <Link href="https://github.com/jchen396/GRAMANA">
          <GitHubIcon
            aria-label="GitHub"
            sx={{ fontSize: 50 }}
            className="hover:cursor-pointer hover:bg-stone-50 bg-stone-500 rounded-full"
          />
        </Link>
      </div>
    </Layout>
  );
};

export default index;
