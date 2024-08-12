import { Assets } from "../models/assets.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";

const createAsset = async(req, res, next) =>{
    try {
        const { name, description, image } = req.body;
        const userId = req.user;
        const user = await User.findOne({_id:userId});
        
        const asset = await Assets.create({name, description, image, status:"draft", creator:user.username})
        return res.status(201).json({
            success: true,
            message:"Asset created successfully",
            assetId:asset._id

        })
    } catch (error) {
        return res.status(404).json(error)
    }
}

const updateAsset = async(req, res, next) =>{
      try {
        const {name, description, image} = req.body;
        const {id} = req.params;
        const asset = await Assets.findOne({_id: id})
        if(!asset){
            return next(res.status(400).json("Asset not found"))

        }
        const userId = req.user;
        const user = await User.findOne({_id:userId});

        if(user.username !== asset.creator){
            return next(res.status(400).json("you are not authorised change asset details"))
        }

        if(name){
            asset.name = name
        }
        if(description){
            asset.description = description
        }
        if(image){
            asset.image = image
        }

        await asset.save();
        return res.status(201).json({
            success: true,
            message:"Asset updated successfully",
            assetId:asset._id

        })

      } catch (error) {
        return res.status(404).json(error)

      }
}

const listOnMarketplace = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const {price} = req.body;

        const asset = await Assets.findOne({_id: id})
        if(!asset){
            return next(res.status(400).json("Asset not found"))

        }

        const userId = req.user;
        const user = await User.findOne({_id:userId});

        if(user.username !== asset.creator){
            return next(res.status(400).json("you are not authorised change asset details"))
        }

        asset.name = asset.name;
        asset.description = asset.description;
        asset.image = asset.image;
        asset.status = "published" 
        asset.currentHolder = user.username
        asset.tradingJourney = [
            {
                holder:user.username,
                date:new Date,
                price
            }
        ]
        asset.averageTradingPrice = 0,
        asset.lastTradingPrice = 0
        asset.numberOfTransfer = 0
        asset.isListed = true
        asset.proposals = 0

        await asset.save()
        return res.status(201).json({
            success: true,
            message:"Asset published successfully",
            asset
           });

    } catch (error) {
        return res.status(404).json(error)
    }
}

const getAsset = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const asset = await Assets.findOne({_id: id})
        if(!asset){
            return next(res.status(400).json("Asset not found"))

        }

        return res.status(201).json({
            success:true,
            asset
        })

    } catch (error) {
        return res.status(404).json(error)
    }
}

const createRequest = async(req, res, next) =>{
    try {
    
        const {id} = req.params;
        const {proposedPrice} = req.body;

        const asset = await Assets.findOne({_id: id})

        if(asset.status === "draft"){
            return next(res.status(400).json("Asset is not published on marketplace"))
        }

        const senderId = req.user;
        const user = await User.findOne({_id:senderId});    
        
        if(asset.currentHolder === user.username){
            return next(res.status(400).json("It's already your asset"))

        }
        const receiverName = asset.currentHolder;
        const receiver = await User.findOne({username:receiverName});   
        const receiverId =  receiver._id

        asset.proposals = asset.proposals+1;
        
        await asset.save()
        const request = await Request.create({
            sender: senderId,
            receiver: receiverId,
            asset: id,
            negotiatePrice:proposedPrice,
            status: "pending"
        });

        return res.status(201).json({
            success:true,
            request    
        })

    } catch (error) {
        return res.status(404).json(error)
    }
}


export {createAsset, updateAsset, listOnMarketplace, getAsset, createRequest}