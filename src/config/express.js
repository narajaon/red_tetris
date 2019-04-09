const path = require('path');

function setup(app) {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname + '/../client/index.html'));
    });
}

module.exports = {
    setup,
}