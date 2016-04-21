import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import React from "react";
import ReactDOM from "react-dom/server";
import Router from "react-router";

import CurrencyService from  './services/currencyService';
import RateService from './services/rateService';
import getCurrencies from "./crawler/getCurrencies";
import getHistoryRate  from "./crawler/getHistoryRate";

var currencyService = new CurrencyService();
var rateService = new RateService();

import config from './config';

mongoose.connect(config.database);
mongoose.connection.on('error',function(){
    console.log('Error:Could not connect to MongoDB.Did you forget to run mongodb?');
});

//
var app = express();
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'),function(){
    console.log("start server...")
});

app.get('/init',function(req,res){
    new Promise(getCurrencies)
        .then((results)=>{
            currencyService.batchCreate(results).then((currencies) => {
                //然后获取历史汇率数据
                console.info("insert currencies success");
                res.send({ code:200,msg:"insert currencies success"});
            })
                .catch((err) => {
                    console.warn(err);
                    res.send({code:501,msg:err});
                });
        })
        .catch( (err) => {
            console.warn(err);
            res.send({code:501,msg:err});
        });
});

app.get("/second",function(req,res){
    currencyService.list().then( (currencies) => {
        var total = currencies.length,count = 0;
        currencies.forEach((oCurrency,nIndex) => {
            setTimeout(function(){
                new Promise(getHistoryRate(oCurrency))
                    .then((results)=>{
                        rateService.batchSave(results).then( (rateResult) =>{
                            console.info("rate right... " + rateResult.length);
                            if(total == count++){
                                console.info("insert rates success");
                                res.send({ code:200,msg:"insert all data success"});
                            }
                        })
                            .catch( (err) => {
                                console.warn(err);
                                res.send({code:501,msg:err});
                            })
                    })
                    .catch( (err) => {
                        console.warn(err);
                        res.send({code:501,msg:err});
                    })
            },3000*nIndex);

        });
    }).catch( (err) => {
        console.warn(err);
        res.send({code:501,msg:err});
    })

})

//module.exports = app;