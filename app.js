const exec = require('child_process').exec;
const express = require("express");
const app =  express();
let server = app.listen(3001, () => console.log(`Listening on 3000`));
const fs = require('fs')
const PiCamera = require('pi-camera');
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
  

const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 1920,
  height: 1080,
  nopreview: true,
});

function capture(status){
    console.log(status);

    if(status === false){
        console.log("taking picture");
        myCamera.snap().
        then((result) => {
            })
        .catch((error) => {
            console.log("error");
     // Handle your error
        });
        setTimeout(function(){socket.send('reload')},1000);
    }
    else{
        isRunning('raspistill' , capture(status));
    }  
}

  io.on('connect', socket => {
    
    // either with send()
    //socket.send('Hello!');
    
    // or with emit() and custom event names
    socket.emit('greetings', 'Hey!', { 'dr': 'anna' }, Buffer.from([4, 3, 3, 1]));
    
    // handle the event sent with socket.send()
    socket.on('message', (data) => {
    //console.log(data);
    isRunning('raspistill', (status)=>{
        
             // true|false
    })
    
        });
    
    // handle the event sent with socket.emit()
    // socket.on('salutations', (elem1, elem2, elem3) => {
    // console.log(elem1, elem2, elem3);
    // });
    });
    io.sockets.on('recieved', (data)=>{
        //     console.log("runn");
        //     myCamera.snap().
        //     then((result) => {
        //         })
        //     .catch((error) => {
        //         console.log("error");
        //  // Handle your error
        //     });
        //     socket.send('reload');
        
    })
    // socket.on('recieved',()=>{
    //     myCamera.snap().
    //     then((result) => {
    //         })
    //     .catch((error) => {
    //         console.log("error");
    //  // Handle your error
    //     });
    //     socket.send('reload');
    //     })

//function doSomethingServerSide(data){ console.log(data); }

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")
    
     
  })
  app.get('/index.js', function(req,res){
      res.sendFile(__dirname + "/index.js")
  })
  app.get('/test.jpg', function(req, res) {
    res.sendFile(__dirname + "/" + "test.jpg");
  });
  app.get('/socket.io/socket.io.js', function(req, res) {
    res.sendFile(__dirname + "/" + "node_modules/socket.io/client-dist/socket.io.js");
  });
  app.listen(3000, function(){
    console.log("Server is running on port 3000.");
    
    })

    const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}
