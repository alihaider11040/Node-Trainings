import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { IUser, loginDTO, loginResponseDTO } from "../interfaces/user";

class UserService {
  async signUp(userObject: IUser) {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: userObject.email } });
    if (existingUser) throw new Error("User already exists");

    try {
      // Hash password before saving
      const hashedPassword = userObject.hashed_password
      
      const newUser = await User.create({
        name: userObject.name,
        email: userObject.email,
        role: userObject.role,
        hashed_password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async login(loginData: loginDTO): Promise<loginResponseDTO> {
    const user = await User.findOne({ where: { email: loginData.email } }) as IUser | null;
    if (!user) throw new Error("Invalid email or password");

    // Verify password
    const isPasswordValid = (loginData.password == user.hashed_password)
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return { email: user.email, token };
  }

  async updateUser(userObject: IUser) {
    try {
      const updatedFields: Partial<IUser> = {
        name: userObject.name,
        role: userObject.role,
      };
      await User.update(updatedFields, { where: { email: userObject.email } });
      return await User.findOne({ where: { email: userObject.email } });
    } catch (error) {
      throw new Error("Error while updating user");
    }
  }
}

export default new UserService();