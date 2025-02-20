import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import { IUser } from '../interfaces/user';
const User = require( '../models/user')

class UserService {
  async signUp(userObject : IUser): Promise<IUser> {
    const existingUser = User.find(user => user.email === userObject.email);
    if (existingUser) throw new Error("User already exists");

    const newUser=  User.create({
        userObject
    });
    if(newUser){
        return newUser
    }
    
    throw new Error('Error while creating new User ')
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = users.find(user => user.email === email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

    return { user, token };
  }

  async updateUser(id: number, name?: string, email?: string): Promise<User | null> {
    const user = users.find(user => user.id === id);
    if (!user) return null;

    if (name) user.name = name;
    if (email) user.email = email;

    return user;
  }

  async deleteUser(id: number): Promise<boolean> {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  }
}

export default new UserService();
