
/*
 * parent class to all workers defined by users
 */


var worker = null; // holds worker instance
var label = null; // name of worker file
process.on("message", function(msg){
  try
  {
    var meta = msg.meta; // holds meta data 
    var type = meta.type;
    if(type === "config"){
      //configure 
      label = msg.label;
      worker = require(msg.path+"/"+label);
    }
    else if(type === "recieve"){
      //action
      worker.onMsg(format(msg),meta.sender);
    }else{
      //supervise
      worker.onErr(format(msg),meta.sender);
    }
  }catch(err){
    console.log(err);
    msg.meta=meta;
    process.send({"status":"error", "err":err.stack, "msg":msg});
  }
});

