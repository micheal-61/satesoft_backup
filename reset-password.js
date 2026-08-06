import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'satesoft_user',
  password: 'satesoft_pass',
  database: 'satesoft_db',
  connectionLimit: 1,
});

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('admin', 10);
    await pool.query(
      'UPDATE admin_users SET password = ? WHERE username = ?',
      [hashedPassword, 'admin']
    );
    console.log('Admin password reset to: admin');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await pool.end();
  }
}

main();
