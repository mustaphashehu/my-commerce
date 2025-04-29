const { process_params } = require("express/lib/router");
const jwt = require("jsonwebtoken")

const createJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })

    return token;
}

const verifyJWT = (token) => {
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    return verify
}

const attachCookiesToResponse = (res, user) => {
    const token = createJWT(user)

    const oneDay = 1000 * 60 * 60 * 24;

    return res.cookie('my_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
        sameSite: 'lax'
    })

}

module.exports = {
    verifyJWT,
    attachCookiesToResponse
}



// const { email, phone, password, firstName, lastName, middleName } = dto;
//     const existingUser = await this.prisma.user.findUnique({
//       where: { email: dto.email },
//     });

//     if (existingUser) {
//       throw new ConflictException('Email already registered');
//     }

//     const hashedPassword = await argon2.hash(dto.password);

//     const user = await this.prisma.user.create({
//       data: {
//         email,
//         phone,
//         password: hashedPassword,
//         firstName,
//         lastName,
//         middleName,
//         isEmailVerified: false,
//         isPhoneVerified: false,
//       },
//     });

//     const payload = {
//       userId: user.id,
//       email: user.email,
//       phone: user.phone,
//       firstName: user.firstName,
//       lastName: user.lastName,
//     };