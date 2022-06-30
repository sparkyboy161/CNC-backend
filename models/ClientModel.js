var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    title: { type: String, required: true },
    cluster: { type: Schema.ObjectId, ref: "Cluster", required: true },
    ip: { type: String, required: false },
    os: { type: String, required: false },
    os_version: { type: String, required: false },
    hostname: { type: String, required: false },
    version: { type: String, required: false },
    country: { type: String, required: false },
    socket: { type: String, required: false },
    isActive: { type: Boolean, required: false },
    cpu_info: { type: String, required: false },
    disk_info: { type: String, required: false },
    mac_address: { type: String, required: false },
    network: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model("Client", ClientSchema);