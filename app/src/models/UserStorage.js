"use strict"



class UserStorage{
    static #users = {
        id: ["cihg1", "나개발", "김팀장"],
        psword: ["1234", "1233", "1234454"],
        name: ["일현", "ㅇㄹㅇㄹ","ㅀㄷ"]
    };
    
    static getUser(...fields)    // 가변 매개변수 받을때
    {    
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {

            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            
            return newUsers;
        },{});

        return newUsers;
    }
    static getUserInfo(id)
    {
        const users = this.#users;
        const idx = users.id.indexOf(id);

        const usersKeys = Object.keys(users);   // key 리스트 
        const userInfo = usersKeys.reduce((newUser, info) =>{
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static save(userInfo)
    {
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);

        return {success:true};
    }

    
}

module.exports = UserStorage;