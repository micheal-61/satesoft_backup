import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs/promises';
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
app.use(express.json({ limit: '8mb' }));

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
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255) DEFAULT NULL,
          reset_token VARCHAR(255) DEFAULT NULL,
          reset_token_expiry DATETIME DEFAULT NULL
        )
      `);
      try {
        await connection.query('ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS email VARCHAR(255) DEFAULT NULL');
        await connection.query('ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255) DEFAULT NULL');
        await connection.query('ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS reset_token_expiry DATETIME DEFAULT NULL');
      } catch (e) {
        console.error('Alter table admin_users error:', e.message);
      }
      const [userRows] = await connection.query('SELECT COUNT(*) as count FROM admin_users');
      if (userRows[0].count === 0) {
        const hashedPassword = await bcrypt.hash('admin', 10);
        await connection.query(
          'INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)',
          ['admin', hashedPassword, 'admin@satesoft.com']
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
          key_requirements TEXT DEFAULT NULL,
          description TEXT DEFAULT NULL,
          applications INT DEFAULT 0,
          status VARCHAR(50) DEFAULT 'Active',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      await connection.query('ALTER TABLE job_opportunities ADD COLUMN IF NOT EXISTS key_requirements TEXT DEFAULT NULL');
      await connection.query('ALTER TABLE job_opportunities ADD COLUMN IF NOT EXISTS description TEXT DEFAULT NULL');
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
          phone VARCHAR(100) DEFAULT NULL,
          location VARCHAR(255) DEFAULT NULL,
          cv_name VARCHAR(500) DEFAULT NULL,
          cv_url VARCHAR(1000) DEFAULT NULL,
          applied_date DATE DEFAULT NULL,
          status VARCHAR(50) DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      // Add missing columns if they don't exist (MySQL doesn't support ADD COLUMN IF NOT EXISTS)
      const [columns] = await connection.query('SHOW COLUMNS FROM applicants');
      const existingColumns = columns.map(c => c.Field);
      const missingColumns = [
        ['phone', 'VARCHAR(100) DEFAULT NULL'],
        ['location', 'VARCHAR(255) DEFAULT NULL'],
        ['cv_name', 'VARCHAR(500) DEFAULT NULL'],
        ['cv_url', 'VARCHAR(1000) DEFAULT NULL'],
      ].filter(([field]) => !existingColumns.includes(field));
      for (const [field, definition] of missingColumns) {
        await connection.query(`ALTER TABLE applicants ADD COLUMN ${field} ${definition}`);
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

    // Service Agreements Table
    await initTable('service_agreements', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS service_agreements (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    });

    // Privacy Policies Table
    await initTable('privacy_policies', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS privacy_policies (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    });

    // Contacts Table
    await initTable('contacts', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          placeholder_id VARCHAR(255) DEFAULT NULL,
          contact_point VARCHAR(255) NOT NULL,
          purpose_context TEXT DEFAULT NULL,
          section VARCHAR(255) DEFAULT NULL,
          category VARCHAR(100) DEFAULT 'general',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    });

    // Jurisdictions Table
    await initTable('jurisdictions', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS jurisdictions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          code VARCHAR(10) DEFAULT NULL,
          courts TEXT DEFAULT NULL,
          laws TEXT DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    });

    // Pricing Table
    await initTable('pricing', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS pricing (
          id INT AUTO_INCREMENT PRIMARY KEY,
          plan VARCHAR(255) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          features TEXT DEFAULT NULL,
          popular BOOLEAN DEFAULT FALSE,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    });

    // Service Cards Table
    await initTable('service_cards', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS service_cards (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          subtitle VARCHAR(500) DEFAULT NULL,
          description TEXT DEFAULT NULL,
          summary TEXT DEFAULT NULL,
          features JSON DEFAULT NULL,
          image_url VARCHAR(1000) DEFAULT NULL,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    });

    const [existingServices] = await connection.query('SELECT COUNT(*) as count FROM service_cards');
    if (existingServices[0].count === 0) {
      await connection.query(`
        INSERT INTO service_cards (title, subtitle, description, summary, features, image_url, display_order) VALUES
        ('Cyber Security', 'Your Digital Shield', 'We protect your business with advanced cybersecurity solutions tailored to African market challenges. Our security protocols are designed to safeguard your data, infrastructure, and reputation.', 'Stay safe in a connected world. We deliver security that fits African business realities — from threat detection to incident response.', '["Threat detection & response", "Network security monitoring", "Data encryption & compliance", "Security awareness training"]', '/assets/images/african_tech_meeting_1783002294603.png', 1),
        ('UI/UX Design', 'Design That Speaks', 'We create intuitive, user-centered designs that resonate with African users. Our design process combines global best practices with local cultural insights.', 'Design that feels natural. We build interfaces that work for real people — simple, inclusive, and culturally aware.', '["User research & testing", "Responsive interface design", "Design system creation", "Accessibility-first approach"]', '/assets/images/african_tech_woman_3_1783002839334.png', 2),
        ('App Development', 'Build For Scale', 'We build robust mobile and web applications that scale. From MVP to enterprise-grade platforms, our engineering teams deliver reliable software.', 'Software that grows with you. We engineer apps that remain fast, stable, and maintainable as your user base expands.', '["Cross-platform development", "API-first architecture", "Performance optimization", "Ongoing maintenance & support"]', '/assets/images/african_tech_team_hero_1783002251745.png', 3),
        ('Technology Consult', 'Strategic Guidance', 'We help organizations make smarter technology decisions. From digital transformation roadmaps to vendor evaluation, our consultants bring practical expertise.', 'Make the right tech bets. We cut through hype to help you choose solutions that actually move the needle.', '["Digital strategy & roadmap", "Technology assessment", "Vendor selection support", "Change management guidance"]', '/assets/images/african_developer_laptop_1783002306037.png', 4),
        ('IT Solution', 'End-to-End Support', 'We deliver comprehensive IT solutions — from infrastructure setup to managed services. Our solutions are built for reliability and cost-efficiency.', 'One partner, full coverage. We handle the heavy lifting so you can focus on running your business.', '["Infrastructure design & deployment", "Cloud migration & management", "Managed IT services", "24/7 technical support"]', '/assets/images/african_tech_board_1_1783002554188.png', 5)
      ON DUPLICATE KEY UPDATE title = VALUES(title)
      `);
      console.log('✅ Service cards seeded');
    }

    // Comments Table
    await initTable('comments', async () => {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS comments (
          id INT AUTO_INCREMENT PRIMARY KEY,
          article_id INT NOT NULL,
          author VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          parent_id INT DEFAULT NULL,
          likes INT DEFAULT 0,
          is_approved TINYINT DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (article_id) REFERENCES news_posts(id) ON DELETE CASCADE,
          FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
        )
      `);
    });

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

const normalizeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('/assets/')) return trimmed;
  const normalized = trimmed.replace(/\\/g, '/');
  const match = normalized.match(/\/assets\/images\/.+$/);
  if (match) return match[0];
  const filename = normalized.split('/').pop();
  if (filename) return '/assets/images/' + filename;
  return null;
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

// Forgot Password - Generate Reset Token
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email is required.',
      });
    }

    const [users] = await pool.query(
      'SELECT * FROM admin_users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        error: 'No account found with that email address.',
      });
    }

    const resetToken = jwt.sign(
      { id: users[0].id, username: users[0].username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const tokenExpiry = new Date(Date.now() + 3600000);

    await pool.query(
      'UPDATE admin_users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
      [resetToken, tokenExpiry, users[0].id]
    );

    console.log(`🔑 Password reset token for ${email}: ${resetToken}`);

    res.json({
      message: 'If an account exists, reset instructions have been sent to your email.',
      email: users[0].email,
    });
  } catch (error) {
    console.error('❌ Forgot Password Error:', error);
    res.status(500).json({
      error: 'Internal server error.',
    });
  }
});

// Reset Password with Token
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        error: 'Token and new password are required.',
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(400).json({
        error: 'Invalid or expired reset token.',
      });
    }

    const [users] = await pool.query(
      'SELECT * FROM admin_users WHERE id = ? AND reset_token = ?',
      [decoded.id, token]
    );

    if (users.length === 0) {
      return res.status(400).json({
        error: 'Invalid reset token.',
      });
    }

    const user = users[0];
    if (new Date() > new Date(user.reset_token_expiry)) {
      return res.status(400).json({
        error: 'Reset token has expired.',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      'UPDATE admin_users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
      [hashedPassword, user.id]
    );

    res.json({
      message: 'Password reset successfully.',
    });
  } catch (error) {
    console.error('❌ Reset Password Error:', error);
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
        normalizeImageUrl(logoUrl),
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
        normalizeImageUrl(logoUrl),
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
// SERVICE ENDPOINTS
// ======================

// List Services
app.get('/api/services', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM service_cards ORDER BY display_order, id');
    const services = rows.map((row) => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      description: row.description,
      summary: row.summary,
      features: row.features ? JSON.parse(row.features) : [],
      imageUrl: row.image_url,
      displayOrder: row.display_order,
    }));
    res.json(services);
  } catch (error) {
    console.error('❌ List Services Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get Service by ID
app.get('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM service_cards WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    const row = rows[0];
    res.json({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      description: row.description,
      summary: row.summary,
      features: row.features ? JSON.parse(row.features) : [],
      imageUrl: row.image_url,
      displayOrder: row.display_order,
    });
  } catch (error) {
    console.error('❌ Get Service Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Add Service
app.post('/api/services', async (req, res) => {
  try {
    const { title, subtitle, description, summary, features, imageUrl, displayOrder } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const [result] = await pool.query(
      'INSERT INTO service_cards (title, subtitle, description, summary, features, image_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        title,
        subtitle || null,
        description || null,
        summary || null,
        features && Array.isArray(features) ? JSON.stringify(features) : JSON.stringify([]),
        normalizeImageUrl(imageUrl),
        displayOrder || 0,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      subtitle: subtitle || null,
      description: description || null,
      summary: summary || null,
      features: features || [],
      imageUrl: imageUrl || null,
      displayOrder: displayOrder || 0,
    });
  } catch (error) {
    console.error('❌ Add Service Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update Service
app.put('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, summary, features, imageUrl, displayOrder } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    await pool.query(
      'UPDATE service_cards SET title = ?, subtitle = ?, description = ?, summary = ?, features = ?, image_url = ?, display_order = ? WHERE id = ?',
      [
        title,
        subtitle || null,
        description || null,
        summary || null,
        features && Array.isArray(features) ? JSON.stringify(features) : JSON.stringify([]),
        normalizeImageUrl(imageUrl),
        displayOrder || 0,
        id,
      ]
    );

    res.json({
      id: Number(id),
      title,
      subtitle: subtitle || null,
      description: description || null,
      summary: summary || null,
      features: features || [],
      imageUrl: imageUrl || null,
      displayOrder: displayOrder || 0,
    });
  } catch (error) {
    console.error('❌ Update Service Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete Service
app.delete('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM service_cards WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Service Error:', error);
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
    res.json(rows.map((row) => {
      const isActiveRaw = row.is_active;
      const isActive = Buffer.isBuffer(isActiveRaw) ? isActiveRaw[0] === 1 : Number(isActiveRaw) === 1;
      return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        roleId: row.role_id,
        order: row.advisor_order,
        isActive,
        imageUrl: row.image_url || null,
        profileLink: row.profile_link || null,
        bio: row.bio,
        email: row.email,
        expertise: row.expertise,
      };
    }));
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
      [firstName, lastName || null, roleId || 0, advisorOrder || 0, isActive ? 1 : 1, normalizeImageUrl(imageUrl), profileLink || null, bio || null, email || null, expertise || null]
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
      [firstName, lastName || null, roleId || 0, advisorOrder || 0, isActive ? 1 : 0, normalizeImageUrl(imageUrl), profileLink || null, bio || null, email || null, expertise || null, id]
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
// COMMENTS ENDPOINTS
// ======================

// Get comments for an article (with replies nested)
app.get('/api/comments/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE article_id = ? AND parent_id IS NULL AND is_approved = 1 ORDER BY created_at DESC',
      [articleId]
    );

    // Fetch replies for each top-level comment
    const commentsWithReplies = await Promise.all(rows.map(async (comment) => {
      const [replies] = await pool.query(
        'SELECT * FROM comments WHERE parent_id = ? AND is_approved = 1 ORDER BY created_at ASC',
        [comment.id]
      );
      return {
        ...comment,
        _id: comment.id,
        createdAt: comment.created_at,
        isApproved: Boolean(comment.is_approved),
        replies: replies.map(r => ({ ...r, _id: r.id, createdAt: r.created_at, isApproved: Boolean(r.is_approved) })),
      };
    }));

    res.json(commentsWithReplies);
  } catch (error) {
    console.error('❌ List Comments Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Post a new comment
app.post('/api/comments', async (req, res) => {
  try {
    const { articleId, author, content, parentId } = req.body;
    const cleanAuthor = String(author || '').trim();
    const cleanContent = String(content || '').trim();

    if (!Number.isInteger(Number(articleId)) || !cleanAuthor || !cleanContent) {
      return res.status(400).json({ error: 'Article ID, author, and content are required.' });
    }
    if (cleanAuthor.length > 80 || cleanContent.length > 2000) {
      return res.status(400).json({ error: 'Your name or comment is too long.' });
    }

    const [result] = await pool.query(
      'INSERT INTO comments (article_id, author, content, parent_id) VALUES (?, ?, ?, ?)',
      [articleId, cleanAuthor, cleanContent, parentId || null]
    );

    res.status(201).json({ 
      success: true, 
      id: result.insertId,
      articleId: Number(articleId),
      author: cleanAuthor,
      content: cleanContent,
      parentId: parentId || null,
      likes: 0,
      isApproved: true,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Add Comment Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Like a comment
app.put('/api/comments/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      'UPDATE comments SET likes = likes + 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Comment not found.' });
    }

    const [rows] = await pool.query('SELECT likes FROM comments WHERE id = ?', [id]);
    res.json({ likes: rows[0].likes });
  } catch (error) {
    console.error('❌ Like Comment Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// SERVICE AGREEMENTS ENDPOINTS
// ======================

app.get('/api/service-agreements', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM service_agreements ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('❌ List Service Agreements Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/api/service-agreements/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM service_agreements WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service agreement not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Get Service Agreement Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/service-agreements', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    const [result] = await pool.query(
      'INSERT INTO service_agreements (title, content) VALUES (?, ?)',
      [title, content || null]
    );
    const [newAgreement] = await pool.query('SELECT * FROM service_agreements WHERE id = ?', [result.insertId]);
    res.status(201).json(newAgreement[0]);
  } catch (error) {
    console.error('❌ Create Service Agreement Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/api/service-agreements/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    await pool.query(
      'UPDATE service_agreements SET title = ?, content = ? WHERE id = ?',
      [title, content || null, id]
    );
    const [updated] = await pool.query('SELECT * FROM service_agreements WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (error) {
    console.error('❌ Update Service Agreement Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete('/api/service-agreements/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM service_agreements WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Service Agreement Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// PRICING ENDPOINTS
// ======================

app.get('/api/pricing', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pricing ORDER BY display_order ASC, id ASC');
    res.json(rows);
  } catch (error) {
    console.error('❌ List Pricing Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/api/pricing/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM pricing WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pricing plan not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Get Pricing Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/pricing', async (req, res) => {
  try {
    const { plan, price, features, popular, display_order } = req.body;
    if (!plan || price === undefined) {
      return res.status(400).json({ error: 'Plan and price are required.' });
    }
    const [result] = await pool.query(
      'INSERT INTO pricing (plan, price, features, popular, display_order) VALUES (?, ?, ?, ?, ?)',
      [plan, price, features || null, popular ? 1 : 0, display_order || 0]
    );
    const [newPricing] = await pool.query('SELECT * FROM pricing WHERE id = ?', [result.insertId]);
    res.status(201).json(newPricing[0]);
  } catch (error) {
    console.error('❌ Create Pricing Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/api/pricing/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { plan, price, features, popular, display_order } = req.body;
    if (!plan || price === undefined) {
      return res.status(400).json({ error: 'Plan and price are required.' });
    }
    await pool.query(
      'UPDATE pricing SET plan = ?, price = ?, features = ?, popular = ?, display_order = ? WHERE id = ?',
      [plan, price, features || null, popular ? 1 : 0, display_order || 0, id]
    );
    const [updated] = await pool.query('SELECT * FROM pricing WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (error) {
    console.error('❌ Update Pricing Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete('/api/pricing/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM pricing WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Pricing Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// PRIVACY POLICIES ENDPOINTS
// ======================

app.get('/api/privacy-policies', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM privacy_policies ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('❌ List Privacy Policies Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/api/privacy-policies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM privacy_policies WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Privacy policy not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Get Privacy Policy Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/privacy-policies', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    const [result] = await pool.query(
      'INSERT INTO privacy_policies (title, content) VALUES (?, ?)',
      [title, content || null]
    );
    const [newPolicy] = await pool.query('SELECT * FROM privacy_policies WHERE id = ?', [result.insertId]);
    res.status(201).json(newPolicy[0]);
  } catch (error) {
    console.error('❌ Create Privacy Policy Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/api/privacy-policies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    await pool.query(
      'UPDATE privacy_policies SET title = ?, content = ? WHERE id = ?',
      [title, content || null, id]
    );
    const [updated] = await pool.query('SELECT * FROM privacy_policies WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (error) {
    console.error('❌ Update Privacy Policy Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete('/api/privacy-policies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM privacy_policies WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Privacy Policy Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// CONTACTS ENDPOINTS
// ======================

app.get('/api/contacts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('❌ List Contacts Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Get Contact Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const { placeholder_id, contact_point, purpose_context, section, category } = req.body;
    if (!contact_point) {
      return res.status(400).json({ error: 'Contact point is required.' });
    }
    const [result] = await pool.query(
      'INSERT INTO contacts (placeholder_id, contact_point, purpose_context, section, category) VALUES (?, ?, ?, ?, ?)',
      [placeholder_id || null, contact_point, purpose_context || null, section || null, category || 'general']
    );
    const [newContact] = await pool.query('SELECT * FROM contacts WHERE id = ?', [result.insertId]);
    res.status(201).json(newContact[0]);
  } catch (error) {
    console.error('❌ Create Contact Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { placeholder_id, contact_point, purpose_context, section, category } = req.body;
    if (!contact_point) {
      return res.status(400).json({ error: 'Contact point is required.' });
    }
    await pool.query(
      'UPDATE contacts SET placeholder_id = ?, contact_point = ?, purpose_context = ?, section = ?, category = ? WHERE id = ?',
      [placeholder_id || null, contact_point, purpose_context || null, section || null, category || 'general', id]
    );
    const [updated] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (error) {
    console.error('❌ Update Contact Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Contact Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ======================
// JURISDICTIONS ENDPOINTS
// ======================

app.get('/api/jurisdictions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jurisdictions ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('❌ List Jurisdictions Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/api/jurisdictions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM jurisdictions WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Jurisdiction not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Get Jurisdiction Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/jurisdictions', async (req, res) => {
  try {
    const { name, code, courts, laws } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    const [result] = await pool.query(
      'INSERT INTO jurisdictions (name, code, courts, laws) VALUES (?, ?, ?, ?)',
      [name, code || null, courts || null, laws || null]
    );
    const [newJurisdiction] = await pool.query('SELECT * FROM jurisdictions WHERE id = ?', [result.insertId]);
    res.status(201).json(newJurisdiction[0]);
  } catch (error) {
    console.error('❌ Create Jurisdiction Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/api/jurisdictions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, courts, laws } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    await pool.query(
      'UPDATE jurisdictions SET name = ?, code = ?, courts = ?, laws = ? WHERE id = ?',
      [name, code || null, courts || null, laws || null, id]
    );
    const [updated] = await pool.query('SELECT * FROM jurisdictions WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (error) {
    console.error('❌ Update Jurisdiction Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete('/api/jurisdictions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM jurisdictions WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Delete Jurisdiction Error:', error);
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
    res.json(rows.map((row) => ({ ...row, keyRequirements: row.key_requirements || '' })));
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

    res.json({ ...rows[0], keyRequirements: rows[0].key_requirements || '' });
  } catch (error) {
    console.error('❌ Get Job Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Add Job Opportunity
app.post('/api/jobs', verifyToken, async (req, res) => {
  try {
    const { title, location, type, keyRequirements, description, applications, status } = req.body;

    if (!title || !location || !type) {
      return res.status(400).json({
        error: 'Title, location, and type are required.',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO job_opportunities (title, location, type, key_requirements, description, applications, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, location, type, keyRequirements || null, description || null, applications || 0, status || 'Active']
    );

    res.status(201).json({
      id: result.insertId,
      title,
      location,
      type,
      keyRequirements: keyRequirements || null,
      description: description || null,
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
    const { title, location, type, keyRequirements, description, applications, status } = req.body;

    if (!title || !location || !type) {
      return res.status(400).json({
        error: 'Title, location, and type are required.',
      });
    }

    await pool.query(
      'UPDATE job_opportunities SET title = ?, location = ?, type = ?, key_requirements = ?, description = ?, applications = ?, status = ? WHERE id = ?',
      [title, location, type, keyRequirements || null, description || null, applications || 0, status || 'Active', id]
    );

    res.json({
      id: Number(id),
      title,
      location,
      type,
      keyRequirements: keyRequirements || null,
      description: description || null,
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
    const [rows] = await pool.query('SELECT * FROM applicants ORDER BY created_at DESC, id DESC');
    res.json(rows.map((row) => ({ ...row, appliedDate: normalizeDate(row.applied_date) })));
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

    res.json({ ...rows[0], appliedDate: normalizeDate(rows[0].applied_date) });
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
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(express.static(distPath));

// Express 5 Compatible Catch-All Route
app.get('/{*path}', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
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

app.post('/api/public/job-applications', async (req, res) => {
  try {
    const { name, email, phone, location, experience, opportunity, opportunityId, cvName, cvData } = req.body;
    if (!name || !email || !phone || !location || !experience || !opportunity || !cvName || !cvData) return res.status(400).json({ error: 'Please complete every required application field and upload your CV.' });
    const extension = path.extname(cvName).toLowerCase();
    if (!['.pdf', '.doc', '.docx'].includes(extension) || !cvData.startsWith('data:')) return res.status(400).json({ error: 'Please upload a PDF, DOC, or DOCX CV.' });
    const cvBuffer = Buffer.from(cvData.split(',')[1] || '', 'base64');
    if (!cvBuffer.length || cvBuffer.length > 5 * 1024 * 1024) return res.status(400).json({ error: 'Your CV must be 5 MB or smaller.' });
    const uploadsDirectory = path.join(__dirname, 'public', 'uploads', 'cvs');
    await fs.mkdir(uploadsDirectory, { recursive: true });
    const cvFilename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${extension}`;
    const cvPath = path.join(uploadsDirectory, cvFilename);
    await fs.writeFile(cvPath, cvBuffer);
    const cvUrl = `/uploads/cvs/${cvFilename}`;

    // Persist the application itself as well as its email notification. This is the
    // source of truth for the Applicants page in the admin dashboard.
    const connection = await pool.getConnection();
    let applicantId;
    try {
      await connection.beginTransaction();
      const [applicantResult] = await connection.query(
        'INSERT INTO applicants (name, email, opportunity, experience, phone, location, cv_name, cv_url, applied_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), ?)',
        [name, email, opportunity, experience, phone, location, cvName, cvUrl, 'PENDING']
      );
      applicantId = applicantResult.insertId;
      if (opportunityId) {
        await connection.query('UPDATE job_opportunities SET applications = applications + 1 WHERE id = ?', [opportunityId]);
      }
      await connection.commit();
    } catch (databaseError) {
      await connection.rollback();
      throw databaseError;
    } finally {
      connection.release();
    }

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@satesoft.com';
    const subject = `Job application: ${opportunity}`;
    const body = [`Applicant: ${name}`, `Email: ${email}`, `Phone: ${phone}`, `Location: ${location}`, `Experience: ${experience}`, `Opportunity: ${opportunity}${opportunityId ? ` (ID: ${opportunityId})` : ''}`, '', `CV: ${cvName}`, `CV download: ${cvUrl}`].join('\n');
    await pool.query('INSERT INTO messages (sender_name, sender_email, recipient_name, recipient_email, subject, body, sent_date, folder, is_read, is_starred, label) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, 0, 0, ?)', [name, email, 'Admin User', ADMIN_EMAIL, subject, body, 'inbox', 'Application']);

    if (SMTP_USER && SMTP_PASS && !SMTP_USER.includes('your-email')) {
      try { await transporter.sendMail({ from: `"${name}" <${email}>`, to: ADMIN_EMAIL, subject: `[Application] ${subject}`, text: body }); } catch (mailError) { console.error('❌ Job application email error:', mailError.message); }
    }
    res.status(201).json({ success: true, applicantId, message: 'Your application has been received.' });
  } catch (error) {
    console.error('❌ Public Job Application Error:', error);
    res.status(500).json({ error: 'Unable to send your application. Please try again.' });
  }
});
