// creating models using mongoose 

import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
username: {
type: String,
required: true,
unique: true,
lowercase: true
//for validation
},
email: {
type: String,
required: true,
unique: [true, "email unqiue  required"]
//custom validators
},

password: {
type: String,
required: true
}
}, {timestamps: true})

//mongoose ek model banav user naam ka jo userSchema me hai
export const User = mongoose.model("User", userSchema)

// in database user becomes users and toLowercase --> Common interview questions


 


