import mongoose from "mongoose"

const todoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false
        },
        createyBy: {
            // to add reference as to who created account
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"    
        }, 
        // array of subtodos
        subTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubTodo"
            }
        ]
    }, {timestamps: true}
)