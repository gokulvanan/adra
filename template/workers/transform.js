


/*
 * Methods in context
 * ctx.getChild("name");
 * ctx.getParent();
 * ctx.getSibling("name")
 *
 *
 * */
module.exports = function(ctx){
  //var logger = ctx.getLogger();

  return{
    onMsg: function(msg,from){
      console.log(" in transform");
      console.log(msg);
      ms.data = msg.data.toUpperCase();
      var load = ctx.getChild("load");
      load.send(msg);
    },
    onErr: function(msg,from){
      console.log(" in error handler for childreen of transform");
    }
  }
}
