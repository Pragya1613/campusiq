const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} = require(
  "../controllers/applicationController"
);

router.post(
  "/",
  protect,
  applyJob
);

router.get(
  "/my",
  protect,
  getMyApplications
);

router.get(
  "/",
  getAllApplications
);

router.put(
  "/:id",
  updateApplicationStatus
);

router.delete(
  "/:id",
  deleteApplication
);

module.exports = router;