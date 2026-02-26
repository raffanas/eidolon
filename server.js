const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files with html and txt extensions automatically appended if missing
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html', 'txt'] }));

// Fallback to index.html for unknown routes if not specifically handled
app.get('*', (req, res) => {
    const possibleHtml = path.join(__dirname, 'public', req.path + '.html');
    if (fs.existsSync(possibleHtml)) {
        res.sendFile(possibleHtml);
    } else if (req.path === '/') {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        // Return 404 for unknown
        res.status(404).send('Not Found');
    }
});

app.listen(PORT, () => {
    console.log(`[Protocolo Eidolon] Frequência aberta em http://localhost:${PORT}`);
});
