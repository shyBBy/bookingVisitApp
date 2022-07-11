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
        this.title = obj.title;
    }

     async create(userId){
            if (typeof this.id === "undefined") {
                this.id = null;
            }
            const [placeName] = await pool.execute('SELECT `name` FROM `places` WHERE `id` = :placeId', {
                placeId: this.placeId
            });
         // console.log(`------------------------------------------------`)
         // console.log(this)
         // console.log(`------------------------------------------------`)
         // console.log(userId)
            await pool.execute('INSERT INTO `staff` VALUES(:id, :userId, :placeId, :staffName, :staffSurname, :staffEmail, :staffPhoneNumber, :staffPhoto, :assignedToPlaceName, :title)', {
                id: this.id,
                userId,
                placeId: this.placeId,
                staffName: this.staffName,
                staffSurname: this.staffSurname,
                staffEmail: this.staffEmail,
                staffPhoneNumber: this.staffPhoneNumber,
                staffPhoto: this.staffPhoto,
                assignedToPlaceName: placeName[0].name,
                title: this.title,
            });
            await pool.execute('UPDATE `users` SET `role` = :role WHERE `id` = :userId', {
             role: 'staff',
             id: userId,
            });
    }

    static async listAll(){
        const [results] = await pool.execute('SELECT * FROM `staff`');
        return results;
    }

    static async getAllStaffFromPlaceId(placeId){
        const [results] = await pool.execute('SELECT * FROM `staff` WHERE `placeId` = :placeId', {
            placeId,
        })
        console.log(results)
        return results
    }

}

module.exports = {
    StaffRecord,
}

