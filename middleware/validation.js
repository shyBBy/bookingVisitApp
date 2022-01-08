const {pool} = require('../utils/db');
const bcrypt = require("bcrypt");

class Validation {
    constructor(obj) {
        this.id = obj.id;
        this.email = obj.email;
        this.admin = obj.admin;
        this.password = obj.password;
    }
    async loginCheck(email){
        console.log(email);
        console.log(this.email)
        try {
            const [results] = await pool.execute('SELECT `password`, `email` FROM `users` WHERE `email` = :email', {
                email: email,
            });
            const userHash = results[0].password
            const userEmail = results[0].email
            console.log(userEmail);
            console.log(this.email);
            const check = await bcrypt.compare(this.password, userHash);
            console.log(this.email);
            if (userEmail == this.email) {
                if (check) {
                    console.log('z vallidation.js OK')
                } else{
                    console.log('z vallidation.js NOPE')
                }

            } else {
                console.log('User not found!');
            } return check
        } catch(e) {
            console.log('cos nie tak')
            console.log(this.email)
            console.log(e)

        }
    }
}

module.exports = {
    Validation,
}