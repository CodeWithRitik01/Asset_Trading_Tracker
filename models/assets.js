import mongoose, {Schema} from "mongoose";

const assetSchema =  new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    image: {
        type:String
    },
    status:{
        type:String
    },
    creator:{
        type:String
    },
    currentHolder: {
        type:String
    },
    tradingJourney: [
        {
            holder: {type: String},
            date: {type: Date, default:Date.now},
            price: {type: Number}
        }
    ],
    averageTradingPrice: {
        type: Number,
        default: 0
    },
    lastTradingPrice: {
        type: Number,
        default: 0
    },
    numberOfTransfer: {
        type: Number,
        default: 0
    },
    isListed: {
        type: Boolean,
        default: false
    },
    proposals: {
        type: Number,
        default: 0
    }
}, {
    timestamps:true
})

export const Assets = mongoose.model("Assets", assetSchema);