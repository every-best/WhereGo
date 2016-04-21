import superagent from 'superagent'
import  cheerio from 'cheerio'
export default function (oCurrency){

    function getHistoryPromise(resolve,reject){
        var sUrl = 'http://cn.investing.com/instruments/HistoricalDataAjax';
        var sStartDate,sEndDate;
        var now =new Date();
        sStartDate = (now.getFullYear()-1)+"/"+ (now.getMonth()+1)+"/"+now.getDay();
       if(now.getHours() > 18){
           sEndDate = now.toLocaleString('zh-CN', {hour12: false}).split(" ")[0].replace(/-/g,"/")
       }else{
           sEndDate = now.getFullYear()+"/"+ (now.getMonth()+1)+"/"+(now.getDay()-1);
       }
        var oParam = {
            action:'historical_data',
            curr_id:oCurrency.curId,
            st_date:sStartDate,
            end_date:sEndDate,
            interval_sec:"Daily"
        };
        superagent.post(sUrl)
            .set("Accept","text/plain, */*; q=0.01")
            .set("Accept-Encoding","gzip, deflate")
            .set("Accept-Language","zh-CN,zh;q=0.8")
            .set("Connection","keep-alive")
            .set("Content-Type","application/x-www-form-urlencoded")
            .set("Referer","http://cn.investing.com/currencies/usd-aud-historical-data")
            .set("X-Requested-With","XMLHttpRequest")
            .set("User-Agent","Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36")
            .set("Origin","http://cn.investing.com")
            .set("Cookie","userAlertPopupNotificationUntil=2016-05-13T12:47:11.879Z; __gads=ID=ff54914b6b70b4a7:T=1460551629:S=ALNI_MZ6isDU7qearSjeA9FuhKOUkWS5yw; isUserNoticedNewAlertPopup=1; activeConsent-6=1.1; PHPSESSID=a12l0j7702fq5ukars0u1top17; geoC=US; fpros_popup=up; show_big_billboard6=true; _gat=1; _gat_allSitesTracker=1; gtmFired=OK; SideBlockUser=a%3A2%3A%7Bs%3A10%3A%22stack_size%22%3Ba%3A1%3A%7Bs%3A11%3A%22last_quotes%22%3Bi%3A8%3B%7Ds%3A6%3A%22stacks%22%3Ba%3A1%3A%7Bs%3A11%3A%22last_quotes%22%3Ba%3A7%3A%7Bi%3A0%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A1%3A%225%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A22%3A%22%E6%BE%B3%E5%A4%A7%E5%88%A9%E4%BA%9A%E5%85%83+%E7%BE%8E%E5%85%83%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A19%3A%22%2Fcurrencies%2Faud-usd%22%3B%7Di%3A1%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A4%3A%222200%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A19%3A%22%E7%BE%8E%E5%85%83+%E5%8F%99%E5%88%A9%E4%BA%9A%E9%95%91%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A19%3A%22%2Fcurrencies%2Fusd-syp%22%3B%7Di%3A2%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A4%3A%229522%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A22%3A%22%E4%BA%BA%E6%B0%91%E5%B8%81+%E6%96%B0%E8%A5%BF%E5%85%B0%E5%85%83%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A19%3A%22%2Fcurrencies%2Fcny-nzd%22%3B%7Di%3A3%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A4%3A%222129%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A19%3A%22%E7%BE%8E%E5%85%83+%E5%8A%A0%E7%BA%B3%E5%A1%9E%E5%9C%B0%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A19%3A%22%2Fcurrencies%2Fusd-ghs%22%3B%7Di%3A4%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A4%3A%222174%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A19%3A%22%E7%BE%8E%E5%85%83+%E6%96%B0%E8%A5%BF%E5%85%B0%E5%85%83%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A19%3A%22%2Fcurrencies%2Fusd-nzd%22%3B%7Di%3A5%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A4%3A%222163%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A31%3A%22%E7%BE%8E%E5%85%83+%E6%AF%9B%E9%87%8C%E5%A1%94%E5%B0%BC%E4%BA%9A%E4%B9%8C%E5%90%89%E4%BA%9A%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A19%3A%22%2Fcurrencies%2Fusd-mro%22%3B%7Di%3A6%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A4%3A%222091%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A22%3A%22%E7%BE%8E%E5%85%83+%E6%BE%B3%E5%A4%A7%E5%88%A9%E4%BA%9A%E5%85%83%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A19%3A%22%2Fcurrencies%2Fusd-aud%22%3B%7D%7D%7D%7D; _ga=GA1.2.1958269951.1460551632")
        .send(oParam)
        .end(function(err,res){
                if(err){
                    reject(err);
                }
            var $ = cheerio.load(res.text);
             var aData =[];
            var elements = $("#curr_table tbody tr");
                console.log(elements.length);
                aData = Array.from(elements).map( (element) =>{
                    var oData = {
                        currency:oCurrency
                    };
                    Array.from( $('td',element)).forEach((tdEl,nIndex) => {
                        var sValue = $(tdEl).text();
                        switch(nIndex){
                            case 0:
                                oData.time = new Date(sValue.replace(/[\u5e74\u6708\u65e5]/g,'-'));
                                break;
                            case 1:
                                oData.exchangeRate = sValue;
                                break;
                            case 2:
                                oData.startPrice = sValue;
                                break;
                            case 3:
                                oData.highest = sValue;
                                break;
                            case 4:
                                oData.lowest = sValue;
                                break;
                            case 5:
                                oData.upOrDown = (sValue.replace("%","")-0)*0.01
                                break;
                        }
                    });
                    oData.currency = oCurrency;
                    return oData;
                });
                resolve(aData);
        });
    }
    return getHistoryPromise;
}
