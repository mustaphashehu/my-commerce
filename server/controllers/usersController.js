const User = require("../models/user")
const Product = require("../models/product")
const {StatusCodes} = require("http-status-codes")
const {
    createUserPayload,
    verifyJWT,
    attachCookiesToResponse,
} = require("../utils/index")
const {
    customError,
    notFound,
    unAuthorized,
    badRequest
} = require("../errors/indexErrors")

const verifyUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if (!user) {
        throw new notFound("No users in the list")
    }
    
    user.isVerified = true
    user.isFakeIdentity = false
    await user.save()

    await Product.updateMany({ user: req.params.id }, { isVerified: true });
    res.status(StatusCodes.OK).json({msg: "success"})
}

const unVerifyUser = async (req, res) => {
    console.log("bbbb");
    
    const user = await User.findOne({_id: req.params.id})
    if (!user) {
        throw new notFound("No users in the list")
    }
    
    
    user.isVerified = false
    await user.save()

    await Product.updateMany({ user: req.params.id }, { isVerified: false });
    res.status(StatusCodes.OK).json({msg: "success"})
}

const getVerifiedUsers = async (req, res) => {
 
    const verifiedUsers = await User.find({ isVerified: true }).select("-password -profilePicture -description -verificationToken");
    if (!verifiedUsers) {
        throw new notFound("no verified users")
    }
    res.status(StatusCodes.OK).json({msg: verifiedUsers});
    

};

// Get all unverified users
const getUnverifiedUsers = async (req, res) => {
   console.log("mmmmm");
   
    const unverifiedUsers = await User.find({ isVerified: false, nin: { $exists: false } }).select("-password -profilePicture -description -verificationToken -isFakeIdentity -isVerified");
    if (!unverifiedUsers) {
        throw new notFound("no un-verified users")
    }
    res.status(StatusCodes.OK).json({msg: unverifiedUsers});
   
};

// Get users who have submitted NIN but are not verified
const getUsersWithNIN = async (req, res) => {
   
    const pendingUsers = await User.find({ nin: { $exists: true }, isVerified: false }).select("-password -profilePicture -description -verificationToken");
    if (!pendingUsers) {
        throw new notFound("no users with NIN submitted that are not verified")
    }
    res.status(200).json({msg: pendingUsers});

}

// Get all users labeled as fake identity
const getFakeUsers = async (req, res) => {
   
    const fakeUsers = await User.find({ isFakeIdentity: true }).select("-password -profilePicture -description -verificationToken");
    if (!fakeUsers) {
        throw new notFound("nofake users available")
    }
    res.status(200).json({msg: fakeUsers});
    
}

const markUserAsFake = async (req, res) => {
    
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        throw new notFound("User not found");
    }

    user.isFakeIdentity = true;
    user.isVerified = false; // Ensure the user is unverified
    await user.save();

    await Product.updateMany({ user: req.params.id }, { isVerified: false });

    res.status(StatusCodes.OK).json({ msg: "User marked as fake identity and unverified" });
};

const unMarkUserAsFake = async (req, res) => {
    
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        throw new notFound("User not found");
    }

    user.isFakeIdentity = false;
  // Ensure the user is unverified
    await user.save();

    res.status(StatusCodes.OK).json({ msg: "User marked as fake identity and unverified" });
};

const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password -profilePicture -description -verificationToken")
    if (!users) {
        throw new notFound("No users in the list")
    }

    console.log(users);
    
    res.status(StatusCodes.OK).json({msg: users})
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id}).select("-password")
    
    if (!user) {
        throw new notFound("user with that id does not exist")
    }
    res.status(StatusCodes.OK).json({msg: user})
}


const showCurrentUser = async (req, res) => {
    
    const {userID} = req.user
    const user = await User.findById(userID).select('-password -verificationToken -isVerified -verified -_id');
    console.log(user);
    
    if (!user) {
        throw new notFound("user with that id does not exist")
    }
    
    res.status(StatusCodes.OK).json({msg: user})
}

const updateUser = async (req, res) => {
    const {name, phoneNumber, description, password, retypePassword} = req.body;
    if (password !== retypePassword) {
        throw new badRequest("your both passwords does not match")
    }

    console.log(req.body);
    

    // const user = await User.findOneAndUpdate({_id: req.user.userID}, {email, name}, {
    //     new: true,
    //     runValidators: true
    // })

    const user = await User.findOne({_id: req.user.userID})
    if (name) {
        user.name = name;
    }
    if (phoneNumber) {
        user.phoneNumber = phoneNumber
    }
    if (description) {
        user.description = description
    }
    if (password) {
        user.password = password
    }
    await user.save()

    const userPayload = createUserPayload(user)
   
    attachCookiesToResponse(res, userPayload)
    res.status(StatusCodes.OK).json({msg: userPayload})
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword, newPasswordAgain } = req.body;
    if (!oldPassword || !newPassword || !newPasswordAgain) {
        throw new badRequest("please enter a value")
    }

    
    const user = await User.findOne({_id: req.user.userID})
    
    const isCorrect = await user.comparePassword(oldPassword)
    if (!isCorrect) {
        throw new unAuthorized("invalid credentials")
    }

    if (newPassword !== newPasswordAgain) {
        throw new unAuthorized("both new password does not match")
    }

    user.password = newPassword

    await user.save()
    res.status(StatusCodes.OK).json({msg: "password change successful"})


}

const deleteUser = async (req, res) => {
    const {id} = req.params;

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        throw new notFound("No user with the ID")
    }

    res.status(StatusCodes.OK).json({msg: "delete successful"})
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    deleteUser,
    verifyUser,
    unVerifyUser,
    getVerifiedUsers,
    getUnverifiedUsers,
    getUsersWithNIN,
    getFakeUsers,
    markUserAsFake,
    unMarkUserAsFake
}

