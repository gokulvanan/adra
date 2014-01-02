
/*
 * parent class to all workers. 
 * This js file is instantinated from root. 
 * Based on config message appropriate worker files are required/imported into this file
 */


var worker = null; // holds worker instance
var label = null; // name of worker file
var ctx = 

process.on("message", function(msg){
  try
  {
    var meta = msg.meta; // holds meta data 
    var type = meta.type;
    if(type === "config"){
      //configure
      label = meta.label;
      worker = require(meta.path+"/"+meta)(buildContext(meta));
    }
    else if(type === "action"){
      //action
      worker.onMsg(format(msg),meta.sender);
    }else{
      //supervise
      worker.onErr(format(msg),meta.sender);
    }
  }catch(err){
    console.log(err);
    process.send({"status":"error", "err":err.stack, "msg":msg, "meta":meta});
  }
});

function buildContext(meta){

  return {
   send : function(obj){
     if(!obj.to) throw new Error(" To address not specified for worker "+meta.from);
     if(!meta.from) throw new Error(" From address not specified for worker "+obj.to);
     process.send({
       status: "success",
       meta: meta,
       msg: obj.msg,
       to: obj.to
     });
   },
   restart: function(label){

   }
  }
};
