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