interface IUser {
  room: string;
  name: string;
  id: string;
}
const users: IUser[] = [];

export const addUser = ({
  id,
  name = '',
  room = '',
}: IUser): { user?: IUser; error?: string } => {
  const sanitizedName = name?.trim().toLowerCase();
  const sanitizedRoom = room?.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    return { error: 'Username is taken' };
  }
  const user: IUser = { id, name: sanitizedName, room: sanitizedRoom };
  users.push(user);
  return { user };
};
export const removeUser = (id: string): IUser | undefined => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.slice(index, 1)[0];
  }
};
export const getUser = (id: string) => {
  return users.find((user) => user.id === id);
};
export const getUsersInRoom = (room: string) => {
  return users.filter((user) => user.room === room);
};
