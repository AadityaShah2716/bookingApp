require('dotenv').config();
const app = require('./src/app');
const db = require('./src/models/index');

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
