const Cluster = require("../models/ClusterModel");
const { body, validationResult, check } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Cluster Schema
function ClusterData(data) {
	this.id = data._id;
	this.serial = data.serial;
	this.key = data.key;
	this.isActive = data.isActive;
	this.createdAt = data.createdAt;
}

/**
 * Cluster List.
 * 
 * @returns {Object}
 */
exports.clusterList = [
	auth,
	function (req, res) {
		try {
			Cluster.find().then((clusters) => {
				if (clusters.length > 0) {
					return apiResponse.successResponseWithData(res, "Operation success", clusters);
				} else {
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
 * Cluster store.
 * 
 * @param {string}      serial 
 * @param {string}      key
 * @param {boolean}      isActive
 * 
 * @returns {Object}
 */
exports.clusterStore = [
	auth,
	body("key", "key must not be empty.").isLength({ min: 1 }).trim(),
	body("isActive", "isActive must not be empty.").isBoolean(),
	body("serial", "Serial must not be empty").isLength({ min: 1 }).trim().custom((value) => {
		return Cluster.findOne({ serial: value }).then(cluster => {
			if (cluster) {
				return Promise.reject("Cluster already exist with this serial no.");
			}
		});
	}),
	check("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			let { serial, key, isActive } = req.body;
			isActive = (isActive === '1' || isActive === true) ? true : false;

			const cluster = new Cluster({
				serial, key, isActive
			});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save book.
				cluster.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let clusterData = new ClusterData(cluster);
					return apiResponse.successResponseWithData(res, "Cluster add Success.", clusterData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Cluster update.
 * 
 * @param {string}      serial 
 * @param {string}      key
 * @param {boolean}      isActive
 * 
 * @returns {Object}
 */
exports.clusterUpdate = [
	auth,
	body("key", "key must not be empty.").isLength({ min: 1 }).trim(),
	body("isActive", "isActive must not be empty.").isBoolean(),
	body("serial", "Serial must not be empty").isLength({ min: 1 }).trim(),
	check("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			let { serial, key, isActive } = req.body;
			isActive = (isActive === '1' || isActive === true) ? true : false;

			const cluster = new Cluster({
				key,
				serial,
				isActive,
				_id: req.params.id
			});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				} else {
					Cluster.findById(req.params.id, function (err, foundCluster) {
						if (foundCluster === null) {
							return apiResponse.notFoundResponse(res, "Cluster not exists with this id");
						} else {
							//update book.
							Cluster.findByIdAndUpdate(req.params.id, cluster, {}, function (err) {
								if (err) {
									return apiResponse.ErrorResponse(res, err);
								} else {
									let clusterData = new ClusterData(cluster);
									return apiResponse.successResponseWithData(res, "cluster update Success.", clusterData);
								}
							});

						}
					});
				}
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Cluster Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.clusterDelete = [
	auth,
	function (req, res) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Cluster.findById(req.params.id, function (err, foundCluster) {
				if (foundCluster === null) {
					return apiResponse.notFoundResponse(res, "Cluster not exists with this id");
				} else {
					//delete book.
					Cluster.findByIdAndRemove(req.params.id, function (err) {
						if (err) {
							return apiResponse.ErrorResponse(res, err);
						} else {
							return apiResponse.successResponse(res, "Cluster delete Success.");
						}
					});

				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Cluster Delete All. 
 * 
 * @returns {Object}
 */
exports.clusterDeleteAll = [
	auth,
	function (req, res) {
		try {
			//delete all clusters.
			console.log(1)
			Cluster.deleteMany({}, function (err) {
				if (err) {
					return apiResponse.ErrorResponse(res, err);
				} else {
					return apiResponse.successResponse(res, "Cluster delete Success.");
				}
			});
		} catch (err) {
			//throw error in json response with status 500.
			console.log(101)
			return apiResponse.ErrorResponse(res, err);
		}
	}
];