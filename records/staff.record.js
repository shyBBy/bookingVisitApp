const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class StaffRecord {
    constructor(obj) {
        this.userId = obj.userId;
        this.placeId = obj.placeId;
        this.staffName = obj.name;
        this.staffSurname = obj.surname;
        this.staffEmail = obj.email;
        this.staffPhoneNumber = obj.staffPhoneNumber;
        this.staffPhoto = obj.staffPhoto;
    }

    async create(){
        await pool.execute('INSERT INTO `staff` VALUES(:userId, :placeId, :staffName, :staffSurname, :staffEmail, :staffPhoneNumber, :staffPhoto)', {
            userId: this.userId,
            placeId: this.placeId,
            staffName: this.staffName,
            staffSurname: this.staffSurname,
            staffEmail: this.staffEmail,
            staffPhoneNumber: this.staffPhoneNumber,
            staffPhoto: this.staffPhoto,
        });
    }

}

module.exports = {
    StaffRecord,
}

