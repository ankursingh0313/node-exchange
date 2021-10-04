const express = require('express');
const { registerUser, loginUser } = require('../controller/auth');
const { validateSignUpRequest } = require('../validators/auth');

const router = express.Router();

router.post("/registerUser", validateSignUpRequest, registerUser);
router.post("/loginUser", loginUser);

// router.post('/signup', signup);
// router.post('/signin', signin);

 

module.exports = router;