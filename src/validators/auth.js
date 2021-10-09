const { check, validationResult } = require('express-validator');
exports.validateSignUpRequest = [
    check('email')
    .isEmail().trim().escape().normalizeEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({ min: 8})
    .withMessage('password must be at least 8 character long')
    .matches('[0-9]').withMessage('Password Must Contain a Number')
    .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')
  
     
]

exports.validateSignInRequest = [
    check('email')
    .isEmail().trim().escape().normalizeEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({ min: 8})
    .withMessage('password must be at least 8 character long')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
}

