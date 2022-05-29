"use strict";

const User = require("../../models/User");
const logger = require("../../config/logger");

// http get
const output = {
    hello : (req, res) => {
        logger.info(`GET / 200 "홍 화면으로 이동"`);
        res.render("home/index");
    },
    
    login : (req, res) => {
        logger.info(`GET /login 200 "로그인 화면으로 이동"`);
        res.render("home/login");
    },

    register : (req, res) => {
        logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
        res.render("home/register");
    },
};

// http post
const process = {
    login : async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        const url ={
            method: "POST",
            path:"/login",
            status: response.err ? 400 : 200,
        };
        
        log(response, url );
        // 클라이언트에게 상태값 전달시..res.status
        return res.status(url.status).json(response);
    },
    register : async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        if(response.err)
        {
            logger.error(
                `POST /register 200 Response: "success: ${response.success}, ${response.err}"`  
              );
        }
        else
        {
            logger.info(
                `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg || "" }"`  
            );
        }

        return res.json(response);
    },


};


module.exports = {
    output, process,
};

const log = (response, url) =>{
    if(response.err)
    {
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.err}`  
          );
    }
    else
    {
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.msg || ""}`  
        );
    }
}