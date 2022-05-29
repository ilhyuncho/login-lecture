"use strict";

const id = document.querySelector("#id"),
password = document.querySelector("#psword"),
loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);


function login(){
    const req = {
        id: id.value, 
        psword: password.value,
    };
    
    if(!id.value)
    {
        return alert("아이디를 입력해 주세에");
    }
    if(!psword.value)
    {
        return alert("비밀번호를 입력해 주세요");
    }

    fetch("/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),

    }).then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = "/";
        }
        else{
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
    })
    ;
    
    //.then((res) => console.log(res));
    // --->
    //.then(console.log); // param 으로 넘기때 생략 가능


}