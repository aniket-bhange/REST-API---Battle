const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BattelOptions = {
    name:String,
    year: Number,
    battle_number: Number,
    attacker_king: String,
    defender_king: String,
    attacker_1: String,
    attacker_2: String,
    attacker_3: String,
    attacker_4: String,
    defender_1: String,
    defender_2: String,
    defender_3: String,
    defender_4: String,
    attacker_outcome: String,
    battle_type: String,
    major_death: Number,
    major_capture: Number,
    attacker_size: Number,
    defender_size: Number,
    attacker_commander: String,
    defender_commander: String,
    summer: Number,
    location: String,
    region: String,
    note: String
}
var BattelSchema = new Schema(BattelOptions);
var BattelModel = mongoose.model('battel', BattelSchema);
class Battel{
    constructor(){
        // this.table = mongoose.model('battel', BattelSchema)
    }

    count(){
        return new Promise((resolve, reject)=>{
           BattelModel.find({}).count((err, data)=>{
                if(err){
                    return reject(err)
                }
                resolve(data)
            })
        })
    }

    getAll(){
        return new Promise((resolve, reject)=>{
           BattelModel.find({}, (err, data)=>{
                if(err){
                    return reject(err)
                }
                resolve(data)
            })
        })
    }

    add(packet){
        let b = new BattelModel(packet)
        return b.save()
    }

    getActive(fieldName){
        
        let name = `$${fieldName}`
        return new Promise((resolve, reject)=>{
            BattelModel.aggregate([
                { $group: {
                    _id: name, count: {$sum: 1}}
                },
                {$sort:{count:-1}},
                {$limit:1}  
            ], (err, result)=>{
                if(err){
                    return reject(err)
                }
                resolve(result[0]._id)
            })
        })
        
    }

    totalWinLoss(){
        return new Promise((resolve, reject)=>{
            BattelModel.aggregate([
                { 
                    "$group": {
                        "_id": "$attacker_outcome",
                        "count": { "$sum": 1 }
                    }
                }
            ], (err, result)=>{
                if(err){
                    return reject(err)
                }
                let op = {};
                for(let i of result){
                    if(i._id == 'win'){
                        op.win = i.count
                    }
                    if(i._id == 'loss'){
                        op.loss = i.count
                    }
                }
                resolve(op)
            })
        })
    }

    getDistintValue(field){
        return new Promise((resolve, reject)=>{
            BattelModel.distinct(field, (err, result)=>{
                if(err){
                    return reject(err)
                }
                resolve(result.filter(Boolean))
            })
        })
    }

    getMathValues(val){
        let query = {}
        query[val] = 1
        return new Promise((resolve, reject)=>{
            BattelModel.find({}, query, (err, result)=>{
                let value = result.map(v=> v.defender_size).filter(Number)
                let compValue = {
                    max: Math.max(...value),
                    min: Math.min(...value),
                    avarage: value.reduce(function(p,c,i,a){return p + (c/a.length)},0)
                }
                if(err){
                    return reject(err)
                }
                resolve(compValue)
            })
        })
    }

    async getStats(){
        
        let totalBattleAction = this.totalWinLoss();
        let type = this.getDistintValue('battle_type');
        let size = this.getMathValues('defender_size');
        let activesList = ['attacker_king', 'defender_king', 'region', 'name']
        let promises = []
        for(let i of activesList){
            promises.push(this.getActive(i))
        }
        try{
            let [attacker_king, defender_king, region, name] = await Promise.all(promises);
            let outcome = await totalBattleAction;
            let battleType = await type;
            let defenderSize = await size;
            return {
                'most_active':{
                    attacker_king: attacker_king,
                    defender_king: defender_king,
                    region: region,
                    name: name
                },
                'attacker_outcome': outcome,
                'battle_type': battleType,
                'defender_size': defenderSize
            }
        }catch(err){
            console.log(err)
            return err
        }
    }

    search(options, queryType){
        let query = {'$and':[]}

        if(options.location){
            query.$and.push({ location: options.location })
        }
        if(options.type){
            query.$and.push({ battle_type: options.type })
        }
        if(options.king){
            query.$and.push({
                $or: [
                    { defender_king: options.king },
                    { attacker_king: options.king }
                ]
            })
        }
        return new Promise((resolve, reject)=>{
            BattelModel.find(query, (err, battles)=>{
                console.log(battles, err)
                if(err){
                    return reject(err)
                }
                resolve(battles)
            })
        })
    }


}

module.exports = new Battel()