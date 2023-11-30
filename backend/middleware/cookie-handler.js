const express = require("express");
const router = express.Router();


// SAVE NEW USER TO THE COOKIES

router.post(
    '/save-user',
    (req, res) => {
      try{
        console.log(req.body)
        res.cookie('userDataAuth', JSON.stringify(req.body), { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).json({ res: 'Success' , data: req.body });
      }catch(err){
        console.log('server side error', err);
        res.status(500).json({err: 'server side error'})
      }
    }
);

// GET USER FROM COOKIES

router.get('/get-user-cookies', (req, res) => {
    const userDataCookie = req.cookies.userDataAuth;
    if (userDataCookie) {
      try {
        const userData = JSON.parse(userDataCookie);
        res.json({ userData });
      } catch (error) {
        console.error('error geting the data', error);
        res.status(500).json({ error: 'server side error' });
      }
    } else {
      res.json(null);
    }
  });
  
// DELETE USER FROM COOKIES
router.post(
  '/delete-user-cookie',
  (req, res) => {
    try {
      res.clearCookie('userDataAuth', { httpOnly: true, sameSite: 'None', secure: true });
      res.status(200).json({ res: 'Success', message: 'User cookie deleted successfully' });
    } catch (err) {
      console.log('Server-side error', err);
      res.status(500).json({ err: 'Server-side error' });
    }
  }
);


module.exports = router;