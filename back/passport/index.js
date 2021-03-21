const passport = require('passport');
const db = require('../models');
const local = require('./local')
module.exports=()=>{
    //유저를 세션에 어떻게 저장할건데??
    passport.serializeUser((user,done)=>{
        return done(null,user.id);
    });
    passport.deserializeUser(async (id,done)=>{
        try {
            const user = await db.User.findOne({where:id}); //캐싱한다는데
            return done(null,user); //req.user ewq.isAutyhenticated()를 true로 만들어준다
        } catch (error) {
            console.log(error);
            return done(error);
        }
    });
    local();
}