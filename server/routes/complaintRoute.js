const express = require("express");
const router = express.Router();
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaintController");



router.route("/").post(createComplaint);
router.get("/", getComplaints);
router.get("/:id", getComplaintById);
router.route("/:id").patch(updateComplaint);
router.delete("/:id", deleteComplaint);

module.exports = router;
