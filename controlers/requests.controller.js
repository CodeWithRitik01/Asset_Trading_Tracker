import { Assets } from "../models/assets.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";

const negotiatePrice = async(req, res, next) =>{
    try {
    
        const {id} = req.params;
        const {newProposedPrice} =req.body;  

        const userId = req.user;

        const request = await Request.findOne({asset:id});
        const asset = await Assets.findOne({_id:id})

        if(userId == request.sender || userId == request.receiver){
            request.negotiatePrice = newProposedPrice;
            await request.save();
            return res.status(201).json({
                success:true,
                message:"Negotiation updated"
            })
        }else{
            return next(res.status(404).json("Your are not in receiver or sender"))

        }

    } catch (error) {
        return res.status(404).json(error)
    }
}

const acceptRequest = async(req, res, next) =>{
    try {
    
        const {id} = req.params;
        const request = await Request.findOne({asset:id});

        if(request.receiver != req.user){
            return next(res.status(404).json("You can not accept request"))
        }
        const CurrentHolder = await User.findOne({_id:request.sender})

        const asset = await Assets.findOne({_id:id})

        //calculating averagePrice
        const tradingJourneyLength = asset.tradingJourney.length + 1;
        let average = 0
        asset.tradingJourney.map((element) =>(
            average += element.price
        ))
        average+=request.negotiatePrice


        asset.currentHolder = CurrentHolder.username;
        asset.lastTradingPrice = request.negotiatePrice;
        asset.averageTradingPrice = average / tradingJourneyLength
        asset.numberOfTransfer = tradingJourneyLength
        asset.tradingJourney.push({
            holder: CurrentHolder.username,
            date: new Date(),
            price: request.negotiatePrice
        });

        request.status = "accepted"

        await asset.save();
        await request.save();

        return res.status(201).json({
            success:true,
            message:"Request accepted || Holder updated"
        })
        

    } catch (error) {
        return res.status(404).json(error)
    }
}

const denyRequest = async(req, res, next) =>{
    try {
    
        const {id} = req.params;

        const userId = req.user;
        const request = await Request.findOne({asset:id});

        if(request.receiver != userId){
            return next(res.status(404).json("You can not deny request"))
        }

        request.status = "deny"
        await request.save();

        return res.status(201).json({
            success:true,
            message: "Request denied"
        })


    } catch (error) {
        return res.status(404).json(error)
    }
}



export { negotiatePrice, acceptRequest, denyRequest }