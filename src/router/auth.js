const express = require('express');
const nodemailer = require("nodemailer");
const { registerUser, loginUser, verifyUser } = require('../controller/auth');
const { othVarification } = require('../utils/mailer');
const { validateSignUpRequest, validateSignInRequest, isRequestValidated } = require('../validators/auth');

const router = express.Router();

router.post("/registerUser",validateSignUpRequest, isRequestValidated, registerUser);
router.post("/verifyUser", verifyUser);
router.post("/loginUser",validateSignInRequest, isRequestValidated, loginUser);

// router.post('/signup', signup);
// router.post('/signin', signin);

 

module.exports = router;