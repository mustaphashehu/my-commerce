const express = require("express")
const router = express.Router()
const { authenticateUser, authorizeUser, authorizeGettingSingleUSer } = require("../middlewares/unAuthorized")
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUserPassword,
    updateUser,
    deleteUser,
    verifyUser,
    unVerifyUser,
    getVerifiedUsers,
    getUnverifiedUsers,
    getUsersWithNIN,
    getFakeUsers,
    markUserAsFake,
    unMarkUserAsFake
} = require("../controllers/usersController")


router.route("/").get(authenticateUser, authorizeUser("admin"), getAllUsers)
router.route("/verifiedusers").get(authenticateUser, authorizeUser("admin"), getVerifiedUsers)
router.route("/unverifiedusers").get(authenticateUser, authorizeUser("admin"), getUnverifiedUsers)
router.route("/pendingusers").get(authenticateUser, authorizeUser("admin"), getUsersWithNIN)
router.route("/markuserasfake/:id").patch(authenticateUser, authorizeUser("admin"), markUserAsFake)
router.route("/unmarkuserasfake/:id").patch(authenticateUser, authorizeUser("admin"), unMarkUserAsFake)
router.route("/fakeusers").get(authenticateUser, authorizeUser("admin"), getFakeUsers)
router.route("/verifyuser/:id").patch(authenticateUser, authorizeUser("admin"), verifyUser)
router.route("/unverifyuser/:id").patch(authenticateUser, authorizeUser("admin"), unVerifyUser)
router.route("/showcurrentuser").get(authenticateUser, showCurrentUser)
router.route("/updateuser").patch(authenticateUser, updateUser)
router.route("/updateUserPassword").patch(authenticateUser,authorizeGettingSingleUSer(), updateUserPassword)
router.route("/:id").get(authenticateUser, authorizeUser("admin"), getSingleUser)
router.route("/deleteUser/:id").delete(authenticateUser, authorizeUser("admin"), deleteUser)
module.exports = router