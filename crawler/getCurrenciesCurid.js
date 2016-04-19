import superagent from 'superagent'
function getCurrenciesCurid(oCurrency) {
    //console.log(aCurrencies.length);
    //var count = 0;
    //var aFunctions = aCurrencies.map((oCurrency,nIndex) => {
    function getCurId(resolve, reject) {
        superagent.get(oCurrency.rateUrl)
            .end(function (err, res) {
                if (err) {
                    if(reject){
                        reject(err);
                    }
                }
                // 正则寻找
                if (res) {
                    if (/pairId: (\d+),/.test(res.text)) {
                        oCurrency.curId = RegExp.$1;
                        resolve && resolve(oCurrency);
                    } else {
                        reject && reject("【" + oCurrency.rateUrl + "】 not found curId.");
                    }
                } else {
                    reject && reject("【" + oCurrency.rateUrl + "】 res empty");
                }
            });
    }
    return getCurId;
}

export default getCurrenciesCurid;
    //    return getCurId;
    //});
    //async.mapLimit(aFunctions,10,function(fn,callback){
    //    new Promise(fn).then((result) => {
    //        console.log(count ++);
    //    }).catch((err) => {
    //        console.log(err);
    //    });
    //},function(err,result){
    //
    //});

    //Promise.all(aFunctions
    //    .filter((fn,nIndex) => {
    //        return nIndex < aCurrencies.length/3;
    //    })
    //    .map((fn) => {
    //    return new Promise(fn);
    //}))
    //.then((aResults) => {
    //        console.log("done success1: "+ aCurrencies);
    //    })
    //.catch((err) => {
    //        console.log("getCurId Error:"+err);
    //    });
    //setTimeout(function(){
    //    Promise.all(aFunctions
    //        .filter((fn,nIndex) => {
    //            return nIndex > aCurrencies.length/3 && nIndex < aCurrencies.length/3*2;
    //        })
    //        .map((fn) => {
    //            return new Promise(fn);
    //        }))
    //        .then((aResults) => {
    //            console.log("done success2: "+ aCurrencies);
    //        })
    //        .catch((err) => {
    //            console.log("getCurId Error:"+err);
    //        });
    //}.bind(this),10000);
    //setTimeout(function() {
    //    Promise.all(aFunctions
    //        .filter((fn, nIndex) => {
    //            return nIndex > aCurrencies.length / 3 * 2 && nIndex < aCurrencies.length;
    //        })
    //        .map((fn) => {
    //            return new Promise(fn);
    //        }))
    //        .then((aResults) => {
    //            console.log("done success3: " + aCurrencies);
    //        })
    //        .catch((err) => {
    //            console.log("getCurId Error:" + err);
    //        });
    //}.bind(this),15000);