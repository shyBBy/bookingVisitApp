const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class NotificationRecord {
  constructor(obj){
    this.id = obj.id;
    this.title = obj.title;
    //@TODO: dokończyć 
  }
}
