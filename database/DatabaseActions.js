const express = require('express')
const { Users } = require('./schema');
const router = express.Router();
const cors = require("cors")
router.use(cors());
const nodemailer = require("nodemailer");


router.post('/insertUser', async (req, res) => {
  try { 
    const User = new Users(req.body)
    await User.save();
    res.status(201).json({ message: 'Success',data:User });
  } catch (error) {
    console.log('Error inserting data:', error);
    res.status(500).json({ message: 'Failed' });
  }
});

router.get("/getAllUserData", async (req, res) => {
  try {
    const find_all = await Users.find()
    res.status(200).json(find_all);
  } catch (error) {
    res.status(500).json({ message: "Failed" }); 
  } 
});

router.get('/getOneUser', async (req, res) => {
  try {
    const find_one = await Users.findOne(req.query); 
    if (!find_one) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({  message: 'Success' ,data: find_one });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed' });
  }
});


router.put('/updateData', async (req, res) => {
  try {
    const updates = req.body; 
    const update = { $set: updates };
    const updatedData = await Users.findOneAndUpdate(req.query, update, { new: true });
    if (updatedData) {
      res.status(200).json({ message: 'Success', data : updatedData });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.log('Error updating data:', error);
    res.status(500).json({ message: 'Failed' });
  }
});

router.delete('/deleteData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLogin = await Login.findByIdAndDelete(id);
    if (deletedLogin) {
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.log('Error deleting data:', error);
    res.status(500).json({ message: 'Failed' });
  }
});

router.get('/getUsersByQuery', async (req, res) => {
  try {
    const query = req.query; // Assuming the query parameters are passed in the URL query string 
    const users = await Users.find(query);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    
    res.json({ message: 'Success', data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed' });
  }
});


router.post("/sendUserCLientId", async (req, res) => {
  console.log("Called");
  console.log("inside routes");
  const { email ,client_Id } = req.body;
  console.log("email is ", email);

  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "propertyportalcc@gmail.com",
        pass: "xwrrfzmrdowxnamf",
      },
    });

    const mailOptions = {
      from: "propertyportalcc@gmail.com",
      to: email,
      subject: "Code-No ( Client Id ) ",
      html: `<div style="font-family: Helvetica, Arial, sans-serif; overflow: auto; line-height: 2">
        <div style="margin: 5px auto; width: 90%; padding: 20px 0">
          <div style="border-bottom: 1px solid #eee">
            <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">SSF Khazana</a>
          </div>
          <p style="font-size: 1.1em">Hi,</p>
          <p>Thank you for choosing SSF Khazana.<br/> Use the following Code-No ( Client Id ) to complete your Sign In procedures.</p>
          <h2 style="background: #00466a; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">Client Id:-  ${client_Id}</h2>
          <p style="font-size: 0.9em;">Regards,<br />SSF Khazana Team</p>
        </div>
      </div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(201).json({ status: 201, info });
  } catch (error) {
    console.log("Error:", error);
    res.status(401).json({ status: 401, error });
  }
});




module.exports = router;