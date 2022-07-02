const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class StaffRecord {
    constructor(obj) {
        this.id = obj.id;
        this.placeId = obj.placeId;
        this.staffName = obj.name;
        this.staffSurname = obj.surname;
        this.staffEmail = obj.email;
        this.staffPhoneNumber = obj.staffPhoneNumber;
        this.staffPhoto = obj.staffPhoto;
    }

     async create(userId){
        console.log(this)
            if (typeof this.id === "undefined") {
                this.id = null;
            }
         console.log(`------------------------------------------------`)
         console.log(this)
         console.log(`------------------------------------------------`)
         console.log(userId)
            await pool.execute('INSERT INTO `staff` VALUES(:id, :userId, :placeId, :staffName, :staffSurname, :staffEmail, :staffPhoneNumber, :staffPhoto)', {
                id: this.id,
                userId,
                placeId: this.placeId,
                staffName: this.staffName,
                staffSurname: this.staffSurname,
                staffEmail: this.staffEmail,
                staffPhoneNumber: this.staffPhoneNumber,
                staffPhoto: this.staffPhoto,
            });
    }

    static async listAll(){
        const [results] = await pool.execute('SELECT * FROM `staff`');
        return results;
    }

    static async getAllStaffFromPlaceId(placeId){
        const [results] = await pool.execute('SELECT * FROM `staff` WHERE :placeId = :placeId', {
            placeId,
        })
        return results
    }

}

module.exports = {
    StaffRecord,
}

