import mongoose, { model, Schema } from "mongoose";
import { Icertificate } from "../Interface/certificate.interface";

const certificateSchema = new Schema<Icertificate>({
    email: {
        type: String,
        required: [true, 'please enter the students email']
    },
    link: {
        type: String,
        required: [true, 'please enter the Certificate url']
    },

});

export default mongoose.model("Certificates", certificateSchema);