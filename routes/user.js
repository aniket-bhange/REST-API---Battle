const express = require('express');
const router = express.Router();
const user = require('../models/user')
const Utils = require('../helpers/utils');
const AuthHelper = require('../helpers/auth');

class UserControl{

    async login(req, res){
        const { body } = req;
        const { username, password } = body;

        if(username === user.username && password === user.password) {
            try{
                let token = await AuthHelper.generateToken(user)
                let data = Utils.createSuccessResponse("Login Success", token)
                res.status(data.status).send(token)
            }catch(err){
                console.log('ERROR: Could not log in');
                let data = Utils.createErrorResponse("Error in login", 404, {})
                res.status(data.status).send(data)
            }
        } else {
            console.log('ERROR: Could not log in');
            let data = Utils.createErrorResponse("Error in login", 404, {})
            res.status(data.status).send(data)
        }
            
    }
}

const userCtrl = new UserControl()

router.route("/login").post(userCtrl.login.bind(userCtrl))

module.exports = router

