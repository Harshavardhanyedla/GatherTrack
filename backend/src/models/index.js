const sequelize = require('../database');
const Person = require('./Person');
const Gathering = require('./Gathering');
const Transaction = require('./Transaction');
const Admin = require('./Admin');

// Associations
Person.hasMany(Transaction, { foreignKey: 'personId' });
Transaction.belongsTo(Person, { foreignKey: 'personId' });

Gathering.hasMany(Transaction, { foreignKey: 'gatheringId' });
Transaction.belongsTo(Gathering, { foreignKey: 'gatheringId' });

// Sync all models
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // Set force: true to drop tables on restart (dev only)
        console.log('Database synced successfully.');

        // Create verify admin if not exists
        const adminCount = await Admin.count();
        if (adminCount === 0) {
            await Admin.create({ username: 'admin', password: 'password' });
            console.log('Default admin created: admin/password');
        }

    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = {
    sequelize,
    Person,
    Gathering,
    Transaction,
    Admin,
    syncDatabase,
};
