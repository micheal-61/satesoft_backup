import fs from 'fs';
const data = fs.readFileSync('server.js', 'utf8');
console.log('Has POST /api/comments:', data.includes("app.post('/api/comments'"));
console.log('Has GET /api/comments/by-article:', data.includes("app.get('/api/comments/by-article'"));
