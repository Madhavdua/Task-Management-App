const express=require("express");
const router=express.Router();

const { check, validationResult } = require('express-validator');

const Task=require("../Schema/TaskSchema");
const User=require('../Schema/UserSchema');
const fetchUser=require('../middleware/fetchUser');
const fetchAdmin=require('../middleware/fetchAdmin');


router.post('/addtask',fetchUser,
check('title').isLength({min:3}),
check('description').isLength({min:5}),
async(req,res)=>{
try {
    // const {title,description,date}=req.body;
    const error = validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({ error: error})
}

    const task= new Task({
        title:req.body.title,
        description:req.body.description,
        due_date:req.body.due_date,
        assigned:req.body.adder=="admin",
        user:req.user.id,
    });
    
    const savedTask=await task.save();

    res.json(savedTask);
} catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.array })
}
})

router.get('/fetchtasks',fetchUser,
async (req,res)=>{
    try {
        let result=await Task.find({user:req.user.id})
        let assigned=await Task.find({assigned:true});
        let c=assigned.concat(result)
        res.json(c);
    } catch (error) {
        res.status(500).json({error:error});
    }
}
)
router.get('/fetchasstasks',fetchAdmin,
async (req,res)=>{
    try {
        let result=await Task.find({user:req.user.id})
        res.json(result);
    } catch (error) {
        res.status(500).json({error:error});
    }
}
)
router.put('/updatetask/:id',fetchUser,
async (req,res)=>{
    try {
        const new_task={
            title:req.body.title,
            description:req.body.description,
            due_date:req.body.due_date,
            user:req.user.id
        }
        const result=await Task.findByIdAndUpdate(req.params.id,{$set:new_task},{new:true});
        res.json({result});
    } catch (error) {
        res.status(500).json({error:error});
    }
}
)
router.put('/updateasstask/:id',fetchAdmin,
async (req,res)=>{
    try {
        const new_task={
            title:req.body.title,
            description:req.body.description,
            due_date:req.body.due_date,
            user:req.user.id
        }
        const result=await Task.findByIdAndUpdate(req.params.id,{$set:new_task},{new:true});
        res.json({result});
    } catch (error) {
        res.status(500).json({error:error});
    }
}
)
router.delete('/deletetask/:id',fetchUser,
async (req,res)=>{
    try {
        
        const result=await Task.findByIdAndDelete(req.params.id,);
        res.json({result});
    } catch (error) {
        res.status(500).json({error:error});
    }
}
)
router.delete('/deleteasstask/:id',fetchAdmin,
async (req,res)=>{
    try {
        
        const result=await Task.findByIdAndDelete(req.params.id,);
        res.json({result});
    } catch (error) {
        res.status(500).json({error:error});
    }
}
)

router.put('/submit/:id',fetchUser,
async(req,res)=>{
    try {
        const curr=req.body.status;
        const result=await Task.findByIdAndUpdate(req.params.id,{$set:{status:!curr}});
        res.json({result});
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}
)

router.put('/asssubmit/:id/:mail',fetchUser,
async(req,res)=>{
    try {
        const curr=req.body.status;
        let result=await Task.updateOne({_id:req.params.id,"userslist.mail":req.params.mail},{$set:{"userslist.$.done":!curr}})

        res.json({result});
        
    } catch (error) {
        res.status(500).json({error});
    }
}
)

router.post('/assigntask',fetchAdmin,
check('title').isLength({min:3}),
check('description').isLength({min:5}),
async(req,res)=>{
try {
    // const {title,description,date}=req.body;
    const error = validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({ error: error })
}
let userarray=[];
let users=(await User.find({})).forEach((element)=>{
    userarray.push({mail:element.mail,done:false});
})
    const task= new Task({
        title:req.body.title,
        description:req.body.description,
        due_date:req.body.due_date,
        assigned:true,
        user:req.user.id,
        userslist:userarray
    });
    const savedTask=await task.save();

    res.json(savedTask);
} catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.array })
}
})
module.exports=router;