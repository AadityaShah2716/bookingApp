module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Booking', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customerEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        bookingType: {
            type: DataTypes.ENUM('FULL', 'HALF', 'CUSTOM'),
            allowNull: false
        },
        bookingSlot: {
            type: DataTypes.ENUM('FIRST_HALF', 'SECOND_HALF'),
            allowNull: true
        },
        fromTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        toTime: {
            type: DataTypes.TIME,
            allowNull: true
        }
    }, {
        tableName: 'bookings',
        indexes: [
            { fields: ['bookingDate'] },
            { fields: ['bookingType'] }
        ]
    });
};
