import superagent from 'superagent'
import  cheerio from 'cheerio'
function getCurrenciesInfo(oCurrency,options) {
    function getCurId(resolve, reject) {
        superagent.get(oCurrency.rateUrl)
            .end(function (err, res) {
                if (err) {
                    if(reject){
                        reject(err);
                    }
                }
                // 正则寻找
                if (res && options) {
                    if(options.curId){
                        if (/pairId: (\d+),/.test(res.text)) {
                            oCurrency.curId = RegExp.$1;
                            resolve && resolve(oCurrency);
                        } else {
                            reject && reject("【" + oCurrency.rateUrl + "】 not found curId.");
                        }
                    }else if(options.curRate){
                        //TODO 去获取汇率信息
                        try{
                            var $ = cheerio.load(res.text);
                            var rate = $($("#last_last")).text();
                            resolve && resolve({
                                currency:oCurrency,
                                exchangeRate:rate
                            });
                        }catch(err){
                            reject && reject("【" + oCurrency.rateUrl + "】 get rate err:"+err);
                        }
                    }

                } else {
                    reject && reject("【" + oCurrency.rateUrl + "】 res empty");
                }
            });
    }
    return getCurId;
}

export default getCurrenciesInfo;
