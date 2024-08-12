import mongoose, {Schema} from "mongoose";
import pkg from 'bcryptjs';
const {hash}  = pkg;

const userSchema = new Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password: {
        type: String
    }
}, {
    timestamps:true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await hash(this.password, 10)
})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

export const User = mongoose.model("User", userSchema);