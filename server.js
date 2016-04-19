require('babel-register');
require('babel-polyfill');

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var React = require("react");
var ReactDOM = require("react-dom/server");
var Router = require("react-router");

var config = require('./config');

mongoose.connect(config.database);
mongoose.connection.on('error',function(){
    console.log('Error:Could not connect to MongoDB.Did you forget to run mongodb?');
});

//第一次加载处理初始数据，获取货币信息
//var getCurrencies = require("./crawler/getCurrencies");
var getHistoryRate = require("./crawler/getHistoryRate");

//new Promise(getCurrencies)
//    .then((result)=>{
//            console.log("insert success");
//        })
//    .catch( (err) => {
//        console.warn(err);
//    });
getHistoryRate({curId:2091})
    .then((result) => {
        console.log(result);
})
    .catch( (err)  => {
    console.warn(err);
});
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