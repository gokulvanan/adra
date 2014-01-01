
var logger = require('./logger');
var email= require("./email");

// Init logger, emailer
exports.init = function(conf,dir,logName){
  var log =  logger.getLogger(conf,dir,logName); // initialize logger
  email.init(conf,log);
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
}
