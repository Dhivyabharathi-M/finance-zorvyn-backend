const Record = require('../models/recordModel');

class RecordService {
  static createRecord(recordData, userId, callback) {
    const data = { ...recordData, user_id: userId };
    Record.create(data, callback);
  }

  static getRecords(userId, filters, callback) {
    Record.findByUserId(userId, filters, callback);
  }

  static updateRecord(id, recordData, userId, callback) {
    // Check if record belongs to user
    Record.findById(id, (err, record) => {
      if (err) return callback(err);
      if (!record || record.user_id !== userId) {
        return callback(new Error('Record not found or access denied'));
      }
      Record.update(id, recordData, callback);
    });
  }

  static deleteRecord(id, userId, callback) {
    Record.findById(id, (err, record) => {
      if (err) return callback(err);
      if (!record || record.user_id !== userId) {
        return callback(new Error('Record not found or access denied'));
      }
      Record.delete(id, callback);
    });
  }
}

module.exports = RecordService;