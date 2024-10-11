export enum Role{
  USER,
  ADMIN
}

export interface User{
  firstname:string,
  lastname:string,
  matricule:string,
  role:Role,
  email:string,
  cin:string,
  status:string,
  structure:string,
  codeDivision:string
}
