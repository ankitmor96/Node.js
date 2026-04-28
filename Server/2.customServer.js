import http from "http"; // core modules http 

const server = http.createServer((req,res)=>{    // server variable create and callback function use req/res

    if(req.url == "/"){    // if true condition check
        res.writeHead(200,{"conect-tyoe":"text/html"});     // wirte head , status code , text and define over type 
        res.end("welcome to home page");    // end of response to stope if condition 
    }else if(req.url === "/about"){     // else if condition check to if is true so that is true 
        res.writeHead(200,{"content-type":"text/html"});
        res.end("Welcome to about page");
    }else{
        res.end("page not found");     // end of response to stope else condition , programm will be stoped 
    }
});

const port = 5006;    // port generate to localhost  code execution " ip adddress ". 

server.listen(port,()=>{
 console.log(`server runing for this moment ${port}`)   // run to code terminal node.js, select prot dynamically
});