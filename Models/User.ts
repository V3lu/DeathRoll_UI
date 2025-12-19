export interface User {
  Id: string;
  Email: string;
  Username: string;
  HashedPassword: string;
  createdAt: Date;
  Gold: number;
  Dollars: number;
}