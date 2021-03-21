const express =require('express');
const bcrypt = require('bcrypt');
const passport =require('passport');
const db =require('../models');

const router=express.Router();

router.post('/', async (req, res, next) => { // 회원가입
    try {
      const hash=await bcrypt.hash(req.body.password,12);
      const exUser=await db.User.findOne({
        where:{
          email:req.body.email
        }
      });
      if(exUser){
        //이미 회원가입되어있다면
        return res.status(403).json({
          errorCode:1,
          message:'이미 회원가입된 이메일입니다.'
        });
      }
     const newuser= await db.User.create({
        email: req.body.email,
        password: hash,
        nickname: req.body.nickname,
      }); // HTTP STATUS CODE
      passport.authenticate('local',(err,user,info)=>{
        if(error){
          console.error(error);
          return next(error)
        }
        if(info){
          return res.status(401).send(info.reason);
        }
        return req.login(user,(err)=>{
          if(err){
            console.error(err);
            return next(err)
          }
          return res.json(user);
        });
        //이게 세션에다 사용자정보를 넣어주는것
        //패스포트가 가지고잇는 req.login req.logout를 쓴것이다
      })(req,res,next)
    } catch (err) {
      console.log(err);
      // return next(err);
      return res.status(500).json({
        errorCode:2,
        message:'실패했습니다.'
      })
    }
  });


router.post('/login',(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if(err){
      console.error(err);
      return next(err)
    }
    if(info){
      return res.status(401).send(info.reason);
    }
    return req.login(user,(err)=>{
      if(err){
        console.error(err);
        return next(err)
      }
      return res.json(user);
    });
    //이게 세션에다 사용자정보를 넣어주는것
    //패스포트가 가지고잇는 req.login req.logout를 쓴것이다
  })(req,res,next)
})

router.post("/logout",(req,res)=>{
  if(req.isAuthenticated()){
    req.logout(); //필수
    req.session.destroy(); //선택사항
    return res.status(200).send("로그아웃되었습니다.")
  }
})

module.exports=router;