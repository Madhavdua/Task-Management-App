const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
        admin_name: {
            type: String,
            required: true
        },
        admin_password:{
            type:String,
            required:true
        },
        admin_mail: {
            type: String,
            required: true
        },
})

const Admin=mongoose.model('Admin',AdminSchema);
module.exports=Admin;
