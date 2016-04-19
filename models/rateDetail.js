import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types;

var rateDetailShema = new mongoose.Schema({
    currency:{type:ObjectId,ref:"Currency"},
    highest:Number,
    lowest:Number,
    startPrice:Number,
    upOrDown:Number,
    time:{type:Date,required:true,min: Date('1970-01-01'),max:Date()}
});
export default mongoose.model('RateDetail', rateDetailShema);