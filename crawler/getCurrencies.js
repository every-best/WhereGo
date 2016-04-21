import  superagent from 'superagent'
import  cheerio from 'cheerio'
import async from "async";
import getCurrenciesCurid from './getCurrenciesCurid';

export default function (resovle,reject) {
    let sUrl = "http://cn.investing.com/currencies";
    var baseCode = "USD";
    superagent.get(sUrl)
        .end(function (err, res) {
            if (err) {
                reject(err);
            }
            var $ = cheerio.load(res.text),  aCurrencies = [];
            var aElements = $("#directoryFilter .curExpCol ul li a");
            if(!aElements){
                reject("res status :" + res.statusCode);
            }
            Array.from(aElements).map((element) => {
                var sRateUrl = $(element).attr("href"), sCode, sName, nPosition = 0;
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
            var count = 0,finalResults = [];
           for(let aFuns of seperateRequest(aFunctions,10)){
               setTimeout(function(){
                   Promise.all(aFuns.map((oFunc)=>{
                       return new Promise(oFunc);
                   })).then((results) => {
                       finalResults = finalResults.concat(results);

                        if(finalResults.length >= aFunctions.length){
                            resovle(finalResults);
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