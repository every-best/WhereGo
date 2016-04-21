import Rate from "./../models/rate"
import RateDetail from "./../models/rateDetail"
class RateService{
    batchSave(aParams){
        return new Promise((resolve,reject) => {
            Promise.all([
                new Promise(function(resolve,reject){
                    Rate.insertMany(aParams,function(err,rates){
                        if(err){
                            reject(err);
                        }
                        resolve(rates);
                    });
                }),
                new Promise(function(resolve,reject){
                    RateDetail.insertMany(aParams,function(err,rateDetails){
                        if(err){
                            reject(err);
                        }
                        resolve(rateDetails);
                    })
                })]
            ).then( (results) =>{
                    resolve(results);
            })
            .catch((err) => {
                reject(err);
            })

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