import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types;

var rateShema = new mongoose.Schema({
    currency:{type:ObjectId,ref:"Currency"},
    exchangeRate:{type:Number,required:true},
    time:{type:Date,required:true,min: Date('1970-01-01'),max:Date()}
});
export default mongoose.model('Rate', rateShema);