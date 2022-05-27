"use strict"

const fs = require("fs").promises;


class UserStorage{
    static #getUserInfo(data, id)
    {
        const users =JSON.parse(data);
        const idx = users.id.indexOf(id);

        const usersKeys = Object.keys(users);   // key 리스트 
        const userInfo = usersKeys.reduce((newUser, info) =>{
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }
    static #getUser(data, isAll, fields)
    {
        const users = JSON.parse(data);
        if( isAll )
        {
            return users;
        }
        const newUsers = fields.reduce((newUsers, field) => {

            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            
            return newUsers;
        },{});

        return newUsers; 
    }

    static getUser(isAll, ...fields)    // 가변 매개변수 받을때
    {    
        return fs.readFile("./src/databases/users.json")
        .then((data) => {
           return this.#getUser(data, isAll, fields);
        })
        .catch(console.error);


        // const users = this.#users;
   
    }
    static getUserInfo(id)
    {
        return fs.readFile("./src/databases/users.json")
        .then((data) => {
           return this.#getUserInfo(data,id);
        })
        .catch(console.error);
    }

    static async save(userInfo)
    {
        const users = await this.getUser(true);
        if( users.id.includes(userInfo.id)){
            throw "이미 존재하는 아이디입니다";    
        }

        users.id.push(userInfo.id);
        users.psword.push(userInfo.psword);
        users.name.push(userInfo.name);
        
        fs.writeFile("./src/databases/users.json",JSON.stringify(users));

        return {success: true};
    }

    
}

module.exports = UserStorage;