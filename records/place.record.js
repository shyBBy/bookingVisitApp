const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class BookingRecord {
    constructor(obj) { //przechowywanie lokalne
        if(obj.title.trim() < 5) { // jesli tytuł po usunieciu spacji z kazdej strony jest mniejszy niz 5 znakow
            throw new Error('Todo title should be at least 5 characters.')
        }

        if (obj.title.length > 150) {
            throw new Error('Todo title should be')
        }


        this.id = obj.id;
        this.title = obj.title;
        this.createdAt = obj.createdAt;
    }
    // utworzenie metody, która dodawac bedzie dane do bazy danych
    async insert(){
        if (typeof this.id === "undefined") {
            this.id = uuid();
        }
        if (typeof this.createdAt === "undefined") {
            this.createdAt = new Date();
        }
        await pool.execute('INSERT INTO `todos` VALUES(:id, :title, :createdAt)', {
            id: this.id,
            title: this.title,
            createdAt: this.createdAt,
        });
    }
}

module.exports = {
    BookingRecord,
}

