import mongoose, { model, Schema } from "mongoose";
import { Icourse } from "../Interface/course.interface";

const courseSchema = new Schema<Icourse>({
    title: {
        type: String,
        required: [true, 'Please enter the title of the book'],
        trim: true // Removes extra spaces
    },
    image: {
        type: String,
        required: [true, 'please enter the author']
    },
    category: {
        type: String,
        enum:['backend', 'frontend','product design', 'data analysis'],
        required: [true, 'please enter the category of the course'],
        lowercase: true
    },
    type: {
        type: String,
        enum:['Video','Book'],
        required: [true, 'please enter the type of the course']
    },
    Link: {
        type: String,
        required: [true, 'please enter the course or book upload url']
    },

});

export default mongoose.model("course", courseSchema);