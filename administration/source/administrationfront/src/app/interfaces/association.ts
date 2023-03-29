import { UserInput, UserInputWithRole, UserSimple, UserWithRole } from "./user";

export interface Association {
    id:    number | string;
    name:  string;
    users: UserSimple[];
  }
export interface AssociationWithRoles{
  id:    number | string;
  name:  string;
  users: UserWithRole[];
}
export interface AssoInput{
    id:    number | string;
    name:  string;
    users: UserInput[];
  }

  export interface AssoInputWithRoles{
    id:    number | string;
    name:  string;
    users: UserInputWithRole[];
  }

  export interface AssoExport{
    idUsers: number[];
    name:    string;
  }
  
  export interface QueryAsso {
    id:string|null;
    name:string|null;
  }
  