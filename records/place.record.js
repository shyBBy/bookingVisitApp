const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class PlaceRecord {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.address = obj.address;
    }

    async create(){
        if (typeof this.id === "undefined") {
            this.id = uuid();
        }
        await pool.execute('INSERT INTO `places` VALUES(:id, :name, :address,)', {
            id: this.id,
            name: this.name,
            address: this.address,

        });
    }

    async delete(){
        if (!this.id){
            throw new Error('There is no such user')
        }
        await pool.execute('DELETE FROM `places` WHERE `id` = :id', {
            id: this.id,
            name: this.name,
            address: this.address,
        });

    }

    static  async listAll() {
        const [results] = await pool.execute('SELECT * FROM `places`');
        return results;
    }

    async insert(){
        if (typeof this.id === "undefined") {
            this.id = uuid();
        }

        await pool.execute('INSERT INTO `places` VALUES(:id, :name, :address)', {
            id: this.id,
            name: this.name,
            address: this.address,
        });

        return this.id;
    }
    static async getOneById(placeId){
        const [results] = await pool.execute('SELECT * FROM `places` WHERE `id` = :placeId,', {
            placeId,
        })
        return results;
    }
}

module.exports = {
    PlaceRecord,
}

