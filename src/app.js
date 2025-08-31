const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let bibliotheken = [];

// CRUD Operationen
app.get('/api/bibliotheken', (req, res) => {
    res.json(bibliotheken);
});

app.post('/api/bibliotheken', (req, res) => {
    const neueBibliothek = req.body;
    bibliotheken.push(neueBibliothek);
    res.status(201).json(neueBibliothek);
});

app.put('/api/bibliotheken/:id', (req, res) => {
    const { id } = req.params;
    const index = bibliotheken.findIndex(b => b.id === id);
    if (index === -1) {
        return res.status(404).send('Bibliothek nicht gefunden');
    }
    bibliotheken[index] = req.body;
    res.json(bibliotheken[index]);
});

app.delete('/api/bibliotheken/:id', (req, res) => {
    const { id } = req.params;
    const index = bibliotheken.findIndex(b => b.id === id);
    if (index === -1) {
        return res.status(404).send('Bibliothek nicht gefunden');
    }
    bibliotheken.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
