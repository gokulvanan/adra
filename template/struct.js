
/*
 * This JS file provides the structure hirerachy used by adra to configure user defined workers
 */

module.exports = function(){
  return {
    start:{
      instances:1,
      childreen: ["logger","extractor"]
    },
    logger:{
      instances:2,
    },
    extract:{
      instances:2,
      childreen: ["transform"]
    },
    transform:{
      instances:3,
      childreen: ["load"]
    },
    load:{
      instances 1
    }
  };
}();
