import mongoose, { model, Schema, Document } from "mongoose";
import { Iuser } from "../Interface/user.interface";
import bcrypt from 'bcrypt'; 
import validator from 'validator';

const userSchema = new Schema<Iuser & Document>({
    name: {
        type: String,
        required: true
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
        minlength: 8,
        validate: {
            validator: function (this: Iuser, confirmPassword: string) {
                return confirmPassword === this.password;
            },
            message: 'Password and confirm password do not match',
        },
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number'],
        minlength: 11,
        unique: [true, 'Please enter a new phone number']
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