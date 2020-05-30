const mongoose = require('mongoose')
const config = require('../config/database')
const bcrypt = require('bcryptjs')

const empSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        match:/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    },
    password:{
        type:String,
        required:true
    },
    contactNo:{
        type:Number,
        required:true
    },
    joiningDateTime:{
        type:String,
        required:true
    },
    leavingDateTime:{
        type:String,
        required:true
    }
});

const Emp = module.exports = mongoose.model('Emp',empSchema);
