const users = [];
const rooms = [];

const addUser = ({ id, name, room, score }) => {
  name = name?.trim().toLowerCase();
  room = room?.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, room, score };

  users.push(user);
  rooms.push(room);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getRooms = () => rooms;

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRooms };
