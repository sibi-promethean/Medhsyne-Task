const express = require('express');

const router = express.Router();
const usercontroller = require('../controllers/userController');



// const routes=(app)=>{
//     router.post('/postdetails',service.postdetails)
//     app.use('/api',router)
// }



// const express = require('express');
// const router = express.Router();
// const service = require('../controllers/userController');
// const routes=(app)=>{



const routes=(app)=>{

router.post('/signup', usercontroller.signup)
router.post('/Login',usercontroller.Login)
router.post('/forgetPassword',usercontroller.forgetPassword)
router.post('/studentdetails',usercontroller.studentdetails)
router.post('/staffdetails',usercontroller.staffdetails)
router.get('/getStaffDetails',usercontroller.getStaffDetails)
router.get('/getStudentDetails',usercontroller.getStudentDetails)
app.use("/api",router)

}

module.exports = routes;
