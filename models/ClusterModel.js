var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ClusterSchema = new Schema({
    serial: { type: String, required: false },
    key: { type: String, required: false },
    isActive: { type: Boolean, required: false },
}, { timestamps: true });

module.exports = mongoose.model("Cluster", ClusterSchema);