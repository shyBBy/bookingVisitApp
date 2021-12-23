const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class UserRecord {
    constructor(obj) { //przechowywanie lokalne
        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.email = obj.email;
        this.admin = obj.admin;
    }

    // utworzenie metody, która dodawac bedzie dane do bazy danych
    async create(){
        if (typeof this.id === "undefined") {
            this.id = uuid();
        }
        await pool.execute('INSERT INTO `users` VALUES(:id, :name, :surname, :email, :admin)', {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            admin: 0,
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

