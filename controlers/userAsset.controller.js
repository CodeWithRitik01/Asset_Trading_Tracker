import { Assets } from "../models/assets.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";


const getUserAssets = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const user = await User.findOne({_id:id});

        const asset = await Assets.find();

        const usersAssetList = asset.filter(element => element.creator === user.username)

        return res.status(201).json({
            success: true,
            usersAssetList
        });

    } catch (error) {
        return res.status(404).json(error)
    }
}

const getMarketAssets = async(req, res, next) =>{
    try {

        const asset = await Assets.find();

        const usersAssetList = asset.filter(element => element.status === "published")

        return res.status(201).json({
            success: true,
            usersAssetList
        });

    } catch (error) {
        return res.status(404).json(error)
    }
}

const getAllRequests = async(req, res, next) =>{
    try {
    
        const {id} = req.params;
        const request = await Request.find();
         
        const usersRequests =  request.filter(element => element.receiver == id)

        return res.status(201).json({
            success:true,
            usersRequests
        })


    } catch (error) {
        return res.status(404).json(error)
    }
}

export {getUserAssets, getMarketAssets, getAllRequests}