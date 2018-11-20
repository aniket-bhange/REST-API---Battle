const express = require('express');
const router = express.Router();
const BattelModel = require('../models/battel');
const Utils = require('../helpers/utils');
class BattleContorl{
    async fetchList(req, res){
        try{
            let result = await BattelModel.getAll()
            let data = Utils.createSuccessResponse("List of Battel", result)
            res.status(data.status).send(data)
        }catch(err){
            let data = Utils.createSuccessResponse("Error in fetching list of battel", err)
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
            let data = Utils.createSuccessResponse("Error in inserting battel", 404, err)
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
            let data = Utils.createSuccessResponse("Error in collecting count", 404, err)
            res.status(data.status).send(data)
        }
    }
}

battelCtrl = new BattleContorl()

router.route("/list").get(battelCtrl.fetchList.bind(battelCtrl))
router.route("/add").post(battelCtrl.add.bind(battelCtrl))
router.route("/count").get(battelCtrl.count.bind(battelCtrl))


module.exports = router