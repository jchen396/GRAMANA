import React from "react";

interface Props {
	userList: {}[];
}

const PlayerList: React.FC<Props> = ({ userList }) => {
	return (
		<div className="sm:w-full bg-neutral-800 h-1/5 rounded flex flex-col items-center">
			<h1 className="m-2 text-stone-50 text-3xl">Users List: </h1>
			<div className="p-4 m-2 w-full rounded flex flex-col-reverse justify-start items-center overflow-auto bg-stone-900">
				{userList?.map((user: any) => (
					<div className="text-stone-50" key={user.id}>
						{user.name}
					</div>
				))}
			</div>
		</div>
	);
};

export default PlayerList;
