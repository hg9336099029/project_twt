import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15h'
    });
  res.cookie("jwt",token,{ 
    maxAge: 15*24*
  })
}
