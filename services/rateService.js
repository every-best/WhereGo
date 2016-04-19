import Rate from "./models/rate"
class RateService{
    batchSave(aParams){
        return new Promise((resolve,reject) => {
            Rate.insertMany(aParams,function(err,rates){
                if(err){
                    reject(err);
                }
                resolve(rates);
            });
        })
    }
    save(oParam){
        return new Promise((resolve,reject) => {
            Rate.create(oParam,function(err,rate){
               if(err){
                   reject(err);
               }
               resolve(rate);
            });
        })
    }
}
export default RateService;