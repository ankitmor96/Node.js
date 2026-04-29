import http from "http";
import fs from "fs";  // file system is core modules .

const server = http.createServer((req,res)=>{

    if(req.url === "/"){
        fs.readFile("3.FileServer.html",(err,data)=>{
            if(err){
                res.writeHead("file is not loading ...");
            }else{
                res.writeHead(200, {"content-type":"text/html"});
                res.end(data);
            }
        })
    }else{
        res.writeHead("page not found");
    }
});

const port = 5050;

server.listen(port,()=>{
    console.groupCollapsed(`server runing so ${port}`);
});