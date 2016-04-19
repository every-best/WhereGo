import Rank from './models/rank'
class RankService{
    save(oParam){
        return new Promise((resolve,reject)=>{
            const {currency,type,upOrDown} = oParam;
            Rank.findOneAndUpdate({currency:currency,type:type},oParam,{upsert:true},function(err,rank){
                if(err){
                    reject(err)
                }
                resolve(rank);
            });
        });
    }
}
export default RankService;