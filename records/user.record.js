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
        this.last_login = obj.last_login;
        this.active = obj.active;
    }

    static  async loginCheck(email) {
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `email`= :email', {
            email,
        });
        return results;
    }

    async insert(hash){
        if (typeof this.id === "undefined") {
            const date = new Date();
            let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1)+ "/" + (date.getUTCDate());
            this.id = uuid();
            this.registered = myDate;
            this.active = 'false';

        }
        await pool.execute('INSERT INTO `users` VALUES(:id, :name, :surname, :email, :admin, :password, :registered, :last_login, :active, :activation_code)', {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            admin: 0,
            password: hash,
            registered: this.registered,
            last_login: this.registered,
            active: this.active,
            activation_code: 0
         
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

    static async listAll() {
        const [results] = await pool.execute('SELECT * FROM `users`');
        return results;
    }

    static async getOneById(id) {
        const [results] = await pool.execute('SELECT `id`, `name`, `surname`, `email`, `admin`, `registered`, `last_login` FROM `users` WHERE `id` = :id', {
            id: id,
        });
        return results;
    }

    static async getOneByEmail(email, activationCode) {
        const date = new Date();
        let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1)+ "/" + (date.getUTCDate()+ "  " + (date.getHours())+ ":" + (date.getMinutes()));
        const [results] = await pool.execute('SELECT `password`, `email`, `id`, `admin`, `active` FROM `users` WHERE `email` = :email', {
            email: email,
        });
        await pool.execute('UPDATE `users` SET `last_login` = :last_login, `activation_code` = :activation_code WHERE `email` = :email', {
            email: email,
            last_login: myDate,
            activation_code: activationCode,
        });
        return results;
    }
    static async getOneByIdAndActivating(id) {
        this.active = 'true';
        await pool.execute('UPDATE `users` SET `active` = :active WHERE `id` = :id', {
            id: id,
            active: this.active,
        });
    }
}

module.exports = {
    UserRecord,
}

