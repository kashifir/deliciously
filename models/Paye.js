module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "paye",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            paye: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            bages: {
                type: Sequelize.DataTypes.STRING(255)
            }

        },
        {
            timestamps: true,
            underscored: true
        }
    );
}

