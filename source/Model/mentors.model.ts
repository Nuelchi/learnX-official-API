import mongoose, { model, Schema } from "mongoose";
import { Imentor } from "../Interface/mentor.interface";

const mentorSchema = new Schema<Imentor>({
    firstname: {
        type: String,
        required: [true, 'Please enter the first name of the mentor'],
    },
    lastname: {
        type: String,
        required: [true, 'Please enter the last name of the mentor'],
    },
    email: {
        type: String,
        required: [true, 'please enter the email']
    },
    mentorTrack: {
        type: String,
        enum:['backend', 'frontend','product design', 'data analysis',  'artificial-intelligence'],
        required: [true, 'please enter the track the mentor is incharge of'],
        lowercase: true,
    },

    phone: {
        type: String,
        required: [true, 'please enter the phone number']
    },
    image: {
        type: String,
        required: [true, 'please enter the image of the mentor']
    },
});

export default mongoose.model("Mentor", mentorSchema);