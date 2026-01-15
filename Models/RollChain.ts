import { Roll } from "./Roll";
import { User } from "./User";

export interface RollChain {
    Id?: Number;
    User?: User;
    IsActive?: Boolean;
    Rolls?: Roll[];
}