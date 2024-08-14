

const db = require('../db/datab')
const bcrypt=require('bcrypt')
const crypto =require('crypto')
const nodemailer = require('nodemailer')
const fs = require('fs')
const multer = require('multer')
const { InsightsConversationsInstance } = require('twilio/lib/rest/flexApi/v1/insightsConversations')


async function signup(req,res)
{
    try{
    const {sno,Username,Password,Confirm_password} = req.body;

    if(!sno || !Username || !Password || !Confirm_password)
    {
        if(!sno || !Username && !Password && !Confirm_password)
        {
            res.status(400).send(" please enter  sno and Username and Password and Confirm_password.");
        }
        else
        {
           if(!Username)
            {
               res.status(400).send(" please enter Username ");
            }
            else if (!Password) 
            {
               res.status(400).send(" please enter Password ");
            } 
            else if (!Confirm_password)
             {
                res.status(400).send("Please enter Confirm_password.");
            }
        }
    }
    else
   {
        if(Password==Confirm_password)
        {
            const pool = db.pool;
            const Password=Confirm_password;
            const salt=await bcrypt.genSalt(10);
            const passwordHash =await bcrypt.hash(Password,salt)
            const query=`insert into project (sno,Username,Password) 
                         VALUES(?,?,?)`
            const values=[sno,Username,passwordHash]
            try
            {
                await pool.query(query,values)

                res.status(201).json('your account created')
            } 
            catch (err) 
            {
              console.error(err);
              res.status(500).json('Error saving details'); 
            }
        }
        else
        {
            res.status(404).send('Password and Confirm_password not matching')
        }
     } 
    }
    catch(error)
    {
        console.error(error);
        // res.status(500).send('Internal server error');
    }
}



