export interface UserInput {
    id:        number|string;
    password:  string;
    lastname:  string;
    firstname: string;
    age:       number |string|undefined;
  }

  
export interface UserSimple {
    id:        number;
    password:  string;
    lastname:  string;
    firstname: string;
    age:       number ;
  }

  export interface UserWithRole {
    id:        number;
    password:  string;
    lastname:  string;
    firstname: string;
    age:       number;
    role:      string;
  }

  export interface UserInputWithRole {
    id:        number|string;
    password:  string;
    lastname:  string;
    firstname: string;
    age:       number |string|undefined;
    role:      string;
  }