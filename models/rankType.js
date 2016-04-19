import mongoose from 'mongoose'

var rankTypeSchema = new mongoose.Schema({
   name:{type:String,required:true,dropDups: true,unqiue:true},
   desc:String
});
export default mongoose.model('rankType', rankTypeSchema);