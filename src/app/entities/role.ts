import {Users} from "./users";

export interface Role{
  id: number,
  roleStatus: string,
  users: Users[]
}
