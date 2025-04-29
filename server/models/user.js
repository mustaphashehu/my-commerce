const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        validate: {
            validator: validator.isEmail,
            message: 'please enter a valid email'
        }
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        // validate: {
        //   validator: function (v) {
        //     return validator.isMobilePhone(v, "any", { strictMode: true });
        //   },
        //   message: (props) =>
        //     `${props.value} is not a valid phone number! Use a valid format.`,
        // },
    },
    profilePicture: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'business','customer'],
        default: 'customer'
    },

    nin: {
        type: String,
        unique: true,
        minlength: [11, "NIN must be exactly 11 digits"],
        maxlength: [11, "NIN must be exactly 11 digits"],
        validate: {
          validator: function (value) {
            return /^[0-9]{11}$/.test(value); // Ensures it's exactly 10 digits
          },
          message: "NIN must be a 10-digit number",
        },
      },
    

    isVerified: {
        type: Boolean,
        default: false,
    },

    isFakeIdentity: {
        type: Boolean,
        default: false,
    },

    // verificationToken: String,

    verified: Date
})

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (thePassword) {
    const isMatch = await bcrypt.compare(thePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)