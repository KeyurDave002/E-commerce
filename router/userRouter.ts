import express,{Router,Request,Response} from "express";
import {body} from "express-validator";
import * as userController from "../Controller/userController";
const userRouter: Router = Router();

userRouter.post("/login", [
    body('email').isEmail().withMessage("Proper Email is Required"),
    body('password').isStrongPassword().withMessage("Strong Password is Required")
], async (request: Request, response: Response) => {
    await userController.loginUser(request, response);
});


userRouter.post("/",[
    body('name').not().isEmpty().withMessage("Name is Required"),
    body('email').not().isEmpty().withMessage("email is Required"),
    body('address1').not().isEmpty().withMessage("address1 is Required"),
    body('phone').not().isEmpty().withMessage("phone is Required"),
    body('street').not().isEmpty().withMessage("street is Required"),
    body('address2').not().isEmpty().withMessage("address2 is Required"),
    body('city').not().isEmpty().withMessage("city is Required"),
    body('state').not().isEmpty().withMessage("state is Required"),
    body('pincode').not().isEmpty().withMessage(" pincode is Required"),
],async(request:Request,response:Response)=>{
   await userController.createuser(request,response)
});


userRouter.get("/me", TokenMiddleware, async (request: Request, response: Response) => {
    await userController.getUserInfo(request, response);
});

export default userRouter;

  
  

    
   
   