
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
  var WORKERS = {}; // gobal map that holds all chil instance refrences

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

  function stopWorkers(){
    for(var w in WORKERS){
      var workerWrap = WORKERS[w];
      workerWrap.killAll(function(err){
       if(err) console.log("Error in killing worker process for "+w);
       else console.log("Workers "+w+" have been stopped");
       process.exit(0);
      });
    }
  }

  /**
   * retuns WokerWrapper than holds all instances of that worker
   * */
  function buildWorkerObj(worker){
    var count = worker.instances;
    var index = -1;
    var instances = new Array();
    var pooling = "RoundRobin";

    for(var i=0; i<count; i++){
      instances.push(buildSingleInstanceOfAWorker());
    }

    return {
      getInstance: function(){
        if(pooling === "RoundRobin"){
          index = (index + 1 >= count) 0 : index + 1;
        }
        var refObj = instances[index];
        return refObj;
      },
      killAll: function(cb){
       try{
          for(var i=0; i < count; i++){
            var instObj = instances[i];
            process.kill(instObj.pid);
          }
          cb();
       }catch(err){
         cb(err);
       }
      }
    };
  }


  function buildSingleInstanceOfAWorker(){
    var instObj = {};
    var msg = {
      meta : {
        type : "config",
        label: worker.name,
        path: worker.path
      }
    };

    var child = forkChild(msg);

    instObj.ref = child;
    instObj.pid = child.pid;

    return instObj;
  }

  function forkChild(msg){
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
        else if(type === "action"){
          if(msg.status === "error"){
            // invoke supervisior
          }else{
            // process message and redirect to sent worker
          }
        }else{
          if(msg.status === "error"){
            // invoke root supervisior
          }else{
            // log success
          }
        }
      }catch(err){
         // error in routes processing shutdown system
      }
    });
    // sent msg to configure child
    child.send(msg);
  }

  /**
   * returns the worker child instance based on label
   * */
  function getWorkers(worker){
    var obj = WORKERS[worker];
    if(!obj) throw Error("No Worker "+worker"+.js defined");
    var w = obj.getInstance();
    return w;
  }

  /*
   * restarts the worker child instances
   * */
  function restart(worker){
    //TODO
  }

})();


  process.on('SIGINT', function() {
    stopWorkers();
    console.log("adra has stopped all workers");
    process.exit(0);
  });
