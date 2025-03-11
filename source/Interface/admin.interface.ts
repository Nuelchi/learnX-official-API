export interface Iadmin{
    name:string,
    email:string,
    password:string,
    confirmPassword?:string,
    role: "user"| "admin"
  }