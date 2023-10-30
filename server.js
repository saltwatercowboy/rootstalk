const express = require('express');
const fs = require('fs');
const multer = require('multer');
const app = express();
const PORT = 4002;
const NOTES_FILE = './notes.json';
const cors = require('cors');

app.use(cors());  // before routes
app.use('/uploads', express.static('uploads'));

app.use(express.json());  // for parsing application/json

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // Set your uploads directory here
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/api/uploadImageNote', upload.single('image'), (req, res) => {
    const fullPath = `http://localhost:${PORT}/${req.file.path}`;
    res.json({ path: fullPath });
});

app.post('/api/notes', (req, res) => {
    const notes = req.body.notes;

    fs.writeFile(NOTES_FILE, JSON.stringify(notes), (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Notes saved successfully');
    });
});

app.get('/api/notes', (req, res) => {
    fs.readFile(NOTES_FILE, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ notes: JSON.parse(data) });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
