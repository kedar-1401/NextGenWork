const jwt = require("jsonwebtoken")

const isTokenIncluded =(req) => {
   
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    )

}

const getAccessTokenFromHeader = (req) => {

    const authorization = req.headers.authorization

    const access_token = authorization.split(" ")[1]

    return access_token
}

const sendToken = (user, statusCode, res) => {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

    const payload = {
        id: user._id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

    // Send response once, no need to call res.json() again in register
    res.status(statusCode).json({
        token,
        message: "User Created"
    });
};


module.exports ={
    sendToken,
    isTokenIncluded,
    getAccessTokenFromHeader
}
