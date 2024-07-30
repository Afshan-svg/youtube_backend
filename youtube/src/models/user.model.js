import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
        // this makes search easier in mongodb
    }
})

export const User = mongoose.model("User", userSchema)