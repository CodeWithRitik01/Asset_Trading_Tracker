import jwt from "jsonwebtoken";

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 *1000,
    sameSite: "none",
    httpOnly:true,
    secure: true,
}

const sendToken = (res,user, code, message) =>{
    const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET);

    return res
    .status(code)
    .cookie("machine-token",
         token,
         cookieOptions
    )
    .json({
        success: true,
        token,
        message,
        user
    })
}

export {sendToken, cookieOptions}