const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class BookingRecord {
    constructor(obj) {
        // this.id = obj.id;
        this.title = obj.title;
        this.createdAt = obj.createdAt;
        this.bookingDate = obj.bookingDate;
        this.status = obj.status;
        this.assignedToUlStaffId = obj.assignedToStaffId;
    }
    
    async create(userId, placeId){
        if (typeof this.id === "undefined") {
            const date = new Date();
            let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1) + "/" + (date.getUTCDate());
            this.id = uuid();
            this.createdAt = myDate;
            this.status = 'pending';
            this.createdByUserId = userId;
        
        }
        await pool.execute('INSERT INTO `bookings` VALUES(:id, :title, :createdAt, :bookingDate, :status, :assignedToUserId, :assignedToPlaceId, :createdByuserId, :updatedAt)', {
            id: this.id,
            title: this.title,
            createdAt: this.createdAt,
            bookingDate: this.bookingDate,
            status: this.status,
            assignedToUserId: userId,
            assignedToPlaceId: placeId,
            createdByUserId: this.createdByUserId,
            updatedAt: this.createdAt,
        });
       
    }
    
    static async getOneByIdAndChangeStatus(id, status) {
      const date = new Date();
      let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1) + "/" + (date.getUTCDate());
      this.updatedAt = myDate;
      await pool.execute('UPDATE `bookings` SET `status` = :status `updatedAt` = :updatedAt WHERE `id` = :id', {
        id,
        status,
        updatedAt: this.updatedAt,
      });
      return this.updatedAt;
    };

    static async getAllByUserId(userId) {
        const [results] = await pool.execute('SELECT * FROM `bookings` WHERE `createdByUserId` = :userId', {
            userId: userId,
        });
        return results;
    }
  
}

module.exports = {
    BookingRecord,
}

