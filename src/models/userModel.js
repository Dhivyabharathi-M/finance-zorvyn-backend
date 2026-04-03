const db = require('../config/db');

class User {
  static create(userData, callback) {
    const { name, email, password, role = 'viewer', status = 'active' } = userData;
    const sql = 'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [name, email, password, role, status], function(err) {
      callback(err, { id: this.lastID, ...userData });
    });
  }

  static findByEmail(email, callback) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], callback);
  }

  static findById(id, callback) {
    const sql = 'SELECT id, name, email, role, status FROM users WHERE id = ?';
    db.get(sql, [id], callback);
  }

  static updateRole(id, role, callback) {
    const sql = 'UPDATE users SET role = ? WHERE id = ?';
    db.run(sql, [role, id], callback);
  }

  static updateStatus(id, status, callback) {
    const sql = 'UPDATE users SET status = ? WHERE id = ?';
    db.run(sql, [status, id], callback);
  }

  static getAll(callback) {
    const sql = 'SELECT id, name, email, role, status FROM users';
    db.all(sql, [], callback);
  }
}

module.exports = User;