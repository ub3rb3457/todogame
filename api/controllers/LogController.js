const Log = require("../models/LogModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Log Schema -- declare your fields here
function LogData(data) {
	this.id = data.id;
	this.createdAt = data.createdAt;
	this.updatedAt = data.updatedAt;
	this.rpm = data.rpm;
}

/**
 * Get a list of all the logs
 * 
 * @returns {Object}
 */
exports.logList = [
	auth,
	function (req, res) {
		try {
			Log.find({}).then((logs)=>{
				if(logs.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", logs);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Log Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.logDetail = [
	auth,
	(req, res) => {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			Log.findById(id).then((log)=>{                
				if(log !== null){
					let logData = new LogData(log);
					return apiResponse.successResponseWithData(res, "Operation success", logData);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", {});
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Log record.
 * @param {number}      rpm 
 * @returns {Object}
 */
exports.logRecord = [
	auth,
	sanitizeBody("*").escape(),
	(req, res) => { try {	
		const errors = validationResult(req);
		var log = new Log({ rpm: req.body.rpm });
		if (!errors.isEmpty()) {
			return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
		} else {//Save log.
			log.save(function (err) {
				if (err) { return apiResponse.ErrorResponse(res, err); }
				let logData = new LogData(log);
				return apiResponse.successResponseWithData(res,"Log added successfully.", logData);
			});
		}
	} catch (err) {//throw error in json response with status 500. 
		return apiResponse.ErrorResponse(res, err);
	}}
];

/**
 * Log Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.logDelete = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Log.findById(req.params.id, function (err, foundLog) {
				if(foundLog === null){
					return apiResponse.notFoundResponse(res,"There is no Log with this id");
				}else{
					//Check authorized user
					if(foundLog.user.toString() !== req.user._id){
						return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					}else{
						//delete log.
						Log.findByIdAndRemove(req.params.id,function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"Log deleted successfully.");
							}
						});
					}
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];