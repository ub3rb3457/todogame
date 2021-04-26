var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
	number: { type: Number, required: true },
	text: { type: String },
}, {
	timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

module.exports = mongoose.model("Template", TemplateSchema);