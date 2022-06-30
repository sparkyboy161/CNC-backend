var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var LogSchema = new Schema({
    type: { type: String, required: false },
    info: { type: String, required: false },
    client: { type: Schema.ObjectId, ref: "Client", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Log", LogSchema);