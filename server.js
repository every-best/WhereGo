import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import React from "react";
import ReactDOM from "react-dom/server";
import Router from "react-router";

import config from './config';

mongoose.connect(config.database);
mongoose.connection.on('error',function(){
    console.log('Error:Could not connect to MongoDB.Did you forget to run mongodb?');
});

//第一次加载处理初始数据，获取货币信息




//getHistoryRate({curId:2091})
//    .then((results) => {
//        console.log(results);
//})
//    .catch( (err)  => {
//    console.warn(err);
//});
//
//var app = express();
//app.set('view engine', 'jade');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
//
//app.set('port',process.env.PORT || 3000);
//
//app.listen(app.get('port'),function(){
//    console.log("start server...")
//});
//
//module.exports = app;