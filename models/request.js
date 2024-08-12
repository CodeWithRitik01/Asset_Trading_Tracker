import mongoose, {Schema, Types} from "mongoose";

const requestSchema =  new Schema({
    sender:{
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver:{
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    asset:{
        type: Types.ObjectId,
        ref: "Assets",
        required: true
    },
    negotiatePrice:{
        type: Number
    },
    status: {
        type:String,
        default: "pending",
        enum: ["pending", "accepted", "deny"]    },
}, {
    timestamps:true
})

export const Request = mongoose.model("Request", requestSchema);