import Currency from './../models/currency'
class CurrencyService{
     batchCreate(aParams){
       return new Promise((resolve,reject) => {
           Currency.insertMany(aParams,function(err,currenies){
               if(err){
                   reject(err);
               }
                resolve(currenies);
           });
       });
    }
    createOrUpdate(oParam){
        return new Promise((resolve,reject) => {
            Currency.create(oParam,function(err,currency){
                if(err){
                    reject(err);
                }
                resolve(currency);
            });
        });
    }
    update(conditions,oParam){
        return new Promise((resolve,reject) => {
            Currency.update(conditions,oParam,function(err,currency){
                if(err){
                    reject(err);
                }
                resolve(currency);
            });
        });
    }
}
export default   CurrencyService;