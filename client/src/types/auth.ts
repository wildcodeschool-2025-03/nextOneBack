export type User = {
  id: number;
  pseudo: string;
  email: string;
  firstname: string;
  name: string;
  id_role: number;
};

export type Auth = {
  user: User;
  token: string;
};
