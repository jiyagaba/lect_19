const express=require("express");
const fs = require("fs");

const app = express();
const ExpressStatusMonitor=require("express-status-monitor");

app.use(ExpressStatusMonitor());
app.get("/get",(req,res)=>{
    let data="non blocking";
    //non blocking
    // fs.readFile("50M.txt","utf-8",(err,readData)=>{
    //     data=readData;
    // })//promise
    //blocking code
    data=fs.readFileSync("10M.txt","utf-8");//waiting for data to read
    res.send(data);
});
app.get("/stream",(req,res)=>{
    const streamTxt=fs.createReadStream("10M.txt","utf-8");
    streamTxt.on("data",(chunk)=>res.write(chunk));
    streamTxt.on('end',()=>res.end());
});
const port=2345;
app.listen(port,(err)=>{
    if(err) console.log(err)
        else console.log(`Server is running on port : ${port}`)
});