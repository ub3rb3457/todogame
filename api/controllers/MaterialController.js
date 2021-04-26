const Material = require("../models/MaterialModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Material Schema -- declare your fields here
function MaterialData(data) {
	this.id = data.id;
	this.label = data.label;
	this.Kp = data.Kp;
	this.Ki = data.Ki;
	this.Kd = data.Kd;
}

/**
 * Get a list of all the materials
 * @returns {Object}
 */
exports.materialList = [
	auth,
	function (req, res) {
		try {
			Material.find({}).then((materials)=>{
				if(materials.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", materials);
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
 * Material Detail.
 * @param {string}      id
 * @returns {Object}
 */
exports.materialDetail = [
	auth,
	(req, res) => {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			Material.findById(id).then((material)=>{                
				if(material !== null){
					let materialData = new MaterialData(material);
					return apiResponse.successResponseWithData(res, "Operation success", materialData);
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
 * Material record.
 * @param {number}      rpm 
 * @returns {Object}
 */
exports.materialRecord = [
	auth,
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var material = new Material({ 
				label: req.body.label,
				Kp: req.body.Kp,
				Ki: req.body.Ki,
				Kd: req.body.Kd

			});
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				//Save material.
				material.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let materialData = new MaterialData(material);
					return apiResponse.successResponseWithData(res,"Material added successfully.", materialData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Material Delete.
 * @param {string}      id
 * @returns {Object}
 */
exports.materialDelete = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Material.findById(req.params.id, function (err, foundMaterial) {
				if(foundMaterial === null){
					return apiResponse.notFoundResponse(res,"There is no Material with this id");
				}else{
					//Check authorized user
					if(foundMaterial.user.toString() !== req.user._id){
						return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					}else{
						//delete material.
						Material.findByIdAndRemove(req.params.id,function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"Material deleted successfully.");
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