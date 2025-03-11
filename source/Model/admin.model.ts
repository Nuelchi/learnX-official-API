import { model, Schema } from "mongoose";
import { Iadmin } from "../Interface/admin.interface";
import bcrypt from 'bcrypt';
import validator from 'validator';

const adminSchema = new Schema<Iadmin>({
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
            validator: function (this: Iadmin, confirmPassword: string) {
                return confirmPassword === this.password;
            },
            message: 'Password and confirm password do not match',
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin',
    },
},
    { timestamps: true });

// Pre-save hook to hash the password
adminSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default model<Iadmin>("admin", adminSchema);