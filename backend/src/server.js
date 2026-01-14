const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { syncDatabase } = require('./models');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

// Start server
const startServer = async () => {
    await syncDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();
