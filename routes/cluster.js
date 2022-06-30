var express = require("express");
const ClusterController = require("../controllers/ClusterController");

var router = express.Router();

router.get("/", ClusterController.clusterList);
router.post("/", ClusterController.clusterStore);
router.put("/:id", ClusterController.clusterUpdate);
router.delete("/:id", ClusterController.clusterDelete);
router.delete("/", ClusterController.clusterDeleteAll);


module.exports = router;