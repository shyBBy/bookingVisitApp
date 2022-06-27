const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class StaffRecord {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.password = obj.password;
        this.email = obj.email;
    }

    async create(){
        if (typeof this.id === "undefined") {
            this.id = uuid();
            this.assignedToPlace = [null]
        }
        await pool.execute('INSERT INTO `staffs` VALUES(:id, :name, :surname, :password, :email, :assignedToPlace)', {
            id: this.id,
            name: this.name,
            surname: this.surname,
            password: this.password,
            email: this.email,
            assignedToPlace: this.assignedToPlace,

        });
    }

}

module.exports = {
    StaffRecord,
}

