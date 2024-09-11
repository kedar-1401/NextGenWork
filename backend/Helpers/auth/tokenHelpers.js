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

const sendToken = async(user,statusCode ,res)=>{

    const { JWT_SECRET_KEY,JWT_EXPIRE } = process.env;

    payload = {
        id: user._id,
        username : user.username,
        email : user.email
    }

    const token = jwt.sign(payload ,JWT_SECRET_KEY, {expiresIn :JWT_EXPIRE} )
    return res.json({"token":token,"statusCode":statusCode}) 

}

module.exports ={
    sendToken,
    isTokenIncluded,
    getAccessTokenFromHeader
}