async function Login (req, res) {
    try {
        const { Username, Password } = req.body;

        if (!Username || !Password) {
            res.status(400).send("Please enter Username and Password.");
            return;
        }

        const pool = db.pool;
        const query = `SELECT Password FROM project WHERE Username = ?`;
        const values = [Username];

        try {
            const [rows] = await pool.query(query, values);

            if (rows.length === 0) {
                res.status(401).send("Invalid Username or Password.");
                return;
            }

            const storedPasswordHash = rows[0].Password;

            const passwordMatch = await bcrypt.compare(Password, storedPasswordHash);

            if (passwordMatch) {
                res.status(200).json('Login successful');
            } else {
                res.status(401).send("Invalid Username or Password.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Error retrieving user details');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
async function forgetPassword (req, res) {
    try {
        const { Username } = req.body;

        if (!Username) {
            res.status(400).send("Please enter Username.");
            return;
        }

        const pool = db.pool;
        const query = `SELECT * FROM project WHERE Username = ?`;
        const values = [Username];

        const [rows] = await pool.query(query, values);

        if (rows.length === 0) {
            res.status(404).send("User not found.");
            return;
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); 

        const updateQuery = `UPDATE project SET resetToken = ?, resetTokenExpiry = ? WHERE Username = ?`;
        const updateValues = [resetToken, resetTokenExpiry, Username];

        await pool.query(updateQuery, updateValues);


        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'sibichakaravarthy17@gmail.com',
                pass: 'dizawtkmpyphjkcd'
            }
        });

        const mailOptions = {
            from: 'sibichakaravarthy17@gmail.com',
            to: 'sibichakaravarthy16@gmail.com',
            subject: 'Password Reset',
            text: `You requested for a password reset. Use this token to reset your password: ${resetToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error sending email.');
            } else {
                res.status(200).json('Password reset token sent to your email.');
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}



async function studentdetails(req,res) {
    const {Name,ID_Number,Address,Gender,State,Pincode,Class,Division,Date_Of_Birth,Blood_Group,
        Department,Allergies,Allergies_Define,Any_Disease,Any_Disease_Define}=req.body
        const profile_photo=req.body.profile_photo
        const buffer1 = Buffer.from(profile_photo,"base64");
        const Current_Health_Report=req.body.Current_Health_Report
        const buffer2 = Buffer.from(Current_Health_Report,"base64");
        const Past_Health_Report=req.body.Past_Health_Report
        const buffer3 = Buffer.from(Past_Health_Report,"base64");

        const pool=db.pool
        try{

            const query = `INSERT INTO name(
            Name, ID_Number, Address, Gender, state, pincode, Class, division, DOB,
            Blood_Group, Department, Allergies, Allergies_define, Any_Disease, Any_Disease_Define,
            profile_photo, Current_Health_report, Past_Health_report) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
            Name, ID_Number, Address, Gender, State, Pincode, Class, Division, Date_Of_Birth,
            Blood_Group, Department, Allergies, Allergies_Define, Any_Disease, Any_Disease_Define, buffer1, buffer2, buffer3
        ];
        const [result]=await pool.query(query, values);
        // await pool.query(query1,values1)
        console.log(result[0])
        res.status(201).send("data stored successful")
        }
    catch(err){
        console.error(err)
        res.send("internal error")
    }
}

async function staffdetails (req,res) {
    const  {Name,ID_Number,New_Password,Confirm_Password,Address,Gender,State,Pincode,Class,Division,
        Date_of_birth,Blood_Group,Department,Allergies,Any_disease,Allergies_Define,
        Any_disease_Define,Mobile_Number,HCR} = req.body
        const profile_photo=req.body.profile_photo
        const buffer1 = Buffer.from(profile_photo,"base64");
        const Current_Health_Report=req.body.Current_Health_Report
        const buffer2 = Buffer.from(Current_Health_Report,"base64");
        const Past_Health_Report=req.body.Past_Health_Report
        const buffer3 = Buffer.from(Past_Health_Report,"base64");

        const pool=db.pool
        try{
            const query = `INSERT INTO staffdetails(Name,ID_Number,New_Password,Confirm_Password,Address,Gender,State,Pincode,Class,Division,
        Date_of_birth,Blood_Group,Department,Allergies,Any_disease,Allergies_Define,
        Any_disease_Define,Mobile_Number,HCR,profile_photo, Current_Health_report, Past_Health_report) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const values = [Name,ID_Number,New_Password,Confirm_Password,Address,Gender,State,Pincode,Class,Division,
            Date_of_birth,Blood_Group,Department,Allergies,Any_disease,Allergies_Define,
            Any_disease_Define,Mobile_Number,HCR,buffer1,buffer2,buffer3
        ];

        const [result]=await pool.query(query,values);

        console.log(result[0]);


        res.status(201).send("data stored successful")
        }
    catch(err){
        console.error(err)
        res.send("internal error")

        }
}

async function getStaffDetails(req, res) {
    try {
        const staffId = req.params.id; 
        const pool = db.pool;
        let query;
        let values = [];

        if (staffId) {
      
            query = `SELECT * FROM staffdetails WHERE ID_Number = ?`;
            values.push(staffId);
        } else {
        
            query = `SELECT * FROM staffdetails`;
        }

        const [rows] = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No staff found' });
        }

        
        const staffDetails = rows.map(row => {
            return {
                ...row,
                profile_photo: row.profile_photo.toString('base64'),
                Current_Health_Report: row.Current_Health_Report.toString('base64'),
                Past_Health_Report: row.Past_Health_Report.toString('base64')
            };
        });

        res.status(200).json(staffDetails);
    } catch (error) {
        console.error('Error retrieving staff details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getStudentDetails(req, res) {
    try {
        const StudentID = req.params.id; 
        const pool = db.pool;
        let query;
        let values = [];

        if (StudentID) {
      
            query = `SELECT * FROM name WHERE ID_Number = ?`;
            values.push(StudentID);
        } else {
        
            query = `SELECT * FROM name`;
        }

        const [rows] = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No Student found' });
        }

        
        const StudentDetails = rows.map(row => {
            return {
                ...row,
                profile_photo: row.profile_photo.toString('base64'),
                Current_Health_Report: row.Current_Health_Report.toString('base64'),
                Past_Health_Report: row.Past_Health_Report.toString('base64')
            };
        });

        res.status(200).json(StudentDetails);
    } catch (error) {
        console.error('Error retrieving student details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}




module.exports=
{
    signup,
    Login,
    forgetPassword,
    studentdetails,
    staffdetails,
    getStaffDetails,
    getStudentDetails
}