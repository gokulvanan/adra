
/*
 * The main class which which is starting point of adra hirerachy
 * It has to childreen application and system 
 * application controlls all user defined workers
 * system controlls are system utilities
 *
*/

module.exports = (function(){

  //build args object for each worker
  return {
    init: function(conf){
     // init logger
     // initialize transport
     // fork system to managed all system utilities
     // fork application to manage all user defined workers
    },
    start: function(conf){

    },
    stop: function(conf){

    }

  }


  process.on('SIGINT', function() {
    console.log("adra has stopped all workers");
    process.exit(0);
  });



})();
