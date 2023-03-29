import { UserInput, UserSimple } from "./user";

export interface Association {
    id:    number | string;
    name:  string;
    users: UserSimple[];
  }
export interface AssoInput{
    id:    number | string;
    name:  string;
    users: UserInput[];
  }

  export interface AssoExport{
    idUsers: number[];
    name:    string;
  }
  
  export interface QueryAsso {
    id:string|null;
    name:string|null;
  }
  