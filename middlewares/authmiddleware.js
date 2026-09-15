const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;

// Fail fast: never fall back to a hardcoded secret. A missing secret in
// production would let anyone forge tokens (including admin tokens).
if (!JWT_KEY) {
    throw new Error('JWT_KEY environment variable is required. Set it before starting the server.');
}

function userAuth(req,res,next){
    // Standard scheme: Authorization: Bearer <token>
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7).trim()
        : null;

    if(!token){
        return res.status(401).json({
            error :  'token not provided'
        })
    }

    try {
        const decodedinformation = jwt.verify(token,JWT_KEY);

        //insert user in req
        req.user = {id : decodedinformation.id ,
            role : decodedinformation.role
        };

        next();
    } catch (err) {
        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
}

module.exports ={
    userAuth,
    JWT_KEY
}
