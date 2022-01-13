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
        this.registered = obj.registered;
        this.last_login = obj.last_login
    }

    static  async loginCheck(email) {
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `email`= :email', {
            email,
        });
        return results;
    }

    async insert(hash){
        if (typeof this.id === "undefined") {
            this.id = uuid();
            this.registered = new Date();

        }
        await pool.execute('INSERT INTO `users` VALUES(:id, :name, :surname, :email, :admin, :password, :registered, :last_login)', {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            admin: 0,
            password: hash,
            registered: this.registered,
            last_login: this.registered,
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

    async listAll() {
        const [results] = await pool.execute('SELECT * FROM `users`');
        return results;
    }

    static async getOne(id) {
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
            id: id,
        });
        return results;
    }
}

module.exports = {
    UserRecord,
}

