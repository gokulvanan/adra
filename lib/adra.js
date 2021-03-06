

(function(){
  var program = require('commander');
  var fs = require("fs");
  var path = require("path");
  var common = require("./utils/common");
  var config="/config.js";
  var struct="/struct.js";
 
  program
  .version('0.0.1'); //TODO - Add options to start in local or cluster

  program
    .command("clean")
    .description("remove logs from project")
    .action(function(){
      clean();
    });

  program
    .command("new")
    .description("create project")
    .action(function(){
      build();
    });


  program
    .command("start")
    .description("start adra")
    .action(function(){
      start();
    });

  program
    .command("run")
    .description("run adra")
    .action(function(){
      run();
    });

  program
    .command("stop")
    .description("stop adra")
    .action(function(){
      stop();
    });

  program
    .command("*")
    .description("Invalid usage")
    .action(welcomeMsg);

  function clean(){
    var conf = process.cwd()+config
    if (!fs.existsSync(conf)){
      console.log("Oops.. Current directory is not valid adra project as its missing config.js");
      console.log("Use 'adra new' to create a new project");
      console.log("Then 'cd <project>; adra run' ");
      console.log("Alternatively you can use 'adra start' to start adra cluster in nohub mode");
      process.exit(1);
    }else{
      var conf = require(process.cwd()+config);
      if(conf.logger){
        var path = conf.logger.path;
        if( path.charAt(0) !== '/') path = process.cwd()+"/"+path;
        if(fs.existsSync(path)){
          var exec = require('child_process').exec,child;
          child = exec('rm '+path+'/* ');
          console.log("adra has cleaned the old logs");
        }else{
          console.log("invalid logger path");
        }
      }else{
        console.log("no logger defined in config.js to clean logs");
      }
      process.exit(1);
    }
  }

  function build(){
    common.read("Enter name of you project",function(name){
        common.createDir(name,process.cwd(),function(err,dest){
          if(err) console.log(err);
          else{
            var src=path.join(__dirname,"../template");
            common.copyContents(src,dest,function(err,flag){
              if(err){
                fs.rmdirSync(dest);
              } 
              else{
                if(flag){
                   console.log("Yo.. project "+name+" is up and ready");
                   //console.log("If your a first time user, follow these steps:");
                   //console.log("1) cd into your project. cd "+name+"");
                   //console.log("2) Modify your config.json to point to your mysql database");
                   //console.log("3) use 'easyrep testdata' to load test data t tables to your database");
                   //console.log("4) user 'easrep run' to run the server");
                   //console.log("Thats it now access this using http://localhost:8080/sample.json&sdate=2013-09-28&edate=2013-09-28");
                   //console.log("Find out more @  https://github.com/gokulvanan/easyReports ");
                }else{
                   console.log("Oops.. something went wrong.. Please report this issue @ https://github.com/gokulvanan/easyReports") ;
                }

              }
            });
          }
        });
    });
  }


  function start(){
    var conf = process.cwd()+config
    var pidFile = process.cwd()+"/process.pid"
    if (!fs.existsSync(conf)){
      console.log("Oops.. Current directory is not valid adra project.");
      console.log("Use 'adra new' to create a new project");
      process.exit(1);
    }else if (fs.existsSync(pidFile)){
      console.log("Oops.. process.pid file exists.. which means either your earlier adra process is still running or you killed it manually and hence you need to remove the process.pid file");
      process.exit(1);
    }else{
      var bg = require("child_process").fork(__dirname+"/kickstart",["start"],"/usr/bin/env node");// run server as separate process
      fs.writeFileSync(pidFile,bg.pid);
      process.exit(0);
    }
  }

  function run(server){
    var conf = process.cwd()+config
    if (!fs.existsSync(conf)){
      console.log("Oops.. Current directory is not valid adra project.");
      console.log("Use 'adra new' to create a new project");
   }else{
      process.argv[2]="runserver";
      require(__dirname+"/kickstart"); // rn server in same process
    }
  }

  function stop(){
    var pidFile = process.cwd()+"/process.pid"
    if (fs.existsSync(pidFile)){
      var pids = fs.readFileSync(pidFile).toString().split(",");
      for(var i=0; i<pids.length; i++){
        var pid = pids[i];
        process.kill(pid,"SIGINT");
      }
      require('child_process').exec("rm -f "+pidFile,function(err,stdout,stderr){
        if(err) console.log("error in removing process.pid file.. plz remove it");
      });
      console.log("adra has stopped ");
      process.exit(0);
    }else{
      console.log("Neither http server nor cron server is running or process.pid/cron_process.pid files were removed manually..");  
      process.exit(1);
    }
  }

  function welcomeMsg(){
       console.log("Welcome to adra");
       console.log("A super easy way to build distributed processing code");
       console.log("To get started create a new project using 'adra new'");
       console.log("To start adra clusters navigate to project directory and start using 'adra start'");
       console.log("To stop adra clusters  navigate to project directory and stop using  'adra stop'");
  }


  //var args = process.argv;
  //if(args.length < 3)  welcomeMsg();
  

  program.parse(process.argv);

}).call(this);
