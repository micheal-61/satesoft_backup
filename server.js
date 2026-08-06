import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Imap = require('imap');
import { simpleParser } from 'mailparser';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const JWT_SECRET =
  process.env.JWT_SECRET || 'super-secret-key-change-in-production';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || SMTP_USER || 'admin@satesoft.com';

const IMAP_HOST = process.env.IMAP_HOST || 'imap.gmail.com';
const IMAP_PORT = Number(process.env.IMAP_PORT) || 993;
const IMAP_SECURE = process.env.IMAP_SECURE === 'true';
const IMAP_USER = process.env.IMAP_USER || SMTP_USER || '';
const IMAP_PASS = process.env.IMAP_PASS || SMTP_PASS || '';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'satesoft_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper function to normalize dates
const normalizeDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().split('T')[0];
  return String(value);
};

// Initialize Database
const initializeDatabase = async () => {
  let connection;

  try {
    connection = await pool.getConnection();

    // Helper to run each table init independently so one failure doesn't stop the rest
    const initTable = async (name, fn) => {
      try {
        await fn();
        console.log(`✅ Table "${name}" initialized`);
      } catch (err) {
        console.error(`❌ Table "${name}" init error:`, err.message);
      }
    };

    // Project Stats Table
    await initTable('project_stats', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS project_stats (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          value VARCHAR(255) NOT NULL,
          description TEXT
        )
      `);
      const [statsRows] = await connection.query('SELECT COUNT(*) as count FROM project_stats');
      if (statsRows[0].count === 0) {
        await connection.query(`
          INSERT INTO project_stats (title, value, description)
          VALUES
          ('Countdown', '186 days', 'Days until completion'),
          ('Completed', '298 days', 'Days already completed'),
          ('Total Days', '478 days', 'Total estimated days')
        `);
      }
    });

    // Admin Users Table
    await initTable('admin_users', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `);
      const [userRows] = await connection.query('SELECT COUNT(*) as count FROM admin_users');
      if (userRows[0].count === 0) {
        const hashedPassword = await bcrypt.hash('admin', 10);
        await connection.query(
          'INSERT INTO admin_users (username, password) VALUES (?, ?)',
          ['admin', hashedPassword]
        );
        console.log('✅ Default admin created (username: admin, password: admin)');
      }
    });

    // Products Table
    await initTable('product_cards', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS product_cards (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          subtitle VARCHAR(500) NOT NULL,
          category VARCHAR(255) DEFAULT NULL,
          icon_name VARCHAR(100) NOT NULL DEFAULT 'trending',
          logo_url VARCHAR(1000) DEFAULT NULL,
          description TEXT DEFAULT NULL,
          key_features JSON DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      await connection.query('ALTER TABLE product_cards ADD COLUMN IF NOT EXISTS logo_url VARCHAR(1000) DEFAULT NULL');
      await connection.query('ALTER TABLE product_cards ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT NULL');
      const [productRows] = await connection.query('SELECT COUNT(*) as count FROM product_cards');
      if (productRows[0].count === 0) {
        await connection.query(`
          INSERT INTO product_cards (title, subtitle, category, icon_name, logo_url, description, key_features)
          VALUES 
            ('Duqact', 'Retail Intelligence for the African Market', 'Retail Intelligence', 'trending', 'https://via.placeholder.com/120?text=Duqact', 'Duqact empowers African retailers with real-time sales intelligence, inventory forecasting, and customer behavior analytics.', '["Real-time sales tracking", "Inventory forecasting", "Customer segmentation"]'),
            ('Karibyshoo', 'Smart Visitor & Event Management', 'Visitor Management', 'user', 'https://via.placeholder.com/120?text=Karibyshoo', 'Karibyshoo streamlines visitor check-ins, event scheduling, and attendee engagement through an intuitive operations platform.', '["Smart check-in system", "Event scheduling", "Attendee engagement"]'),
            ('FoundDocument', 'Intelligent Archiving & Retrieval', 'Document Management', 'document', 'https://via.placeholder.com/120?text=FoundDocument', 'FoundDocument automates document archiving, intelligent retrieval, and compliance management for modern enterprises.', '["Intelligent search", "Automated archiving", "Compliance tracking"]')
        `);
      }
    });

    // Partners Table
    await initTable('partners', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS partners (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          joined DATE DEFAULT NULL,
          industry VARCHAR(255) DEFAULT NULL,
          location VARCHAR(255) DEFAULT NULL,
          contact_name VARCHAR(255) DEFAULT NULL,
          contact_email VARCHAR(255) DEFAULT NULL,
          status VARCHAR(50) DEFAULT 'ACTIVE',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      const [partnerRows] = await connection.query('SELECT COUNT(*) as count FROM partners');
      if (partnerRows[0].count === 0) {
        await connection.query(`
          INSERT INTO partners (name, joined, industry, location, contact_name, contact_email, status)
          VALUES
            ('Global Tech Solutions', '2025-01-15', 'Information Technology', 'Nairobi, Kenya', 'Jane Doe', 'jane.doe@globaltech.com', 'ACTIVE'),
            ('African Retail Group', '2025-02-10', 'Retail', 'Lagos, Nigeria', 'John Smith', 'john.smith@africanretail.com', 'ACTIVE')
        `);
      }
    });

    // Advisors Table
    await initTable('advisors', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS advisors (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) DEFAULT NULL,
          role_id BIGINT DEFAULT 0,
          advisor_order INT DEFAULT 0,
          is_active BIT(1) DEFAULT 1,
          image_url VARCHAR(500) DEFAULT NULL,
          profile_link VARCHAR(500) DEFAULT NULL,
          bio TEXT DEFAULT NULL,
          email VARCHAR(255) DEFAULT NULL,
          expertise VARCHAR(255) DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      await connection.query('ALTER TABLE advisors ADD COLUMN IF NOT EXISTS advisor_order INT DEFAULT 0');
      await connection.query('ALTER TABLE advisors ADD COLUMN IF NOT EXISTS image_url VARCHAR(500) DEFAULT NULL');
      await connection.query('ALTER TABLE advisors ADD COLUMN IF NOT EXISTS profile_link VARCHAR(500) DEFAULT NULL');
      await connection.query('ALTER TABLE advisors ADD COLUMN IF NOT EXISTS email VARCHAR(255) DEFAULT NULL');
      await connection.query('ALTER TABLE advisors ADD COLUMN IF NOT EXISTS expertise VARCHAR(255) DEFAULT NULL');
      const [advisorRows] = await connection.query('SELECT COUNT(*) as count FROM advisors');
    });

    // News Posts Table
    await initTable('news_posts', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS news_posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          category VARCHAR(255) DEFAULT NULL,
          author VARCHAR(255) DEFAULT NULL,
          publish_date DATE DEFAULT NULL,
          excerpt TEXT DEFAULT NULL,
          content TEXT DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      const [newsRows] = await connection.query('SELECT COUNT(*) as count FROM news_posts');
    });

    // Job Opportunities Table
    await initTable('job_opportunities', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS job_opportunities (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          location VARCHAR(255) NOT NULL,
          type VARCHAR(100) NOT NULL,
          applications INT DEFAULT 0,
          status VARCHAR(50) DEFAULT 'Active',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      const [jobRows] = await connection.query('SELECT COUNT(*) as count FROM job_opportunities');
      if (jobRows[0].count === 0) {
        await connection.query(`
          INSERT INTO job_opportunities (title, location, type, applications, status)
          VALUES
            ('Software Developer', 'Remote', 'Deferred Payment', 12, 'Active'),
            ('UI/UX Designer', 'Remote', 'Full-time', 8, 'Active'),
            ('Product Manager', 'Nairobi, Kenya', 'Full-time', 5, 'Terminated'),
            ('DevOps Engineer', 'Lagos, Nigeria', 'Contract', 3, 'Active')
        `);
      }
    });

    // Applicants Table
    await initTable('applicants', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS applicants (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) DEFAULT NULL,
          opportunity VARCHAR(255) NOT NULL,
          sex VARCHAR(50) DEFAULT NULL,
          experience VARCHAR(255) DEFAULT NULL,
          applied_date DATE DEFAULT NULL,
          status VARCHAR(50) DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      const [applicantRows] = await connection.query('SELECT COUNT(*) as count FROM applicants');
      if (applicantRows[0].count === 0) {
        await connection.query(`
          INSERT INTO applicants (name, email, opportunity, sex, experience, applied_date, status)
          VALUES
            ('John Doe', 'john.doe@example.com', 'Software Developer', 'Male', '5 years', '2024-03-10', 'PENDING'),
            ('Jane Smith', 'jane.smith@example.com', 'Software Developer', 'Female', '3 years', '2024-03-12', 'REVIEWED'),
            ('David Okoro', 'david.okoro@example.com', 'UI/UX Designer', 'Male', '4 years', '2024-03-15', 'PENDING'),
            ('Sarah Johnson', 'sarah.j@example.com', 'Product Manager', 'Female', '6 years', '2024-03-18', 'REVIEWED'),
            ('Michael Chen', 'michael.c@example.com', 'DevOps Engineer', 'Male', '2 years', '2024-03-20', 'PENDING')
        `);
       }
     });

    // Messages Table
    await initTable('messages', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          sender_name VARCHAR(255) NOT NULL,
          sender_email VARCHAR(255) NOT NULL,
          recipient_name VARCHAR(255) DEFAULT NULL,
          recipient_email VARCHAR(255) DEFAULT NULL,
          subject VARCHAR(255) NOT NULL,
          body TEXT,
          sent_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          folder ENUM('inbox', 'sent', 'drafts', 'spam', 'trash') DEFAULT 'inbox',
          is_read TINYINT(1) DEFAULT 0,
          is_starred TINYINT(1) DEFAULT 0,
          label VARCHAR(50) DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      const [msgRows] = await connection.query('SELECT COUNT(*) as count FROM messages');
    });

    try {
      await connection.query("ALTER TABLE messages MODIFY COLUMN folder VARCHAR(50) DEFAULT 'inbox'");
    } catch (e) {
      console.error('Alter table messages folder error:', e.message);
    }

    try {
      await connection.query('ALTER TABLE news_posts ADD COLUMN IF NOT EXISTS content TEXT DEFAULT NULL');
    } catch (e) {
      console.error('Alter table news_posts content error:', e.message);
    }

    console.log('✅ Database initialization complete');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  } finally {
    if (connection) connection.release();
  }
};

