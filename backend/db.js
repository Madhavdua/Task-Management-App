const mongoose = require('mongoose');

async function dbConnect(uri) {
  await mongoose.connect(uri).then(()=>{console.log("connected to db")},(err)=>console.log(err))
  
}
module.exports=dbConnect;
// mongodb://localhost:27017/Task_Manager_Db