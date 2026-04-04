const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite', (err) => {
  if (err) {
    console.error('DB open err', err);
    process.exit(1);
  }
});

const email = 'john@example.com'; // change to your user email
db.run(
  'UPDATE users SET role = ?, status = ? WHERE email = ?',
  ['admin', 'active', email],
  function (err) {
    if (err) {
      console.error('update err', err);
      return;
    }
    console.log('Rows updated:', this.changes);

    db.get(
      'SELECT id, name, email, role, status FROM users WHERE email = ?',
      [email],
      (err, row) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log('Updated user:', row);
        db.close();
      }
    );
  }
);
