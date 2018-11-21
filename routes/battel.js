const express = require('express');
const router = express.Router();
const BattelModel = require('../models/battel');
const Utils = require('../helpers/utils');
const AuthHelper = require('../helpers/auth')

class BattleContorl{
    async fetchList(req, res){
        try{
            let result = await BattelModel.getAll()
            let data = Utils.createSuccessResponse("List of Battel", result)
            res.status(data.status).send(data)
        }catch(err){
            let data = Utils.createErrorResponse("Error in fetching list of battel", err)
            res.status(data.status).send(data)
        }
    }

    async add(req, res){

        try{
            let result = await BattelModel.add(req.body)
            let data = Utils.createSuccessResponse("Battel Added", result)
            res.status(data.status).send(data)
        }catch(err){
            console.log(err)
            let data = Utils.createErrorResponse("Error in inserting battel", 404, err)
            res.status(data.status).send(data)
        }
    }

    async count(req, res){

        try{
            let result = await BattelModel.count()
            let data = Utils.createSuccessResponse("Battel Count", result)
            res.status(data.status).send(data)
        }catch(err){
            console.log(err)
            let data = Utils.createErrorResponse("Error in collecting count", 404, err)
            res.status(data.status).send(data)
        }
    }

    async search(req, res){
        console.log(req.query)
        if(!Object.keys(req.query).length){
            let data = Utils.createErrorResponse("No condition passed in query", 404, {})
            return res.status(data.status).send(data)
        }
        try{
            let result = await BattelModel.search(req.query)
            let data = Utils.createSuccessResponse("Search results", result)
            res.status(data.status).send(data)
        }catch(err){
            console.log(err)
            let data = Utils.createErrorResponse("Error in inserting battel", 404, err)
            res.status(data.status).send(data)
        }
    }
    async getStats(req, res){
        try{
            let result = await BattelModel.getStats()
            let data = Utils.createSuccessResponse("Stats of Battel", result)
            res.status(data.status).send(data)
        }catch(err){
            let data = Utils.createErrorResponse("Error in fetching stats of battel", 400,err)
            res.status(data.status).send(data)
        }
    }
}

battelCtrl = new BattleContorl()

//Auth Token can be verified in all route by using route.all()


router.route("/list").get(AuthHelper.getToken, AuthHelper.verifyToken, battelCtrl.fetchList.bind(battelCtrl))
router.route("/add").post(AuthHelper.getToken, AuthHelper.verifyToken, battelCtrl.add.bind(battelCtrl))
router.route("/count").get(AuthHelper.getToken, AuthHelper.verifyToken, battelCtrl.count.bind(battelCtrl))
router.route("/search").get(AuthHelper.getToken, AuthHelper.verifyToken, battelCtrl.search.bind(battelCtrl))
router.route("/stats").get(AuthHelper.getToken, AuthHelper.verifyToken, battelCtrl.getStats.bind(battelCtrl))


module.exports = router