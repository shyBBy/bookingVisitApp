const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class BookingRecord {
    constructor(obj) {
        this.id = obj.id;
        this.userName = obj.userName;
        this.userSurname = obj.userSurname;
        this.userPhoneNumber = obj.userPhoneNumber;
        this.userEmail = obj.userEmail;
        this.describe = obj.describe;
        this.createdAt = obj.createdAt;
        this.bookingDate = obj.date;
        this.assignedToStaffId = obj.assignedToStaffId;
        this.placeName = obj.placeName;
    }
    
    async create(userId, placeId, placeName){
        if (typeof this.id === "undefined") {
            const date = new Date();
            let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1)+ "/" + (date.getUTCDate()+ "  " + (date.getHours())+ ":" + (date.getMinutes()));
            this.id = uuid();
            this.createdAt = myDate;
            this.status = 'pending';
            this.createdByUserId = userId;
        
        }
        // console.log(this)
        // console.log(`----------`)
        // console.log(`userID: ${userId}`)
        // console.log(`----------`)
        // console.log(`placeId: ${placeId}`)
        // console.log(`----------`)

        await pool.execute('INSERT INTO `bookings` VALUES(:id, :createdAt, :bookingDate, :status, :assignedToStaffId, :assignedToPlaceId, :updatedAt, :createdByUserId, :describe, :userPhoneNumber, :userName, :userSurname, :userEmail, :placeName)', {
            id: this.id,
            createdAt: this.createdAt,
            bookingDate: this.bookingDate,
            status: this.status,
            assignedToStaffId: this.assignedToStaffId,
            assignedToPlaceId: placeId,
            updatedAt: this.createdAt,
            createdByUserId: this.createdByUserId,
            describe: this.describe,
            userPhoneNumber: this.userPhoneNumber,
            userName: this.userName,
            userSurname: this.userSurname,
            userEmail: this.userEmail,
            placeName,
        });
       
    }
    
    static async getOneByIdAndChangeStatus(id, status) {
        if(status === 'active' || status === 'ended' || status === 'pending' || status === 'canceled') {
            const date = new Date();
            let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1) + "/" + (date.getUTCDate());
            this.updatedAt = myDate;
            await pool.execute('UPDATE `bookings` SET `status` = :status, `updatedAt` = :updatedAt WHERE `id` = :id', {
                id,
                status,
                updatedAt: this.updatedAt,
            });
        } else {
            console.log('Incorrect status');
        }
      
    };

    static async getAllByUserId(userId) {
        const [results] = await pool.execute('SELECT * FROM `bookings` WHERE `createdByUserId` = :userId', {
            userId: userId,
        });
        return results;
    }

    static async getAllAssignedToUserId(userId){
        const [results] = await pool.execute('SELECT * FROM `bookings` WHERE `assignedToStaffId` = :userId', {
            userId: userId,
        });
        return results;
    }
    
    static async getOneById(bookingId){
      const [results] = await pool.execute('SELECT * FROM `bookings` WHERE `id` = :bookingId', {
        bookingId,
      });
      return results;
    }
  
}

module.exports = {
    BookingRecord,
}

