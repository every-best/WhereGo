import mongoose from 'mongoose'

var currencySchema = new mongoose.Schema({
    name:{type:String,require:true,unique:true,dropDups:true},
    code:{type:String,require:true,unique:true,dropDups:true},
    isDirectChanges:{type:Boolean,default:true},
    rateUrl:String,
    curId:Number,
    shoppingWebsites:[{type:String}],
    fightPrice:Number,
    LogisticsPrice:Number,
    otherInfo:String
});
export default mongoose.model('Currency', currencySchema);