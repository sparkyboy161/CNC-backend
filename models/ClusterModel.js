var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ClusterSchema = new Schema({
    serial: { type: String, required: true },
    key: { type: String, required: true },
    isActive: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Cluster", ClusterSchema);