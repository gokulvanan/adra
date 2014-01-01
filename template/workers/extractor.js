

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
      console.log(" in extractor");
      console.log(msg);
      var transformer = ctx.getChild("transform");
      transformer.send({ data : "sample data here"});
    },
    onErr: function(msg,from){
      console.log(" in error handler for childreen of extractor");
      ctx.restart(from);
      //ctx.stop(from);
      //ctx.start(from)
      //ctx.shutdown();
    }
  }
}
