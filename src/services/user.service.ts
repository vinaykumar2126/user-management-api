import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";

export const userService = {
  register: async (name: string, email: string, password: string): Promise<IUser> => {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    return user;
  },

  getUsers: async () => {
    return User.find().select("-password");
  },

  getUser: async (id: string) => {
    return User.findById(id).select("-password");
  },

  deleteUser: async (id: string) => {
    await User.findByIdAndDelete(id);
    return { message: "User deleted" };
  },
  updateUser: async(id:string,data:any)=>{
    return User.findByIdAndUpdate(id,data,{new:true}).select("-password");
  }
};



// updateUser: async (id, data) => {

//    Find user by ID and update their fields
//   const updatedUser = await User.findByIdAndUpdate(
//     id,         // which user?
//     data,       // what fields to update?
//     { new: true } // return updated document, not old one
//   );

//    Remove password from response
//   return updatedUser.select("-password");
// }
