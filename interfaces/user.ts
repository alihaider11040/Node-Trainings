enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
  }
  
export interface IUser {
    id: number,
    name: String,
    email: String, 
    password: String,
    role : Role
}