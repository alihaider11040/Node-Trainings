enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
  }
  
export interface IUser {
    id: number,
    name: String,
    email: String, 
    hashed_password: String,
    role : Role
}

export interface loginDTO{
  email: String,
  password: String
}

export interface loginResponseDTO{
  email: String,
  token: String
}