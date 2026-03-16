import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock Database
const users = [];

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    // Simple mock auth
    if (email === 'demo@test.com' || users.find(u => u.email === email)) {
        res.json({ token: 'mock-jwt-token', user: { name: 'Demo User', email } });
    } else {
        res.status(401).json({ msg: 'Invalid credentials' });
    }
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ msg: 'User already exists' });
    }
    users.push({ name, email, password });
    res.json({ msg: 'User registered successfully' });
});

app.post('/api/ai/chat', (req, res) => {
    const { message } = req.body;
    // Mock AI logic
    setTimeout(() => {
        res.json({ reply: `I can help you with "${message}". (This is a mock AI response from the server)` });
    }, 1000);
});

app.get('/', (req, res) => {
    res.send('Virtual Classroom API Running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
