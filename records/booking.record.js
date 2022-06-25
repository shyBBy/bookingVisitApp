const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class BookingRecord {
    constructor(obj) {
        if(obj.title.trim() < 5) { 
            throw new Error('Todo title should be at least 5 characters.')
        }

        if (obj.title.length > 150) {
            throw new Error('Todo title should be')
        }


        // this.id = obj.id;
        this.title = obj.title;
        this.createdAt = obj.createdAt;
        this.status = obj.status;
        this.assignedToUserId = obj.assignedToUserId;
        this.assignedToPlaceId = obj.assignedToPlaceId;
    }
    
    async create(userId){
        if (typeof this.id === "undefined") {
            const date = new Date();
            let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1) + "/" + (date.getUTCDate());
            this.id = uuid();
            this.createdAt = myDate;
            this.status = 'notConfirmed';
            this.createdByUserId = userId;
        
        }
        await pool.execute('INSERT INTO `bookings` VALUES(:id, :title, :createdAt, :status, :assignedToUserId, :assignedToPlaceId, :createdByuserId, :updatedAt)', {
            id: this.id,
            title: this.title,
            createdAt: this.createdAt,
            status: this.status,
            assignedToUserId: this.assignedToUserId,
            assignedToPlaceId: this.assignedToPlaceId,
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

