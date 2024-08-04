import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// jwt is a bearer token as well which acts as key
// if user has bearer token grant him access

// since we are using middleware, i.e whenever user saves the password hash it we need to use next()



const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // remove white spaces
        index: true
        // this makes search easier in mongodb
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // remove white spaces
        // this makes search easier in mongodb
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        // remove white spaces
        index: true
        // this makes search easier in mongodb
    },
    avatar: {
        type: String, //cloudinary used
        required: true
    },
    coverImage: {
        type: String, //cloudinary used
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken:{
        type: String
    }
},{ timestamps: true}
)

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next() 

        this.password = await bcrypt.hash(this.password, 10)
        next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
// this. is coming from database

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

// this refresh token is refreshed again so we add less sign things in it
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema)