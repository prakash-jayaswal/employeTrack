const mongoose = require('mongoose')

const cmpSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    empId :{type :mongoose.Schema.Types.ObjectId, ref:'Emp',required:true},
    companyName :{ type: String,required:true},
    StartedIn:{type: Number, required: true}
});

module.exports = mongoose.model('Cmp',cmpSchema);