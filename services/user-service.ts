import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import { IUser, loginDTO, loginResponseDTO } from '../interfaces/user';
import User from '../models/user'

export async function signUp(userObject: IUser) {
  // Check if user already exists
  const existingUser = await User.findOne({
      where: {
          email: userObject.email
      }
  });

  if (existingUser) {
      throw new Error("User already exists");
  }

  // Create new user
  try{
  const newUser = await User.create({
    name: userObject.name,
    email : userObject.email,
    role : userObject.role,
    hashedPassword: userObject.password
  });
  return newUser;


}catch(error){
  throw new Error( error)
}

}


export const login = async (loginData : loginDTO): Promise<loginResponseDTO> => {
    const user = await  User.findOne({
      where:{
        email : loginData.email,
        hashedPassword: loginData.password
      }
    });
    if (!user) throw new Error("Invalid email or password");

    const token = jwt.sign(
        { id: loginData.email, password: loginData.password },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
    );

    return { email: loginData.email, token };
};

export const updateUser = async (userObject : IUser) => {
  try{
        await User.update(
          { name: userObject.name,
            role: userObject.role,
            hashedPassword : userObject.password
           },
          {
            where: {
              email: userObject.email,
            },
          },
        );
        return  await User.findOne({
          where:{
            email: userObject.email
          }
        })
      }catch(error){
        throw new Error("Error while updating")
      }
};

