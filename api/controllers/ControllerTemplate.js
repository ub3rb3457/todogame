const Template = require("../models/TemplateModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Template Schema -- declare your fields here
function TemplateData(data) {
	this.id = data.id;
	this.createdAt = data.createdAt;
	this.updatedAt = data.updatedAt;
	this.rpm = data.rpm;
}

/**
 * Get a list of all the templates
 * 
 * @returns {Object}
 */
exports.templateList = [
	auth,
	function (req, res) {
		try {
			Template.find({}).then((templates)=>{
				if(templates.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", templates);
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
 * Template Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.templateDetail = [
	auth,
	(req, res) => {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			Template.findById(id).then((template)=>{                
				if(template !== null){
					let templateData = new TemplateData(template);
					return apiResponse.successResponseWithData(res, "Operation success", templateData);
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
 * Template record.
 * 
 * @param {number}      rpm 
 * 
 * @returns {Object}
 */
exports.templateRecord = [
	auth,
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var template = new Template({ rpm: req.body.rpm });
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				//Save template.
				template.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let templateData = new TemplateData(template);
					return apiResponse.successResponseWithData(res,"Template added successfully.", templateData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Template Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.templateDelete = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Template.findById(req.params.id, function (err, foundTemplate) {
				if(foundTemplate === null){
					return apiResponse.notFoundResponse(res,"There is no Template with this id");
				}else{
					//Check authorized user
					if(foundTemplate.user.toString() !== req.user._id){
						return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					}else{
						//delete template.
						Template.findByIdAndRemove(req.params.id,function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"Template deleted successfully.");
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