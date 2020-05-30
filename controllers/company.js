const mongoose = require('mongoose');
//importing the car model which have car details
const Cmp = require('../models/company');
const Emp = require('../models/employe');

//Anyone can the all cars which are updated on the website
exports.all_cmp = (req,res,next)=>{
    Cmp.find().exec().then(docs => {
        //res.render('home')
        res.status(200).json(docs);
    }).catch(err => {
        res.status(500).json({error:err});
    });
}

exports.create_cmp = (req,res,next)=>{
    Emp.findById(req.body.empId).then(emp => { 
        const cmp = new Cmp ({
            _id : mongoose.Types.ObjectId(),
            empId : req.body.empId,
            companyName:req.body.companyName,
            StartedIn:req.body.StartedIn
        });
       return cmp.save()
    }).then(result => {
        console.log(result);
        res.status(201).json({messsage:"Company Created"})
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    }); 
}


exports.get_a_cmp = (req,res,next) => {
    const id = req.params.cmpId;
    //here i use exec() function for search among all
    Cmp.findById(id).exec().then(doc => {
        console.log("This car we are fething from our database",doc);
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message:"No Car Found of this Id"});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });
}

