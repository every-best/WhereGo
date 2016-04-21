"use strict";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
var rewire = require("rewire");

var getCurrencies = require("../crawler/getCurrencies");

import getHistoryRate from "../crawler/getHistoryRate"

describe("module",function(){

    //describe("crawler currencies Data" ,function(){
    //    it("getCurrencies Test",function(){
    //        return (new Promise(getCurrencies)).should.eventually.length.have.lengthOf(133);
    //    });
    //});

    describe("crawler history rate Data",function(){
        it("getHistoryRate Test",function(){
            return (new Promise(getHistoryRate({curId:2091}))).should.eventually.with.lengthOf(261);
        });
    });
});
