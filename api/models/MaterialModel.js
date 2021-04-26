var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MaterialSchema = new Schema({
	label: {type: String, required: true},
	Kp: {type: Number, required: true},
	Ki: {type: Number, required: true},
	Kd: {type: Number, required: true },
}, {timestamps: true});

module.exports = mongoose.model("Material", MaterialSchema);