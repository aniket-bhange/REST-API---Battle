const jwt = require('jsonwebtoken');
const { privateKey } = require('../core/config')

class AuthHelper{
    getToken(req, res, next){
        const header = req.headers['authorization'];

        if(typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];

            req.token = token;
            next();
        } else {
            console.log(1111)
            res.sendStatus(403)
        }
    }

    verifyToken(req, res, next){
        jwt.verify(req.token, privateKey, (err, authorizedData) => {
            if(err){
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                res.jsonData = {
                    message: 'Successful log in',
                    authorizedData
                };
                next();
                console.log('SUCCESS: Connected to protected route');
            }
        })
    }

    generateToken(user){
        return new Promise((resolve, reject)=>{
            jwt.sign({user}, privateKey, { expiresIn: '1h' },(err, token) => {
                if(err) { return reject(err) }    
                resolve(token)
            });
        })
        
    }
}

module.exports = new AuthHelper()