// Call initialization
initializeDatabase();

// JWT Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      error: 'Access denied. Token missing.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      error: 'Invalid or expired token.',
    });
  }
};

const verifyStoredPassword = async (inputPassword, storedPassword) => {
  if (!storedPassword) {
    return false;
  }

  if (typeof storedPassword === 'string' && storedPassword.startsWith('$2')) {
    try {
      return await bcrypt.compare(inputPassword, storedPassword);
    } catch (error) {
      console.warn('⚠️ Password hash comparison failed, falling back to plain compare.', error.message);
    }
  }

  return storedPassword === inputPassword;
};

// ======================
// API ROUTES
// ======================

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      database: 'connected',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error.message,
    });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Username and password are required.',
      });
    }

    const [users] = await pool.query(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: 'Invalid credentials.',
      });
    }

    const user = users[0];
    const passwordMatch = await verifyStoredPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Invalid credentials.',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({
      error: 'Internal server error.',
    });
  }
});

// Protected Dashboard Stats
app.get('/api/stats', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM project_stats'
    );
    res.json(rows);
  } catch (error) {
    console.error('❌ Stats Error:', error);
    res.status(500).json({
      error: 'Internal server error.',
    });
  }
});

// Add Stat
app.post('/api/stats', verifyToken, async (req, res) => {
  try {
    const { title, value, description } = req.body;

    if (!title || !value) {
      return res.status(400).json({
        error: 'Title and value are required.',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO project_stats (title, value, description) VALUES (?, ?, ?)',
      [title, value, description || '']
    );

    res.status(201).json({
      id: result.insertId,
      title,
      value,
      description: description || '',
    });
  } catch (error) {
    console.error('❌ Add Stat Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update Stat
app.put('/api/stats/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, value, description } = req.body;

    if (!title || !value) {
      return res.status(400).json({
        error: 'Title and value are required.',
      });
    }

    await pool.query(
      'UPDATE project_stats SET title = ?, value = ?, description = ? WHERE id = ?',
      [title, value, description || '', id]
    );

    res.json({ id, title, value, description: description || '' });
  } catch (error) {
    console.error('❌ Update Stat Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete Stat
app.delete('/api/stats/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM project_stats WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Stat Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Reset Stats
app.post('/api/stats/reset', verifyToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM project_stats');
    await pool.query(`
      INSERT INTO project_stats (title, value, description)
      VALUES 
        ('Countdown', '186 days', 'Days until completion'),
        ('Completed', '298 days', 'Days already completed'),
        ('Total Days', '478 days', 'Total estimated days')
    `);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Reset Stats Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// List Admin Users
app.get('/api/admin/users', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, created_at FROM admin_users ORDER BY id'
    );
    res.json(rows);
  } catch (error) {
    console.error('❌ List Users Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Add Admin User
app.post('/api/admin/users', verifyToken, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Username and password are required.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO admin_users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({
      id: result.insertId,
      username,
    });
  } catch (error) {
    console.error('❌ Add User Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete Admin User
app.delete('/api/admin/users/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const [user] = await pool.query('SELECT * FROM admin_users WHERE id = ?', [id]);

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user[0].username === 'admin') {
      return res.status(400).json({ error: 'Cannot delete the default admin user.' });
    }

    await pool.query('DELETE FROM admin_users WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete User Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update Admin User Password
app.put('/api/admin/users/:id/password', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 4) {
      return res.status(400).json({
        error: 'Password must be at least 4 characters.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'UPDATE admin_users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('❌ Update Password Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// PRODUCT ENDPOINTS
// ======================

// List Products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product_cards ORDER BY id');
    const products = rows.map((row) => ({
      ...row,
      name: row.title,
      tagline: row.subtitle,
      category: row.category,
      iconType: row.icon_name,
      logoUrl: row.logo_url,
      description: row.description,
      keyFeatures: row.key_features ? JSON.parse(row.key_features) : [],
    }));
    res.json(products);
  } catch (error) {
    console.error('❌ List Products Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get Product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM product_cards WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const row = rows[0];
    res.json({
      id: row.id,
      name: row.title,
      tagline: row.subtitle,
      category: row.category,
      iconType: row.icon_name,
      logoUrl: row.logo_url,
      description: row.description,
      keyFeatures: row.key_features ? JSON.parse(row.key_features) : [],
    });
  } catch (error) {
    console.error('❌ Get Product Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Add Product
app.post('/api/products', async (req, res) => {
  try {
    const { name, tagline, category, iconType, logoUrl, description, keyFeatures } = req.body;

    if (!name || !tagline) {
      return res.status(400).json({
        error: 'Name and tagline are required.',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO product_cards (title, subtitle, category, icon_name, logo_url, description, key_features) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        tagline,
        category || null,
        iconType || 'trending',
        logoUrl || null,
        description || null,
        keyFeatures && Array.isArray(keyFeatures) ? JSON.stringify(keyFeatures) : JSON.stringify([]),
      ]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      tagline,
      category: category || null,
      iconType: iconType || 'trending',
      logoUrl: logoUrl || null,
      description: description || null,
      keyFeatures: keyFeatures || [],
    });
  } catch (error) {
    console.error('❌ Add Product Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update Product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tagline, category, iconType, logoUrl, description, keyFeatures } = req.body;

    if (!name || !tagline) {
      return res.status(400).json({
        error: 'Name and tagline are required.',
      });
    }

    await pool.query(
      'UPDATE product_cards SET title = ?, subtitle = ?, category = ?, icon_name = ?, logo_url = ?, description = ?, key_features = ? WHERE id = ?',
      [
        name,
        tagline,
        category || null,
        iconType || 'trending',
        logoUrl || null,
        description || null,
        keyFeatures && Array.isArray(keyFeatures) ? JSON.stringify(keyFeatures) : JSON.stringify([]),
        id,
      ]
    );

    res.json({ 
      id: Number(id), 
      name, 
      tagline, 
      category: category || null, 
      iconType: iconType || 'trending', 
      logoUrl: logoUrl || null, 
      description: description || null, 
      keyFeatures: keyFeatures || [] 
    });
  } catch (error) {
    console.error('❌ Update Product Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete Product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM product_cards WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Product Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// PARTNER ENDPOINTS
// ======================

app.get('/api/partners', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM partners ORDER BY id');
    const partners = rows.map((row) => ({
      id: row.id,
      name: row.name,
      joined: normalizeDate(row.joined),
      industry: row.industry,
      location: row.location,
      contactName: row.contact_name,
      contactEmail: row.contact_email,
      status: row.status,
    }));
    res.json(partners);
  } catch (error) {
    console.error('❌ List Partners Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/partners', async (req, res) => {
  try {
    const { name, joined, industry, location, contactName, contactEmail, status } = req.body;

    if (!name || !industry || !location) {
      return res.status(400).json({ error: 'Name, industry, and location are required.' });
    }

    const [result] = await pool.query(
      'INSERT INTO partners (name, joined, industry, location, contact_name, contact_email, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, joined || null, industry, location, contactName || null, contactEmail || null, status || 'ACTIVE']
    );

    res.status(201).json({ 
      id: result.insertId, 
      name, 
      joined: joined || null, 
      industry, 
      location, 
      contactName: contactName || null, 
      contactEmail: contactEmail || null, 
      status: status || 'ACTIVE' 
    });
  } catch (error) {
    console.error('❌ Add Partner Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/api/partners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, joined, industry, location, contactName, contactEmail, status } = req.body;

    if (!name || !industry || !location) {
      return res.status(400).json({ error: 'Name, industry, and location are required.' });
    }

    await pool.query(
      'UPDATE partners SET name = ?, joined = ?, industry = ?, location = ?, contact_name = ?, contact_email = ?, status = ? WHERE id = ?',
      [name, joined || null, industry, location, contactName || null, contactEmail || null, status || 'ACTIVE', id]
    );

    res.json({ 
      id: Number(id), 
      name, 
      joined: joined || null, 
      industry, 
      location, 
      contactName: contactName || null, 
      contactEmail: contactEmail || null, 
      status: status || 'ACTIVE' 
    });
  } catch (error) {
    console.error('❌ Update Partner Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete('/api/partners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM partners WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Partner Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Terminate / Reactivate Partner (toggles status between ACTIVE and TERMINATED)
app.put('/api/partners/:id/terminate', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT status FROM partners WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Partner not found.' });
    }

    const newStatus = rows[0].status === 'TERMINATED' ? 'ACTIVE' : 'TERMINATED';

    const [result] = await pool.query(
      'UPDATE partners SET status = ? WHERE id = ?',
      [newStatus, id]
    );

    res.json({ success: true, id: Number(id), status: newStatus });
  } catch (error) {
    console.error('❌ Terminate Partner Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// ADVISOR ENDPOINTS
// ======================

app.get('/api/advisors', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM advisors ORDER BY advisor_order, id');
    res.json(rows.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      roleId: row.role_id,
      order: row.advisor_order,
      isActive: row.is_active === 1,
      imageUrl: row.image_url || null,
      profileLink: row.profile_link || null,
      bio: row.bio,
      email: row.email,
      expertise: row.expertise,
    })));
  } catch (error) {
    console.error('❌ List Advisors Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/advisors', async (req, res) => {
  try {
    const { firstName, lastName, roleId, advisorOrder, email, expertise, bio, imageUrl, profileLink, isActive } = req.body;

    if (!firstName) {
      return res.status(400).json({ error: 'First name is required.' });
    }

    const [result] = await pool.query(
      'INSERT INTO advisors (first_name, last_name, role_id, advisor_order, is_active, image_url, profile_link, bio, email, expertise) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName || null, roleId || 0, advisorOrder || 0, isActive ? 1 : 1, imageUrl || null, profileLink || null, bio || null, email || null, expertise || null]
    );

    res.status(201).json({ 
      id: result.insertId, 
      firstName, 
      lastName, 
      roleId: roleId || 0, 
      order: advisorOrder || 0, 
      isActive: isActive ? true : true, 
      imageUrl: imageUrl || null, 
      profileLink: profileLink || null, 
      bio: bio || null,
      email: email || null,
      expertise: expertise || null,
    });
  } catch (error) {
    console.error('❌ Add Advisor Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/api/advisors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, roleId, advisorOrder, email, expertise, bio, imageUrl, profileLink, isActive } = req.body;

    if (!firstName) {
      return res.status(400).json({ error: 'First name is required.' });
    }

    await pool.query(
      'UPDATE advisors SET first_name = ?, last_name = ?, role_id = ?, advisor_order = ?, is_active = ?, image_url = ?, profile_link = ?, bio = ?, email = ?, expertise = ? WHERE id = ?',
      [firstName, lastName || null, roleId || 0, advisorOrder || 0, isActive ? 1 : 0, imageUrl || null, profileLink || null, bio || null, email || null, expertise || null, id]
    );

    res.json({ 
      id: Number(id), 
      firstName, 
      lastName, 
      roleId: roleId || 0, 
      order: advisorOrder || 0, 
      isActive: isActive ? true : false, 
      imageUrl: imageUrl || null, 
      profileLink: profileLink || null, 
      bio: bio || null,
      email: email || null,
      expertise: expertise || null,
    });
  } catch (error) {
    console.error('❌ Update Advisor Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete('/api/advisors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM advisors WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Advisor Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// NEWS ENDPOINTS
// ======================

app.get('/api/news', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM news_posts ORDER BY publish_date DESC, id DESC');
    res.json(rows.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      author: row.author,
      date: normalizeDate(row.publish_date),
      excerpt: row.excerpt,
      content: row.content || null,
    })));
  } catch (error) {
    console.error('❌ List News Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const { title, category, author, date, excerpt, content } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const [result] = await pool.query(
      'INSERT INTO news_posts (title, category, author, publish_date, excerpt, content) VALUES (?, ?, ?, ?, ?, ?)',
      [title, category || null, author || null, date || null, excerpt || null, content || null]
    );

    res.status(201).json({ 
      id: result.insertId, 
      title, 
      category: category || null, 
      author: author || null, 
      date: date || null, 
      excerpt: excerpt || null,
      content: content || null,
    });
  } catch (error) {
    console.error('❌ Add News Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, author, date, excerpt, content } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    await pool.query(
      'UPDATE news_posts SET title = ?, category = ?, author = ?, publish_date = ?, excerpt = ?, content = ? WHERE id = ?',
      [title, category || null, author || null, date || null, excerpt || null, content || null, id]
    );

    res.json({ 
      id: Number(id), 
      title, 
      category: category || null, 
      author: author || null, 
      date: date || null, 
      excerpt: excerpt || null,
      content: content || null,
    });
  } catch (error) {
    console.error('❌ Update News Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM news_posts WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete News Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// JOB OPPORTUNITIES ENDPOINTS
// ======================

// List Job Opportunities
app.get('/api/jobs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM job_opportunities ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('❌ List Jobs Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get Job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM job_opportunities WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job not found.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Get Job Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Add Job Opportunity
app.post('/api/jobs', verifyToken, async (req, res) => {
  try {
    const { title, location, type, applications, status } = req.body;

    if (!title || !location || !type) {
      return res.status(400).json({
        error: 'Title, location, and type are required.',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO job_opportunities (title, location, type, applications, status) VALUES (?, ?, ?, ?, ?)',
      [title, location, type, applications || 0, status || 'Active']
    );

    res.status(201).json({
      id: result.insertId,
      title,
      location,
      type,
      applications: applications || 0,
      status: status || 'Active',
    });
  } catch (error) {
    console.error('❌ Add Job Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update Job Opportunity
app.put('/api/jobs/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, type, applications, status } = req.body;

    if (!title || !location || !type) {
      return res.status(400).json({
        error: 'Title, location, and type are required.',
      });
    }

    await pool.query(
      'UPDATE job_opportunities SET title = ?, location = ?, type = ?, applications = ?, status = ? WHERE id = ?',
      [title, location, type, applications || 0, status || 'Active', id]
    );

    res.json({
      id: Number(id),
      title,
      location,
      type,
      applications: applications || 0,
      status: status || 'Active',
    });
  } catch (error) {
    console.error('❌ Update Job Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete Job Opportunity
app.delete('/api/jobs/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM job_opportunities WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Job Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// APPLICANTS ENDPOINTS
// ======================

// List Applicants
app.get('/api/applicants', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applicants ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('❌ List Applicants Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get Applicant by ID
app.get('/api/applicants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM applicants WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Applicant not found.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Get Applicant Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Add Applicant
app.post('/api/applicants', verifyToken, async (req, res) => {
  try {
    const { name, email, opportunity, sex, experience, appliedDate, status } = req.body;

    if (!name || !opportunity) {
      return res.status(400).json({
        error: 'Name and opportunity are required.',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO applicants (name, email, opportunity, sex, experience, applied_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email || null, opportunity, sex || null, experience || null, appliedDate || null, status || 'PENDING']
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email: email || null,
      opportunity,
      sex: sex || null,
      experience: experience || null,
      applied_date: appliedDate || null,
      status: status || 'PENDING',
    });
  } catch (error) {
    console.error('❌ Add Applicant Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update Applicant
app.put('/api/applicants/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, opportunity, sex, experience, appliedDate, status } = req.body;

    if (!name || !opportunity) {
      return res.status(400).json({
        error: 'Name and opportunity are required.',
      });
    }

    await pool.query(
      'UPDATE applicants SET name = ?, email = ?, opportunity = ?, sex = ?, experience = ?, applied_date = ?, status = ? WHERE id = ?',
      [name, email || null, opportunity, sex || null, experience || null, appliedDate || null, status || 'PENDING', id]
    );

    res.json({
      id: Number(id),
      name,
      email: email || null,
      opportunity,
      sex: sex || null,
      experience: experience || null,
      applied_date: appliedDate || null,
      status: status || 'PENDING',
    });
  } catch (error) {
    console.error('❌ Update Applicant Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete Applicant
app.delete('/api/applicants/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM applicants WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Applicant Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// MESSAGE ENDPOINTS
// ======================

// List Messages by folder
app.get('/api/messages', async (req, res) => {
  try {
    const { folder } = req.query;
    let query;
    let params = [];

    if (folder === 'starred') {
      query = "SELECT * FROM messages WHERE is_starred = 1 AND folder != 'trash' ORDER BY sent_date DESC";
    } else if (folder === 'sent') {
      query = "SELECT * FROM messages WHERE folder = 'sent' ORDER BY sent_date DESC";
    } else if (folder === 'drafts') {
      query = "SELECT * FROM messages WHERE folder = 'drafts' ORDER BY sent_date DESC";
    } else if (folder === 'spam') {
      query = "SELECT * FROM messages WHERE folder = 'spam' ORDER BY sent_date DESC";
    } else if (folder === 'trash') {
      query = "SELECT * FROM messages WHERE folder = 'trash' ORDER BY sent_date DESC";
    } else {
      query = "SELECT * FROM messages WHERE folder = 'inbox' ORDER BY sent_date DESC";
    }

    const [rows] = await pool.query(query, params);
    const messages = rows.map((row) => ({
      id: row.id,
      sender: row.sender_name,
      email: row.sender_email,
      recipient: row.recipient_name,
      recipientEmail: row.recipient_email,
      subject: row.subject,
      body: row.body,
      preview: row.body ? row.body.substring(0, 80) + (row.body.length > 80 ? '...' : '') : '',
      date: normalizeDate(row.sent_date),
      folder: row.folder,
      read: row.is_read === 1,
      starred: row.is_starred === 1,
      label: row.label || null,
    }));
    res.json(messages);
  } catch (error) {
    console.error('❌ List Messages Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Sync inbox from IMAP
app.get('/api/messages/sync', async (req, res) => {
  try {
    if (!IMAP_USER || !IMAP_PASS || IMAP_USER.includes('your-email') || IMAP_PASS.includes('your-app-password')) {
      return res.status(400).json({ error: 'IMAP credentials are not configured on the server.' });
    }

    const imap = new Imap({
      user: IMAP_USER,
      password: IMAP_PASS,
      host: IMAP_HOST,
      port: IMAP_PORT,
      tls: IMAP_SECURE,
      tlsOptions: { rejectUnauthorized: false },
    });

    const imported = [];

    const fetchInbox = () =>
      new Promise((resolve, reject) => {
        imap.once('ready', () => {
          imap.openBox('INBOX', false, (err) => {
            if (err) return reject(err);
            const f = imap.fetch('1:*', { bodies: '', markSeen: true, struct: true });
            f.on('message', (msg) => {
              simpleParser(msg, (err, parsed) => {
                if (err) return;
                imported.push({
                  from: parsed.from?.text || parsed.from?.value?.[0]?.address || 'unknown',
                  fromAddress: parsed.from?.value?.[0]?.address || 'unknown@example.com',
                  to: parsed.to?.text || ADMIN_EMAIL,
                  toAddress: parsed.to?.value?.[0]?.address || ADMIN_EMAIL,
                  subject: parsed.subject || '(no subject)',
                  text: parsed.text || parsed.html || '',
                  date: parsed.date || new Date(),
                });
              });
            });
            f.once('end', () => {
              imap.end();
              resolve();
            });
          });
        });
        imap.once('error', (err) => reject(err));
        imap.connect();
      });

    await fetchInbox();

    let saved = 0;
    for (const mail of imported) {
      const [dup] = await pool.query(
        'SELECT id FROM messages WHERE sender_email = ? AND subject = ? AND sent_date >= DATE_SUB(?, INTERVAL 1 MINUTE)',
        [mail.fromAddress, mail.subject, mail.date]
      );
      if (dup.length > 0) continue;

      await pool.query(
        'INSERT INTO messages (sender_name, sender_email, recipient_name, recipient_email, subject, body, sent_date, folder, is_read, is_starred, label) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 0, ?)',
        [mail.from, mail.fromAddress, mail.to, mail.toAddress, mail.subject, mail.text, mail.date, 'inbox', null]
      );
      saved += 1;
    }

    res.json({ imported: saved, total: imported.length });
  } catch (error) {
    console.error('❌ Sync Messages Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get Message by ID
app.get('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM messages WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    const row = rows[0];
    res.json({
      id: row.id,
      sender: row.sender_name,
      email: row.sender_email,
      recipient: row.recipient_name,
      recipientEmail: row.recipient_email,
      subject: row.subject,
      body: row.body,
      preview: row.body ? row.body.substring(0, 80) + (row.body.length > 80 ? '...' : '') : '',
      date: normalizeDate(row.sent_date),
      folder: row.folder,
      read: row.is_read === 1,
      starred: row.is_starred === 1,
      label: row.label || null,
    });
  } catch (error) {
    console.error('❌ Get Message Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { sender, email, recipient, recipientEmail, subject, body, folder } = req.body;

    if (!sender || !email || !subject) {
      return res.status(400).json({ error: 'Sender name, email, and subject are required.' });
    }

    const resolvedFolder = folder || 'sent';
    const [result] = await pool.query(
      'INSERT INTO messages (sender_name, sender_email, recipient_name, recipient_email, subject, body, sent_date, folder, is_read, is_starred, label) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, 0, 0, ?)',
      [sender, email, recipient || null, recipientEmail || null, subject, body || null, resolvedFolder, null]
    );

    if (resolvedFolder === 'sent' && recipientEmail && SMTP_USER && SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"${sender}" <${email}>`,
          to: recipientEmail,
          subject,
          text: body || '',
        });
      } catch (mailError) {
        console.error('❌ SMTP send error:', mailError.message);
      }
    }

    res.status(201).json({
      id: result.insertId,
      sender,
      email,
      recipient: recipient || null,
      recipientEmail: recipientEmail || null,
      subject,
      body: body || null,
      folder: resolvedFolder,
      read: false,
      starred: false,
      label: null,
    });
  } catch (error) {
    console.error('❌ Send Message Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update Message (toggle read, star, move to folder)
app.put('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read, is_starred, folder } = req.body;

    const updates = [];
    const values = [];

    if (is_read !== undefined) {
      updates.push('is_read = ?');
      values.push(is_read);
    }
    if (is_starred !== undefined) {
      updates.push('is_starred = ?');
      values.push(is_starred);
    }
    if (folder) {
      updates.push('folder = ?');
      values.push(folder);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update.' });
    }

    values.push(id);
    await pool.query(
      `UPDATE messages SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    res.json({ success: true, id: Number(id) });
  } catch (error) {
    console.error('❌ Update Message Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete Message (hard delete)
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM messages WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Message Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Public contact form endpoint (no auth required)
app.post('/api/public/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
    }

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@satesoft.com';

    await pool.query(
      'INSERT INTO messages (sender_name, sender_email, recipient_name, recipient_email, subject, body, sent_date, folder, is_read, is_starred, label) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, 0, 0, ?)',
      [name, email, 'Admin User', ADMIN_EMAIL, subject, message, 'inbox', null]
    );

    if (SMTP_USER && SMTP_PASS && !SMTP_USER.includes('your-email')) {
      try {
        await transporter.sendMail({
          from: `"${name}" <${email}>`,
          to: ADMIN_EMAIL,
          subject: `[Contact Form] ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        });
      } catch (mailError) {
        console.error('❌ SMTP send error:', mailError.message);
      }
    }

    res.status(201).json({ success: true, message: 'Your message has been received.' });
  } catch (error) {
    console.error('❌ Public Contact Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// REACT / VITE BUILD
// ======================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');

// Serve React Build
app.use(express.static(distPath));

// Express 5 Compatible Catch-All Route
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ======================
// START SERVER
// ======================

app.listen(port, () => {
  console.log(`
🚀 Server Running
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 URL: http://localhost:${port}
📦 Environment: ${process.env.NODE_ENV || 'development'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});