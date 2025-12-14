import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";

export const userService = {
  getUsers: async (page=1,limit=10,search="" ) => {
    const query = search
    ?{
      $or:[
        {name:{$regex:search,$options:"i"}},
        {email:{$regex:search,$options:"i"}}
      ]
    }
    :{};
    const skip = (page-1)*limit;
    return User.find(query).skip(skip).limit(limit).select("-password");
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
