
/*
 * The main class which which is starting point of adra hirerachy
 * It has to childreen application and system
 * application controlls all user defined workers
 * system controlls are system utilities
 *
*/

var common = require("../utils/common");
module.exports = (function(){

  var logger = null;
  var WORKERS = {};

  //build args object for each worker
  return {
    init: function(conf){
     logger=conf.getLogger()
     logger.info("insider root");
     initWorkders(conf);
    },
    start: function(conf){

      startWorkers():
    },
    stop: function(conf){

      stopWorkers();
    }

  };

  /**
   * The main context thats sent into every child
   *
   * */
  function buildContext(){
    return{
      getWorker: function(worker){
        var obj = WORKERS[worker];
        if(!obj) throw Error("No Worker "+worker"+.js defined");
        var w = obj.getInstance();
        w.send = function
        return w;
      },
      restart: function(worker){
        //TODO
      }
    };
  }

  function startWorkers(conf){
    common.getValidPath(conf.workers.path,function(err,path){
      if(err) console.log("Error invalid workers path configured");
      else{
        for(var w in cntx){
          var worker = cntx[w];
          worker.path = path;
          WORKERS[w]=buildWorkerObj(worker);
        }
      }
    }
  }

  function buildWorkerObj(worker){
    var count = worker.instances;
    var index = 0;
    var instances = new Array();
    var pooling = "RoundRobin";

    for(var i=0; i<count; i++){
      instances.push(buildSingleInstanceOfAWorker());
    }

    return {
      getInstance(){
        var refObj = this.instances[index];
        if(pooling === "RoundRobin"){
          this.index = (this.index + 1 >= count) 0 : this.index + 1;
        }
        return refObj;
      }
    }
  }


  function buildSingleInstanceOfAWorker(){
    var instObj = {};
    var msg = {
      meta : {
        type : "config"
      },
      label: worker.name,
      path: worker.path
    };

    var child = cp.fork("./application.js");

    child.on("exit",function(code){
      // TODO Add code here to restart on handle this case
    });

    child.on("message",function(msg){
      try{
        var meta = msg.meta; // holds meta data 
        var type = meta.type;
        if(type === "config"){
          //configure 
          if(msg.status === "error"){
            // kill all process and throw error
          }else{
            // log success on worker instantiation
          }
        }
        else if(type === "recieve"){
          if(msg.status === "error"){
            // invoke supervisior
          }else{
            // Unexpected case 
          }
        }else{
          //supervise
          // Invoke parent supervisor for this class
          // Not sure what needs to be done here
        }
      }catch(err){

      }
    });


    child.send(msg);

    instObj.ref = child;
    instObj.pid = child.pid;

    return instObj;
  }

})();


  process.on('SIGINT', function() {
    stopWorkers();
    console.log("adra has stopped all workers");
    process.exit(0);
  });
