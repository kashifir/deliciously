
module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "BagesVister",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            badge: {
                type: Sequelize.DataTypes.STRING(255)
            },
            Status:{
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: false
            }
        },
        {
            timestamps: false,
            underscored: true
        }
    );
}

