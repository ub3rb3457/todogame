var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var LogSchema = new Schema({
	rpm: {type: Number, required: true},
}, {
	timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

module.exports = mongoose.model("Log", LogSchema);