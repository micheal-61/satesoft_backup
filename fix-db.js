import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'mysql',
  connectionLimit: 1,
});

async function main() {
  try {
    await pool.query("CREATE USER IF NOT EXISTS 'satesoft_user'@'localhost' IDENTIFIED BY 'satesoft_pass'");
    console.log('User satesoft_user created');

    await pool.query('GRANT ALL PRIVILEGES ON satesoft_db.* TO "satesoft_user"@"localhost"');
    console.log('Privileges granted');

    await pool.query('FLUSH PRIVILEGES');
    console.log('Privileges flushed');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await pool.end();
  }
}

main();
