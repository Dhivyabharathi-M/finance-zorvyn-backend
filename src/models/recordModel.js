const db = require('../config/db');

class Record {
  static create(recordData, callback) {
    const { amount, type, category, date, note, user_id } = recordData;
    const sql = 'INSERT INTO records (amount, type, category, date, note, user_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [amount, type, category, date, note, user_id], function(err) {
      callback(err, { id: this.lastID, ...recordData });
    });
  }

  static findById(id, callback) {
    const sql = 'SELECT * FROM records WHERE id = ?';
    db.get(sql, [id], callback);
  }

  static findByUserId(user_id, filters = {}, callback) {
    let sql = 'SELECT * FROM records WHERE user_id = ?';
    const params = [user_id];

    if (filters.type) {
      sql += ' AND type = ?';
      params.push(filters.type);
    }
    if (filters.category) {
      sql += ' AND category = ?';
      params.push(filters.category);
    }
    if (filters.startDate && filters.endDate) {
      sql += ' AND date BETWEEN ? AND ?';
      params.push(filters.startDate, filters.endDate);
    }

    sql += ' ORDER BY date DESC';
    db.all(sql, params, callback);
  }

  static update(id, recordData, callback) {
    const { amount, type, category, date, note } = recordData;
    const sql = 'UPDATE records SET amount = ?, type = ?, category = ?, date = ?, note = ? WHERE id = ?';
    db.run(sql, [amount, type, category, date, note, id], callback);
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM records WHERE id = ?';
    db.run(sql, [id], callback);
  }

  static getAllForUser(user_id, callback) {
    const sql = 'SELECT * FROM records WHERE user_id = ? ORDER BY date DESC';
    db.all(sql, [user_id], callback);
  }
}

module.exports = Record;