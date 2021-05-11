module.exports = function (sequelize, DataTypes) {
    var Transactions = sequelize.define("Transactions", {
        category: DataTypes.STRING,
        credit: DataTypes.BOOLEAN,
        transAmount: DataTypes.DECIMAL(10,2),
        createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal("now()") },
        updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal("now()") },
        notes: DataTypes.TEXT,
    });
    return Transactions;
};
