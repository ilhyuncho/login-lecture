"use strict"

const { config } = require("../config/db");
//const fs = require("fs").promises;
const db = require("../config/db");


class UserStorage{
    // static #getUserInfo(data, id)
    // {
    //     const users =JSON.parse(data);
    //     const idx = users.id.indexOf(id);

    //     const usersKeys = Object.keys(users);   // key 리스트 
    //     const userInfo = usersKeys.reduce((newUser, info) =>{
    //         newUser[info] = users[info][idx];
    //         return newUser;
    //     }, {});

    //     return userInfo;
    // }
    // static #getUser(data, isAll, fields)
    // {
    //     const users = JSON.parse(data);
    //     if( isAll )
    //     {
    //         return users;
    //     }
    //     const newUsers = fields.reduce((newUsers, field) => {

    //         if(users.hasOwnProperty(field)){
    //             newUsers[field] = users[field];
    //         }
            
    //         return newUsers;
    //     },{});

    //     return newUsers; 
    // }
    
    static getUserInfo(id)
    {
       return  new Promise((resolve, reject) =>{
           const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query,[id], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            });
        });
        
 

        // return fs.readFile("./src/databases/users.json")
        // .then((data) => {
        //    return this.#getUserInfo(data,id);
        // })
        // .catch(console.error);
    }

    static async save(userInfo)
    {
        return  new Promise((resolve, reject) =>{
            const query = "INSERT INTO users(id, name, psword) VALUES(?,?,?);";
             db.query(query,[userInfo.id, userInfo.name, userInfo.psword], (err) => {
                 if(err) reject(`${err}`);
                 resolve({success:true});
             });
         });



        // const users = await this.getUser(true);
        // if( users.id.includes(userInfo.id)){
        //     throw "이미 존재하는 아이디입니다";    
        // }

        // users.id.push(userInfo.id);
        // users.psword.push(userInfo.psword);
        // users.name.push(userInfo.name);
        
        // fs.writeFile("./src/databases/users.json",JSON.stringify(users));

        // return {success: true};
    }

    
}

module.exports = UserStorage;