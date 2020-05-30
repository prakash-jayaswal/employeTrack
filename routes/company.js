const express= require('express');
const router = express.Router();
const CmpController = require('../controllers/company')
const auth = require('../middleware/auth');


//This route is used for show all the cars from databse
router.get('/',CmpController.all_cmp);


//In this Route we can upload car with its details
router.post('/createCmp',auth,CmpController.create_cmp);

//If we want to access any perticular car
router.get('/get_a_cmp/:cmpId',CmpController.get_a_cmp);


module.exports = router;