const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class StaffRecord {
    constructor(obj) {
        this.id = obj.id;
        this.userId = obj.userId;
        this.placeId = obj.placeId;
        this.staffName = obj.name;
        this.staffSurname = obj.surname;
        this.staffEmail = obj.email;
        this.staffPhoneNumber = obj.staffPhoneNumber;
        this.staffPhoto = obj.staffPhoto;
    }

     async create(){
        try{
            if (typeof this.id === "undefined") {
                this.id = uuid();
            }
            await pool.execute('INSERT INTO `staff` VALUES(:id, :userId, :placeId, :staffName, :staffSurname, :staffEmail, :staffPhoneNumber, :staffPhoto)', {
                id: this.id,
                userId: this.userId,
                placeId: this.placeId,
                staffName: this.staffName,
                staffSurname: this.staffSurname,
                staffEmail: this.staffEmail,
                staffPhoneNumber: this.staffPhoneNumber,
                staffPhoto: this.staffPhoto,
            });
        }catch (e){
            console.log(e)
        }

    }

}

module.exports = {
    StaffRecord,
}

