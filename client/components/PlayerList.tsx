import React from "react";

interface Props {
	userList: {}[];
	userTurn?: string;
}

const PlayerList: React.FC<Props> = ({ userList, userTurn }) => {
	return (
		<div className="p-3 sm:w-full bg-neutral-800 h-1/5 rounded-2xl flex flex-col  items-center">
			<h1 className=" text-stone-50 text-2xl">Users List: </h1>
			<div className="p-4 w-full h-4/5 rounded-2xl flex flex-col justify-start items-center overflow-auto bg-stone-900">
				{userList?.map((user: any) => (
					<div className="flex flex-row " key={user.id}>
						{user.id == userTurn ? (
							<p className="text-xl px-20 text-stone-50 bg-purple-400 rounded-2xl ">
								{user.name}
							</p>
						) : (
							<p className="text-xl text-stone-50">{user.name}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default PlayerList;
