import jwt from 'jsonwebtoken';

//generate json webtoken and save it in http only cookie 
const generateToken = (res, userId) =>{
    //adding userId to payload to validate token for the specific user
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
    //save token in a cookie
    res.cookie('jwt', token, {
        httpOnly:true,
        //forces https to be used if in production
        //we dont use https on localhost
        secure: process.env.NODE_ENV !== 'development',
        //prevents csrf attacks
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export default generateToken;