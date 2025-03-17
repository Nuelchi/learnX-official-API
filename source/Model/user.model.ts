import mongoose, { model, Schema, Document } from "mongoose";
import { Iuser } from "../Interface/user.interface";
import bcrypt from 'bcrypt'; 
import validator from 'validator';

const userSchema = new Schema<Iuser & Document>({
    firstname: {
        type: String,
        required: [true, 'Please enter the first name of the mentor']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter the last name of the mentor']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (this: any, value: string) {
                return value === this.password;
            },
            message: 'Password and confirm password do not match',
        },
    },

    
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isSubscribed: {
        type: Boolean, 
        default: false 
    },
}
    , { timestamps: true });

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
});

export default model<Iuser>("user", userSchema);