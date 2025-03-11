import { Iuser } from "../Interface/user.interface";
import user from "../Model/user.model";
import userModel from "../Model/user.model";
import bcrypt from "bcrypt"
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
dotenv.config();


export class UserService {
    async signUp(data:Iuser): Promise<Iuser>{
        const existingUser=await user.findOne({email: data.email})
        if (existingUser){
          throw new Error("user alredy exists")
        }
        const newUser= new user(data)
        return await newUser.save();
      };

      async signIn(data: { email: string; password: string }) {
        const user = await userModel.findOne({ email: data.email });
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new Error('Invalid credentials');
        }
    
        // Ensure SECRET_STRING is treated as a Secret type
        const secret: Secret = process.env.SECRET_STRING!;
        const expiry: any = process.env.LOGIN_EXPIRY || '24h';
    
        if (!secret) {
            throw new Error('JWT secret is not defined in environment variables.');
        }
    
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: expiry });
    
        return token;
    }


};