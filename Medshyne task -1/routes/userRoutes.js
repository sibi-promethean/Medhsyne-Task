const express = require('express');

const router = express.Router();


const usercontroller = require('../controllers/userController');







const routes=(app)=>{



router.post('/signup', usercontroller.signup)
router.post('/Login',usercontroller.Login)
router.post('/forgetPassword',usercontroller.forgetPassword)
router.post('/studentdetails',usercontroller.studentdetails)
router.post('/staffdetails',usercontroller.staffdetails)
router.get('/getStaffDetails',usercontroller.getStaffDetails)
router.get('/getStudentDetails',usercontroller.getStudentDetails)
router.post('/ClassDetails',usercontroller.ClassDetails)
router.post('/Department',usercontroller.Department)
router.post('/Designation',usercontroller.Designation)
router.post('/medicine',usercontroller.medicine)
router.post('/medicine_used',usercontroller.medicine_used)
router.post('/Consulting_history',usercontroller.Consulting_history)
router.post('/Consulting_register',usercontroller.Consulting_register)
router.post('/home_dashboard',usercontroller.home_dashboard)
router.post('/plans',usercontroller.plans)
router.post('/Super_admin_med',usercontroller.Super_admin_med)
router.post('/Super_admin_ord',usercontroller.Super_admin_ord)
router.post('/Super_admin_trans',usercontroller.Super_admin_trans)
router.post('/Super_admin_employee',usercontroller.Super_admin_employee)
router.post('/Super_admin_employee_desig',usercontroller.Super_admin_employee_desig)
router.post('/Super_admin_employee_list',usercontroller.Super_admin_employee_list)
router.post('/Super_admin_employee_details',usercontroller.Super_admin_employee_details)
router.post('/Super_admin_work_details',usercontroller.Super_admin_work_details)
router.post('/Super_admin_organization',usercontroller.Super_admin_organization)
router.post('/Super_admin_organization_details',usercontroller.Super_admin_organizaton_details)
router.post('/Super_admin_Consultation_list',usercontroller.Super_admin_Consultation_list)
router.post('/Super_admin_paid',usercontroller.Super_admin_paid)

app.use("/api",router)

}

module.exports = routes;



