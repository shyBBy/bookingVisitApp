const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class UserRecord {
    constructor(obj) { //przechowywanie lokalne
        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.email = obj.email;
        this.admin = obj.admin;
        this.password = obj.password;
    }

    // static  async getUser() {
    //     const [results] = await pool.execute('SELECT * FROM `users`');
    //     return results;
    // }

    async insert(){
        if (typeof this.id === "undefined") {
            this.id = uuid();
        }
        await pool.execute('INSERT INTO `users` VALUES(:id, :name, :surname, :email, :admin, :password)', {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            admin: 0,
            password: this.password,
        });
    }

    async delete(){
        if (!this.id){
            throw new Error('There is no such user')
        }
        await pool.execute('DELETE FROM `users` WHERE `id` = :id', {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            admin: this.admin,
        });

    }
}

module.exports = {
    UserRecord,
}

