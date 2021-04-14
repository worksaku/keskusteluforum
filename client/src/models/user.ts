export type UserType = {
  username: string;
  _id: string;
  role: string;
};

export type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<UserType | null> | null;
};
