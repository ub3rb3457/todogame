const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");

/**
 * User registration.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.register = [
	// Validate fields.
	body("firstName").isLength({ min: 1 }).trim().withMessage("First name must be specified.").isAlphanumeric().withMessage("First name has non-alphanumeric characters."),
	body("lastName").isLength({ min: 1 }).trim().withMessage("Last name must be specified.").isAlphanumeric().withMessage("Last name has non-alphanumeric characters."),
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.").isEmail().withMessage("Email must be a valid email address.")
	.custom((value) => {
		return UserModel.findOne({email : value}).then((user) => {
			if(user) return Promise.reject("E-mail already in use");
		});
	}),
	body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	// Sanitize fields.
	sanitizeBody("firstName").escape(),
	sanitizeBody("lastName").escape(),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),
	// Process request after validation and sanitization.
	(req, res) => {
		try { // Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) { // Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else { 
				bcrypt.hash(req.body.password,10,function(err, hash) {//hash input password
					let otp = utility.randomNumber(4);// generate OTP for confirmation
					var user = new UserModel({ // Create User object with escaped and trimmed data
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: hash,
						confirmOTP: otp
					});
					let html = "<p>Please Confirm your Account.</p><p>OTP: "+otp+"</p>";// Html email body
					mailer.send( // Send confirmation email
						constants.confirmEmails.from, 
						req.body.email,
						"Confirm Account",
						html
					).then(function(){
						user.save(function (err) { // Save user.
							if (err) { return apiResponse.ErrorResponse(res, err); }
							let userData = {
								_id: user._id,
								firstName: user.firstName,
								lastName: user.lastName,
								email: user.email
							};
							return apiResponse.successResponseWithData(res,"Registration Success.", userData);
						});
					}).catch(err => {
						console.log(err);
						return apiResponse.ErrorResponse(res,err);
					}) ;
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err); //throw error in json response with status 500.
		}
	}];

/**User login.
 * @param {string}      email
 * @param {string}      password
 * @returns {Object}
 */
exports.login = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),
	(req, res) => { try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
		} else {
			UserModel.findOne({email : req.body.email}).then(user => {
				if (user) {
					bcrypt.compare(req.body.password,user.password,function (err,same) { //Compare given password with db's hash.
						if(same){
							if(user.isConfirmed){//Check account confirmation.
								if(user.status) { // Check User's account active or not.
									let userData = { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, };
									const jwtPayload = userData;//Prepare JWT token for authentication
									const jwtData = { expiresIn: process.env.JWT_TIMEOUT_DURATION, };
									const secret = process.env.JWT_SECRET;
									userData.token = jwt.sign(jwtPayload, secret, jwtData); //Generated JWT token with Payload and secret.
									return apiResponse.successResponseWithData(res,"Login Success.", userData);
								} else return apiResponse.unauthorizedResponse(res, "Account is not active. Please contact admin.");
							} else return apiResponse.unauthorizedResponse(res, "Account is not confirmed. Please confirm your account.");
						} else return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
					});
				} else return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
			});
			
		}} catch(err){ return apiResponse.ErrorResponse(res, err); } }];

/**
 * Verify Confirm otp.
 * @param {string}      email
 * @param {string}      otp
 *
 * @returns {Object}
 */
exports.verifyConfirm = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.").isEmail().withMessage("Email must be a valid email address."),
	body("otp").isLength({ min: 1 }).trim().withMessage("OTP must be specified."),
	sanitizeBody("email").escape(),
	sanitizeBody("otp").escape(), (req, res) => { try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				var query = {email : req.body.email};
				UserModel.findOne(query).then(user => {
					if (user) {
						if(!user.isConfirmed){//Check already confirm or not.
							if(user.confirmOTP == req.body.otp){ //Check account confirmation.
								UserModel.findOneAndUpdate(query, { //Update user as confirmed
									isConfirmed: 1, confirmOTP: null 
								}).catch(err => { return apiResponse.ErrorResponse(res, err); });
								return apiResponse.successResponse(res,"Account confirmed success.");
							} else { return apiResponse.unauthorizedResponse(res, "Otp does not match"); }
						} else { return apiResponse.unauthorizedResponse(res, "Account already confirmed."); }
					} else return apiResponse.unauthorizedResponse(res, "Specified email not found.");
				});
			}
		} catch (err) { return apiResponse.ErrorResponse(res, err); }
	}
];

/**
 * Resend Confirm otp.
 * @param {string}      email
 * @returns {Object}
 */
exports.resendConfirmOtp = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	sanitizeBody("email").escape(), (req, res) => { try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				var query = {email : req.body.email};
				UserModel.findOne(query).then(user => {
					if (user) {
						if(!user.isConfirmed){//Check already confirm or not.
							let otp = utility.randomNumber(4);// Generate otp
							let html = "<p>Please Confirm your Account.</p><p>OTP: "+otp+"</p>";// Html email body
							mailer.send( // Send confirmation email
								constants.confirmEmails.from, 
								req.body.email,
								"Confirm Account",
								html
							).then(function(){
								user.isConfirmed = 0;
								user.confirmOTP = otp;
								user.save(function (err) { // Save user.
									if (err) { return apiResponse.ErrorResponse(res, err); }
									return apiResponse.successResponse(res,"Confirm otp sent.");
								});
							});
						}else{ return apiResponse.unauthorizedResponse(res, "Account already confirmed."); }
					} else { return apiResponse.unauthorizedResponse(res, "Specified email not found."); }
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];