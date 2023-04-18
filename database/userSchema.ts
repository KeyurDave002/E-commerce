import mongoose from "mongoose";
import { IUser } from "../models/IUser";

const userSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address1: {type: String, required: true},
    phone: {type: String, required: true},
    street: {type: String, required: true},
    address2: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    pincode: {type: String, required: true},
},{timestamps: true}); 

const userTable = mongoose.model<IUser>('user',userSchema);
export default userTable;