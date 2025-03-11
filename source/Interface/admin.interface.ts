export interface Iadmin{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    confirmPassword?:string,
    role: "user"| "admin"
  }