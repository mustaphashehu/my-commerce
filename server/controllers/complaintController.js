const Complaint = require("../models/complaint");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    console.log(req.body);
    
    const { title, description } = req.body;
    const newComplaint = await Complaint.create({ user: req.user.userID, username: req.user.name, title, description });

    res.status(201).json(newComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({})
      .populate("user", "name email phoneNumber role")
      .sort({ createdAt: -1 });
    console.log(complaints);
    
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email phoneNumber")
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Complaint (Change Status)
const updateComplaint = async (req, res) => {
  try {
    
    
    const { status } = req.body;
    console.log(status);
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    res.status(200).json({ msg: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


// exports.getComplaints =  async (req, res) => {
//     try {
//       const complaints = await Complaint.find().populate("user", "name email");
//       res.json(complaints);
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   };
  
//   // ✅ Update complaint status (Admin only)
//   router.patch("/complaints/:id", protect, adminOnly, async (req, res) => {
//     const { status } = req.body;
//     try {
//       const complaint = await Complaint.findById(req.params.id);
//       if (!complaint) {
//         return res.status(404).json({ message: "Complaint not found" });
//       }
  
//       complaint.status = status;
//       await complaint.save();
//       res.json({ message: "Status updated", complaint });
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   });
  
module.exports = {createComplaint, getComplaints, getComplaintById, updateComplaint, deleteComplaint};