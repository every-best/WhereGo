
import CurrencyService from  './../services/currencyService';
import RateService from './../services/rateService';
import getCurrencies from "./crawler/getCurrencies";
import getHistoryRate  from "./getHistoryRate";

var currencyService = new CurrencyService();
var rateService = new RateService();

function initData(resolve,reject){

      new Promise(getCurrencies)
            .then((results)=>{
                currencyService.batchCreate(results).then((currencies) => {
                        //然后获取历史汇率数据
                        setTimeout(function(){
                            currencies.forEach((oCurrency) => {
                                new Promise(getHistoryRate(oCurrency))
                                    .then((results)=>{
                                        rateService.batchSave(results).then( (rateResult) =>{
                                                console.log("rate right...");
                                            })
                                            .catch( (err) => {
                                                console.log("rate err..." + err);
                                            })
                                    })
                                    .catch( (err) => {

                                    })
                            });

                        },5000);
                })
                .catch((err) => {
                    reject(err);
                });

            console.log("insert success");
        })
        .catch( (err) => {
            console.warn(err);
        });
}

module.exports = initData;