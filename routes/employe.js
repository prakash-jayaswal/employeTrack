const express = require('express');
const router = express.Router();
const EmpController = require('../controllers/employe');
const auth = require('../middleware/auth');

const dotenv = require('dotenv');
dotenv.config();

router.post('/register',EmpController.register_emp);
    
router.post('/login',EmpController.login_emp);

router.get("/dashboard/:empId",auth,EmpController.dashboard);

router.post("/leave",auth,EmpController.leave)

router.delete('/logout',auth,EmpController.logout_emp);


module.exports = router;