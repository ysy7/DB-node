const express = require("express");
const app = express();
const port = 5000;

app.listen(port,() =>{
  console.log("서버가 정상적으로 실행되었습니당!");
});

app.get("/",(request,response)=>{
  response.send("성공입니다앙");
})