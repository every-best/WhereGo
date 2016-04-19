import  superagent from 'superagent'
import  cheerio from 'cheerio'
import async from "async";
import  CurrencyService from  './../services/currencyService';
import getCurrenciesCurid from './getCurrenciesCurid';

var currencyService =  new  CurrencyService();

function getCurrencies(resovle,reject) {
    let sUrl = "http://cn.investing.com/currencies";
    var baseCode = "USD";
    superagent.get(sUrl)
        .end(function (err, res) {
            if (err) {
                reject(err);
            }
            var $ = cheerio.load(res.text),  aCurrencies = [];
            var aElements = $("#directoryFilter .curExpCol ul li a");
            Array.from(aElements).map((element) => {
                var sRateUrl = $(element).attr("href"), sCode, sName, nPosition;
                var aNames = $(element).attr("title").split(" ");
                var aTexts = $(element).text().split("/");
                if (aTexts && aTexts.length >= 2) {
                   aTexts.map((text,nIndex) => {
                      if(text != baseCode){
                          sCode = text;
                          nPosition = nIndex;
                      }
                   });
                }
                if (aNames && aNames.length > nPosition) {
                    sName = aNames[nPosition];
                }
                if (nPosition == 1) {
                    var oCurrency = {
                        name: sName,
                        code: sCode,
                        rateUrl: sRateUrl
                    }
                    aCurrencies[aCurrencies.length] = oCurrency;
                }
            });

            //获取curId
            var aFunctions = [];
            aFunctions = aCurrencies.map((oCurrency) => {
                return getCurrenciesCurid(oCurrency);
            });
            var count = 0,otherResults = [];
           for(let aFuns of seperateRequest(aFunctions,10)){
               setTimeout(function(){
                   Promise.all(aFuns.map((oFunc)=>{
                       return new Promise(oFunc);
                   })).then((results) => {
                       otherResults = otherResults.concat(results);
                       currencyService.batchCreate(results).then((currencies) => {
                            console.log(currencies.length);
                       })
                        .catch((err) => {
                               reject(err);
                           });
                        if(otherResults.length >= aFunctions.length){
                            resovle("success");
                        }
                   })
                       .catch((err) => {
                           reject(err);
                       });
               }.bind(this),5000*(count++));
            }

        }.bind(this));
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
module.exports = getCurrencies;