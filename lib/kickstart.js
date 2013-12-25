
/*
 * Bootstrap class that invokes the root process of adra system
 *
*/
var fs = require("fs");
var logWrapper = require("logWrap");
var config = "/config.js";

(function(){

  var flag = process.argv[2];
  var conf = require(process.cwd()+config);
  logWrap.init(conf,"system");
  conf.consoleDisable=(flag.indexOf("run") === -1);
  console.log("\nadra is  starting all workers");
  var root = require(__dirname+"/framework/root");
  root.init(conf);

}).call(this);
