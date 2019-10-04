module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "usertype",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            icon: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            Status:{
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: false
            }

        },
        {
            timestamps: true,
            underscored: true
        }
    );
}

