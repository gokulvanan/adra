
/*
 * This js file defines adra configuration info such as db details logging etc ..
 */

module.exports = function(){

return {
    // mode in which adra should be run 
    // possible options are simple and cluster modes
    mode: "simple", 
    // relative or absloute path to workders folder that hold workers js
    workers: "workers",
    //db configurations for mysql database connection
    db: {
      default:{
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "adra"
      }
    },
    //db configuration for mongodb datastore connection
    mongo: {
      default:{
        host: "localhost",
        port: 27017,
        database: "adra",
        opts:{
            auto_reconnect: true,
            poolSize: 5
        }
      }
    },
    // memcache connection 
    cache: {
        default: { // default cache used in cache all request response from the server
            defaultCacheDuration:600, // 10 minutes
            servers: "127.0.0.1:11211", 
            opts:{
                poolSize:10
            }
        }
    },
    /* Uncomment to configure email properties
     email:{
      host:"host address",
      port:569,
      auth:{user:"username",pass:"password"},
      templates:"templates", //template diector to build templates for email output
      error:{ //used in error reporting, triggered from logger.alert method call
        from:"from@gmail.com",
        to:"a@gmail.com,b@gmail.com",
        subject:"Easyrep Error report"
      }
    },
    */
    // logger config..
    logger: {
      path: "logs",
      level: "info" // change to trace or  debug to check framewrok trace/debug logs 
    }
  };
}();
