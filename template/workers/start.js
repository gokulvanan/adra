


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
      console.log("done");
      console.log(msg);
    },
    onErr: function(msg,from){
      console.log(" in error handler for childreen of start");
    },
    onLoad: function(){
      console.log("called on load");
      var extractor = ctx.getChild("extractor");
      extractor.send(" start ");
    }
  }
}
