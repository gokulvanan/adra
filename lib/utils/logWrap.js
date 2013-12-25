
var fs = require('fs');
var logger = require('./logger');
var ncp = require('ncp').ncp; //recursive copy
var email= require("./email");
var cache= require("./cache");
var mysql = require('mysql'); //added for making utils and rawUtils
var config=null;

// Init logger, emailer
exports.init = function(conf,dir,logName){
  var d = (dir) ? dir : "system";
  var log =  logger.getLogger(conf,dir,logName); // initialize logger
  email.init(conf,log);
  cache.init(conf,log);
  // overriding logger.alert behaviour to email error reports
  var alert = log.alert;
  log.alert = function(msg,obj){
    email.reportError(msg,obj);
    alert(msg,obj);
  }
  // configure email
  conf.getEmailer = function(){ return email; };
  // configure logger
  conf.getLogger = function(){ return log; };
  // configure cache
  conf.getCacheMap = function(){ return cache; };
}
