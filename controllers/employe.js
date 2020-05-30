const mongoose = require('mongoose');
const Emp = require('../models/employe')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const dotenv = require('dotenv')
dotenv.config();

exports.register_emp = (req,res) => {
    //make sure that user not exist already in database
    Emp.find({email:req.body.email}).exec().then(emp => {
        if(emp.length >= 1){
            return res.status(409).json({message:"employe already exist can't register"});
        } else {
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err) {
                    return res.status(500).json({error:err});
                } else {
                   //send confirmation mail
                   const token = jwt.sign({user:req.body.email},process.env.JWT_KEY,{expiresIn:"24h"})
           
                    let newEmp = new Emp({
                        name:req.body.name,
                        email:req.body.email,
                        password: hash,
                        contactNo:req.body.contactNo,
                        joiningDateTime:new Date(),
                        leavingDateTime:new Date()
                    });
                   
                    newEmp.save().then(response => {
                        console.log(response);
                                res.status(201).json({message:"account created",User:response})
                                
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({error:err});
                        });   
                }
            })
        }
    }).catch();   
}

exports.login_emp = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    Emp.find({email:email}).exec().then(emp => {
        if(emp.length < 1){
            return res.status(401).json({message:"User Doesn't Exist"});
        }
        bcrypt.compare(password, emp[0].password,(err,isMatch) => {
            if(err) {
               return res.status(401).json({message:"Authentication Failed"});
            } 
            
            //if password are matched
            if(isMatch){
                const token = jwt.sign({email: emp[0].email, empId: emp[0]._id},process.env.secretKey,{expiresIn:500000});
                return res.status(200).json({message:"Authentication successful",Token : token,Id: emp[0]._id })
            }
           
            res.status(401).json({message:"Authentication Failed"});
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
}

exports.logout_emp = (req,res,next) => {
    req.session.destroy();
    res.redirect('/');
}


exports.dashboard = (req,res,next) => {
    const id = req.params.empId;
    //here i use exec() function for search among all
    Emp.findById(id).exec().then(doc => {
            res.status(200).json(doc);        
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });
}


exports.leave = (req,res,next) => {
    let leavingDateTime = new Date()
    let email = req.body.email
        try { 
            Emp.findOneAndUpdate({email:email},{leavingDateTime:leavingDateTime}, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                return res.status(200).json({message:"now u leaved the compenay "})  
                })
    }
         catch (err) {
          console.log(err.message);
          res.send("incorrect credentials");
    }
}