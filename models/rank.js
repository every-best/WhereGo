import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types;
var rankSchema = new mongoose.Schema({
    currency:{type:ObjectId,ref:"Currency"},
    rankType:{type:ObjectId,ref:"type"},
    upOrDown:{type:Number,required:true}
});
export default mongoose.model('rank', rankSchema);