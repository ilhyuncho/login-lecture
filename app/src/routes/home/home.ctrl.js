"use strict";


const output = {

    hello : (req, res) => {
        res.render("home/index");
    },
    
    login : (req, res) => {
        res.render("home/login");
    },
};

const users = {
    id: ["cihg1", "나개발", "김팀장"],
    psword: ["1234", "1233", "1234454"],
};


const process = {
    login : (req, res) => {
        const id = req.body.id,
        psword = req.body.psword;

        if( users.id.includes(id))
        {
            const index = users.id.indexOf(id);
            if( users.psword[index] === psword )
            {
                return res.json({
                    success: true,
                });
            } 
        }
        return res.json({
            success: false,
            msg:"로그인에 실패 하셨습니다.",
        });
    },
};


module.exports = {
    output, process,
};