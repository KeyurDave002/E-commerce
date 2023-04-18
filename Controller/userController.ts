import { Request, Response } from "express";
import { APP_STATUS } from "../constants/constants";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import { IUser } from "../models/IUser";
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import  Jwt  from "jsonwebtoken";
import userTable from "../database/userSchema";

export const createuser = async(req:Request,res:Response)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(200).json({
            error:error.array()
        })
    }
    try{
        let {Users_id,name,address1,email,street,phone,city,address2,pincode,state} = req.body;


        let theuserobj : IUser ={
            Users_id:Users_id,
            name: name,
            address1: address1,
            email: email,
            street: street,
            phone: phone,
            city: city,
            address2: address2,
            pincode: pincode,
            state: state
        }
        theuserobj =await new userTable(theuserobj).save();
        if(theuserobj){
            return res.status(200).json(theuserobj)
        }
    }
    catch(error : any){
        return res.status(500).json({
            status : APP_STATUS.FAILED,
            data : null,
            error : error.message,
        });
    }
}

/**
 * @usage : login a user
 *  @method : POST
 *  @params : email, password
 *  @url : http://localhost:9000/users/login
 *  @access : PUBLIC
 */
export const loginUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }
    try {
        // read the form data
        let {email, password} = request.body;

        // check for email
        const userObj: IUser | undefined | null = await userTable.findOne({email: email});
        if (!userObj) {
            return response.status(500).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Invalid Email address!"
            });
        }
        // check for password
        let isMatch: boolean = await bcryptjs.compare(password, userObj.email);

        if (!isMatch) {
            return response.status(500).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Invalid Password!"
            });
        }
// -----
        // create a token
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
        
        const payload: any = {
            user: {
                id: userObj.Users_id,
                email: userObj.email
            }
        };
        if (secretKey && payload) {
            Jwt.sign(payload, secretKey, {
                expiresIn: 100000000000
            }, (error, encoded) => {
                if (error) throw error;
                if (encoded) {
                    return response.status(200).json({
                        status: APP_STATUS.SUCCESS,
                        data: userObj,
                        token: encoded,
                        msg: "Login is Success!"
                    })
                }
            })
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}

/**
 * @usage : Get User Info
 *  @method : GET
 *  @params : no-params
 *  @url : http://localhost:9000/users/me
 *  @access : PRIVATE
 */
export const getUserInfo = async (request: Request, response: Response) => {
    try {
        const userObj: any = request.headers['user-data'];
        const userId = userObj.id;
        const mongoUserId = new mongoose.Types.ObjectId(userId);
        const userData: IUser | undefined | null = await userTable.findById(mongoUserId);
        if (userData) {
            response.status(200).json({
                status: APP_STATUS.SUCCESS,
                data: userData,
                msg: ""
            });
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}