import React from "react";

interface Props {
	userList: {}[];
	userTurn?: string;
}

const PlayerList: React.FC<Props> = ({ userList, userTurn }) => {
	return (
		<div className="sm:w-full bg-neutral-800 h-1/5 rounded flex flex-col items-center">
			<h1 className="m-2 text-stone-50 text-2xl">Users List: </h1>
			<div className="p-4 m-2 w-full rounded flex flex-col-reverse justify-start items-center overflow-auto bg-stone-900">
				{userList?.map((user: any) => (
					<div className="flex flex-row " key={user.id}>
						{user.id == userTurn ? (
							<p className="text-xl px-40 text-stone-50 bg-purple-400 rounded ">
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
