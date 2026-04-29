import http from "http"; // core modules http 

const server = http.createServer((req,res)=>{  // server variable create and callback function use req/res
    res.write("hello ankit,How are you ? ");   // write response to node in browser localhost 
    res.end();   // end of response to stope code execution 
});

const port = 5021;  // define prot ip address in (localhost:5021)

server.listen(port,(err)=>{
    if(err){       // if error condition is false
        return console.log("node is not response");  // stope return false part
    }
    console.log(`Node is response to Work server ${port}`);   // else condition is true so execute node.js
});