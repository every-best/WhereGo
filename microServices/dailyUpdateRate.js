import  superagent from 'superagent'
import  cheerio from 'cheerio'
import CurrencyService from '../services/currencyService'
import getCurrenciesInfo from './getCurrenciesInfo';

const currencyService = new CurrencyService();

export default  function (resolve,reject){
    currencyService.list().then((currencies) => {
        var aFunctions = [];
        aFunctions = currencies.map((oCurrency) => {
            return getCurrenciesInfo(oCurrency,{curRate:true});
        });
        var count = 0,finalResults = [];
        for(let aFuns of seperateRequest(aFunctions,10)){
            setTimeout(function(){
                Promise.all(aFuns.map((oFunc)=>{
                    return new Promise(oFunc);
                })).then((results) => {
                    finalResults = finalResults.concat(results);

                    if(finalResults.length >= aFunctions.length){
                        resolve(finalResults);
                    }
                })
                    .catch((err) => {
                        reject(err);
                    });
            }.bind(this),5000*(count++));
        }
    })
    .catch((err)=>{
            reject(err);
        })
}

//将promise 分割处理
function* seperateRequest(aFunctions,nNumberLimit){
    var len = aFunctions.length;
    if(nNumberLimit > len){
        return;
    }
    for(let i = 0;i <= len/nNumberLimit;i++){
        if(i == len/nNumberLimit){
            console.log(nNumberLimit*i + " to "+  len);
            return aFunctions.slice(nNumberLimit*i,len);
        }else{
            console.log(nNumberLimit*i + " to "+  nNumberLimit*(i+1));
            yield  aFunctions.slice(nNumberLimit*i, nNumberLimit*(i+1));
        }
    }
}


